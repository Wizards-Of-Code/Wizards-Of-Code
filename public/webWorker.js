onmessage = function(event) {

  let outputs = [];
  let userFunction;

  eval('userFunction =' + event.data.userFunction)

  Object.values(event.data.inputs).forEach(input => {
    outputs.push(userFunction(...input))
  })

  postMessage(outputs);
}
