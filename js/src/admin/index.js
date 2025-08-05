// Simple JavaScript version of admin index
const app = require('flarum/admin/app');

app.initializers.add('rich-text-editor-admin', function() {
  console.log('Rich Text Editor admin extension loaded successfully!');
  
  // TODO: Add admin configuration panel
  // This is the main entry point for the admin-side extension
});
