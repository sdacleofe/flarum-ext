# Flarum Rich Text Editor Extension

A powerful, customizable rich text editor extension for Flarum that replaces the default text editor with a feature-rich WYSIWYG editor.

## ✨ Features

- **Modern Rich Text Editing**: Built with Quill.js for a smooth editing experience
- **Customizable Toolbar**: Choose from minimal, basic, or full toolbar configurations
- **Multiple Themes**: Snow (traditional) and Bubble (tooltip-style) themes
- **Plugin System**: Extensible with additional features
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Fully compatible with Flarum's dark mode
- **Production Ready**: Optimized build process with webpack

## 🚀 Installation

### Via Composer (After Packagist Publication)

```bash
composer require sdacleofe/flarum-rich-text-editor
```

### Current Installation Method (Before Packagist)

Since the package is not yet published on Packagist, use this method:

```bash
# Add the repository to your Flarum installation
composer config repositories.flarum-rich-text-editor vcs https://github.com/sdacleofe/flarum-ext

# Install the extension
composer require sdacleofe/flarum-rich-text-editor:dev-main

# Enable the extension in Flarum
php flarum extension:enable sdacleofe-rich-text-editor
```

### Manual Installation

1. Download the extension files
2. Extract to your Flarum's `extensions` directory
3. Run composer install in the extension directory:
   ```bash
   cd extensions/flarum-rich-text-editor
   composer install --no-dev --optimize-autoloader
   ```
4. Build the frontend assets:
   ```bash
   npm install
   npm run build
   ```

### Development Installation

For development or if the package isn't on Packagist yet:

```bash
# Add the repository to your Flarum's composer.json
composer config repositories.flarum-rich-text-editor vcs https://github.com/sdacleofe/flarum-ext

# Install the extension
composer require sdacleofe/flarum-rich-text-editor:dev-main
```

> **📦 To Publish on Packagist:**
> 1. Visit [packagist.org/packages/submit](https://packagist.org/packages/submit)
> 2. Enter repository URL: `https://github.com/sdacleofe/flarum-ext`
> 3. After approval, the package will be available via standard `composer require`

## 🔧 Development Setup

1. Clone this repository into your Flarum development environment
2. Install dependencies:
   ```bash
   composer install
   npm install
   ```
3. Start development mode:
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

After installation, go to the Admin Panel → Extensions → Rich Text Editor to configure:

### Basic Settings
- **Enable/Disable**: Toggle the rich text editor on/off
- **Toolbar Configuration**: Choose toolbar complexity level
- **Theme**: Select visual theme

### Toolbar Configurations

#### Minimal Toolbar
- Bold, Italic
- Link insertion

#### Basic Toolbar  
- Bold, Italic, Underline
- Link, Blockquote, Code block
- Ordered/Unordered lists

#### Full Toolbar
- Headers (H1-H3)
- Text formatting (Bold, Italic, Underline, Strike)
- Colors and background colors
- Links, Images, Blockquotes, Code blocks
- Lists and alignment
- Clean formatting

## 🏗️ Project Structure

```
├── composer.json           # PHP dependencies and extension info
├── extend.php              # Extension bootstrapping
├── package.json            # JavaScript dependencies
├── webpack.config.js       # Build configuration
├── src/                    # PHP source code
│   └── Serializer/         # API serializers
├── js/
│   ├── src/                # JavaScript source
│   │   ├── forum/          # Forum-side components
│   │   ├── admin/          # Admin-side components
│   │   └── shims/          # Flarum compatibility shims
│   └── dist/               # Built JavaScript files
├── less/                   # Stylesheets
│   ├── forum.less
│   └── admin.less
└── locale/                 # Translations
    └── en.json
```

## 🛠️ Building for Production

1. Install dependencies:
   ```bash
   composer install --no-dev --optimize-autoloader
   npm install --production
   ```

2. Build optimized assets:
   ```bash
   npm run build
   ```

3. The built files will be in:
   - `js/dist/forum.js` - Forum frontend
   - `js/dist/admin.js` - Admin frontend

## 📋 Available Scripts

- `npm run dev` - Development build with watch mode
- `npm run build` - Production build
- `npm run type-check` - TypeScript type checking (when using TS)
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎨 Customization

### Custom Styles

Override CSS variables to create custom themes:

```less
.RichTextEditor {
  --editor-bg: #your-color;
  --toolbar-bg: #your-color;
  --text-color: #your-color;
  --primary-color: #your-color;
}
```

### Adding Custom Features

Extend the editor by adding custom JavaScript:

```javascript
// In your custom extension
import { extend } from 'flarum/common/extend';

// Add custom functionality
extend(RichTextEditor.prototype, 'initializeEditor', function() {
  // Your custom code here
});
```

## 🔧 Troubleshooting

### Extension Not Loading
1. Check browser console for JavaScript errors
2. Verify extension is enabled in admin panel
3. Clear Flarum cache: `php flarum cache:clear`

### Build Issues
1. Ensure Node.js 14+ is installed
2. Delete `node_modules` and run `npm install` again
3. Check for TypeScript errors if using TS files

### Styling Issues
1. Check for CSS conflicts with other extensions
2. Verify Less compilation completed successfully
3. Clear browser cache

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 Changelog

### Version 1.0.0
- Initial release
- Basic rich text editing functionality
- Webpack-based build system
- Admin configuration panel
- Multiple toolbar configurations
- Theme support

## 📄 License

This extension is licensed under the MIT License. See LICENSE file for details.

## 🆘 Support

- **GitHub Issues**: Report bugs and request features
- **Flarum Community**: Get help from other users
- **Documentation**: Comprehensive guides and examples

## 🙏 Credits

- Built with [Quill.js](https://quilljs.com/)
- Powered by [Flarum](https://flarum.org/)
- Webpack configuration inspired by flarum-webpack-config
- Thanks to the Flarum community for feedback and testing

---

**Note**: This is a foundational version of the extension. The TypeScript components and advanced features are prepared but currently use JavaScript shims for compatibility. Future versions will include the full rich text editing capabilities.
