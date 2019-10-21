onmessage = function(event) {

  let userOutputs = [];
  let userFunction;

  //parse inputs to usable format
  const inputs = JSON.parse(event.data.inputs);
  const expectedOutputs = JSON.parse(event.data.expectedOutputs);

  // trim whitespace and remove const and let that can cause glitches
  let formattedFunction = event.data.userFunction.trim().replace(/^(const|let)/, '');


  try {
    // set user code to a callable function
    eval('userFunction =' + formattedFunction);

    // run function on each input
    inputs.forEach(input => {
      userOutputs.push(userFunction(...input));
    })
  } catch (error) {
    // return error as response if code fails to execute
    postMessage({ correct: false, userOutputs: [error.message]})
  }

  // test if all outputs match the expected output
  let correct = userOutputs.every((userOutput, index) => {
    return JSON.stringify(userOutput) === JSON.stringify(expectedOutputs[index]);
  });

  postMessage({ correct, userOutputs });
};
