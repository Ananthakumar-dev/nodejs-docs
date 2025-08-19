const { Worker, MessageChannel } = require("worker_threads");

/**
 * Example 1 : passing data via worker data
 * it makes a complete new copy of worker data that we passing to worker thread rather than original data. It means if we modified the worker data from one of its thread it does not going to affect the data persists in main thread. It uses sturctured clone algorithm

    const obj = {message: "hello world"};
    const worker = new Worker('./thread.js', {workerData: obj});
*/

/**
 * Example 2 : Communicate via single message channel

    const channel = new MessageChannel();
    // the channel has two ports. it always has two ports that is port1 and port2. we can establish a communication between that port1 and port2. we can pass a data from port1 to port2 by using postMessage method available on that port. and we can receive the message from other port using .on("message") listener.

    const port1 = channel.port1;
    const port2 = channel.port2;

    port1.postMessage({name: "javascript"});
    port2.on("message", (data) => {
        console.log("Message received from on port2", data)
    })
*/

/**
 * Example 3: we can pass these threads via worker threads to child threads
 * Using single messageChannel

    const { port1, port2 } = new MessageChannel();

    // const thread1 = new Worker("./thread.js", {workerData: {port: port1}});
    // const thread2 = new Worker("./thread.js", {workerData: {port: port2}});

    //Note: If we pass the port like above, the ports are forwared to child threads. so it is not available in main thread. so that we receive a error like Object that needs transfer was found in message but not listed in transferList. to avoid this we can pass transferList also like below.
    const thread1 = new Worker("./thread.js", {
        workerData: { port: port1 },
        transferList: [port1],
    });
    const thread2 = new Worker("./thread.js", {
        workerData: { port: port2 },
        transferList: [port2],
    });
    // here port1 and port2 are transferred to child threads. so it not going to accessible in this main thread. if we do like thread1.postMessage("") it not going to be work.
    // if we using like single messageChannel we are transfferd the avilable port to child thread. This is one way communication. so that we cant establish a communication between parent and child. so that we need to establish two message channels in example 4.
 */

/**
 * Example 4: Establish a two way communication using two message channels

    const channel1 = new MessageChannel();
    const channel2 = new MessageChannel();

    // now we should pass the port2 to child thrads
    const thread1 = new Worker("./thread.js", {
        workerData: {port: channel1.port2},
        transferList: [channel1.port2]
    })

    const thread2 = new Worker("./thread.js", {
        workerData: {port: channel2.port2},
        transferList: [channel2.port2]
    })

    channel1.port1.postMessage("message posted");
    channel1.port1.on("message", (data) => {
        console.log(data)
    })

    channel2.port1.postMessage("message posted");
    channel2.port1.on("message", (data) => {
        console.log(data)
    })
*/

/**
 * Example 5: we can communicate simply using parentport.
 * here we dont worry about creating message channels and pass it to threads via worker threads and add it to transferlist and so on.
 */
    const thread1 = new Worker("./thread.js");

    // we simply listen and post message like below. but behind the scenes it uses messagechannel
    thread1.on("message", (data) => {
        console.log(data)
    })

    thread1.postMessage("message posted from main thread.")