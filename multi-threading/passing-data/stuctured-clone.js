const v8 = require("v8");

function sturcturedClone(obj) {
  /**
   * It makes the deep clone of the original object
   */
  return v8.deserialize(v8.serialize(obj));
}

const obj = {
  // func: () => {}, // this is not supported,
  name: "javscript",
  more: {
    items: ["suffering", "skating"],
    test: {
      foo: "bar",
    },
  },
  created: new Date(),
};

const cloned = sturcturedClone(obj);
cloned.name = "typescript";
cloned.more.items = "suffering";
cloned.more.test.foo = "not bar";

console.log(cloned);
console.log(obj);
