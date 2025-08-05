// Shim for Flarum admin app
module.exports = {
  initializers: {
    add: function(name, callback) {
      console.log('Admin initializer added:', name);
      if (typeof callback === 'function') {
        callback();
      }
    }
  }
};
