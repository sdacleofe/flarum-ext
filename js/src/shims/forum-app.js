// Shim for Flarum forum app
module.exports = {
  initializers: {
    add: function(name, callback) {
      console.log('Forum initializer added:', name);
      if (typeof callback === 'function') {
        callback();
      }
    }
  }
};
