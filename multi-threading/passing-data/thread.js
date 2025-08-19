const {workerData, parentPort} = require('worker_threads')

/**
 * for example 1:
 * we could simple receving message using workerData
    console.log(workerData)
 */

/**
 * for example 2:
 * we could receive the port from workerdata of main thread. but using single messageChannel

    const port = workerData.port;
    // we can listen the data that parent passed via messagechannel. note: port is a type of messagechannel
    port.on("message", (data) => {
        console.log(data)
    })

    // we can post a message to parent via messagechannel
    port.postMessage("Message from child thread");
*/

/**
 * for example 4:

    const port = workerData.port;
    port.on("message", (data) => {
        console.log(data)
    })
    port.postMessage("Message from child thread");

    // this is same as above example. but here we established a two way communication
*/

/**
 * for example 5: we can simply receive message using parent port.
 * instead of receiving the port from workerdata we simply receive the port from parentport property of worker_threads.

    const port = parentPort;
    port.on("message", (data) => {
        console.log(data)
    })
    port.postMessage("Message from child thread");
*/
