const { Worker, isMainThread, threadId } = require("worker_threads");

let a = 60;
const fun = () => {
  // ...
};

if (isMainThread) {
  a = 200;
  const worker = new Worker(__filename);
  console.log("This is main thread", threadId);
  console.log(a);
} else {
  console.log(a);
  console.log("This is worker thread", threadId);
}

// here the variables and functions that defined globally are copied for every thread we create.