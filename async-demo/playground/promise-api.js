const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...')
        resolve(1)
        //reject(new Error('Somethiing failed'))
    }, 2000)
})

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...')
        resolve(2)
    }, 2000)
})

// return new Promise when all the promises in this
// array are resolved
// This is not multithreading but multiple operations
// seems to start at same time but starts next operation
// immediately.
// Result is an array -> If any one promise rejects then whole promise 
// is rejected
 
Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err.message))

/**When something is to be done asap any promise resolves */
// Promise.race([p1, p2])
//     .then(result => console.log(result))
//     .catch(err => console.log(err.message))    