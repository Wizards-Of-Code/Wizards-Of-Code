onmessage = function(event) {

  let userOutputs = [];
  let userFunction;

  const inputs = JSON.parse(event.data.inputs);
  const expectedOutputs = JSON.parse(event.data.expectedOutputs);


  eval('userFunction =' + event.data.userFunction);

  inputs.forEach(input => {
    userOutputs.push(userFunction(...input));
  })

  let correct = userOutputs.every((userOutput, index) => JSON.stringify(userOutput) === JSON.stringify(expectedOutputs[index]));

  postMessage({ correct, userOutputs });
}
