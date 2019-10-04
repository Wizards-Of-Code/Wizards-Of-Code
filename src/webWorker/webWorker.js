console.log('in web worker');


onmessage = function(event) {
  let outputs = [];

  console.log(event.data.userFunction);

  let userFunction;

  eval('userFunction =' + event.data.userFunction)

  Object.values(event.data.inputs).forEach(input => {
    outputs.push(userFunction(...input))
  })

  postMessage(outputs);
}
