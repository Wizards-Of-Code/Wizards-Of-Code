if (window.Worker) {

  const evaluator = new Worker('./webWorker.js');

  // evaluator.postMessage({
  //   funcParams: ['a', 'b'],
  //   funcBody: 'return a + b',
  //   inputs: [[2, 3], [4, 5]]
  // })

  evaluator.postMessage({
    inputs: [[2, 3], [4, 5]],
    userFunction: 'function (a, b) { return a + b };'
  })

  evaluator.onmessage = function(event) {
    console.log(event.data);
  }



} else {
  console.log('update your browser')
}
