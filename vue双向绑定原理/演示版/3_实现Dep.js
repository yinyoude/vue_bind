function defineReactive(data, key, val) {
  observe(val); // 递归遍历所有子属性
  var dep = new Dep(); 
  Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function() {
          // 是否第一次 get 属性，只在第一次的时候添加订阅者
          if (是否需要添加订阅者) {
              dep.addSub(watcher); // 在这里添加一个订阅者
          }
          return val;
      },
      set: function(newVal) {
          if (val === newVal) {
              return;
          }
          val = newVal;
          console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
          dep.notify(); // 如果数据变化，通知所有订阅者
      }
  });
}

function Dep () {
  this.subs = [];
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update();
    });
  }
};