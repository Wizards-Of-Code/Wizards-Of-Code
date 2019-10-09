onmessage = function(event) {

  let userOutputs = [];
  let userFunction;

  const inputs = JSON.parse(event.data.inputs);
  const expectedOutputs = JSON.parse(event.data.expectedOutputs);

  try {
    eval('userFunction =' + event.data.userFunction);

    inputs.forEach(input => {
      userOutputs.push(userFunction(...input));
    })
  } catch (error) {
    postMessage({ correct: false, userOutputs: error.message})
  }

  let correct = userOutputs.every((userOutput, index) => {
    return JSON.stringify(userOutput) === JSON.stringify(expectedOutputs[index]);
  });

  postMessage({ correct, userOutputs });
};
