// // makes a new function based on passed parameters function body
// const makeFunction = ([...funcParams], funcBody) => {
//   // eslint-disable-next-line no-new-func
//   let resultingFunction = new Function (...funcParams, funcBody);
//   return resultingFunction
// }

// onmessage = function(event) {

//   // create user function
//   const userFunction = makeFunction(event.data.funcParams, event.data.funcBody)

//   // run user function with all inputs passed as params
//   const outputs = [];
//   event.data.inputs.forEach(input => {
//     try {
//       outputs.push(userFunction(...input));
//     } catch (error) {
//       // return error message if code fails
//       postMessage(`program crashed on test input: ${input}`)
//     }
//   })

//   postMessage(outputs);

// };


onmessage = function(event) {
  let outputs = [];

  console.log(event.data.userFunction);

  let userFunction;

  eval('userFunction =' + event.data.userFunction)

  event.data.inputs.forEach(input => {
    outputs.push(userFunction(...input))
  })

  postMessage(outputs);
}
