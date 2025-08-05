// Shim for Flarum Component
class Component {
  constructor(attrs = {}) {
    this.attrs = attrs;
  }
  
  oncreate(vnode) {
    // Override in subclasses
  }
  
  onremove() {
    // Override in subclasses
  }
  
  view() {
    return null;
  }
}

module.exports = Component;
