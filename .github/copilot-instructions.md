<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Flarum Rich Text Editor Extension - Copilot Instructions

This workspace contains a custom Flarum extension that provides a rich text editor functionality. When working with this codebase, please follow these guidelines:

## Project Context
- **Framework**: Flarum (modern forum software)
- **Languages**: PHP (backend), TypeScript/JavaScript (frontend)
- **Build Tools**: Webpack, TypeScript compiler
- **CSS**: Less preprocessor
- **Rich Text Editor**: Quill.js

## Code Style and Patterns

### PHP Code
- Follow PSR-4 autoloading standards
- Use Flarum's extend API patterns
- Namespace: `YourVendor\RichTextEditor`
- Follow Flarum extension development best practices

### TypeScript/JavaScript Code
- Use Flarum's frontend patterns with Mithril.js
- Follow component-based architecture
- Use TypeScript for type safety
- Import from Flarum core using the established patterns

### File Organization
- PHP backend code in `src/` directory
- Frontend code in `js/src/` with `forum/` and `admin/` subdirectories
- Styles in `less/` directory
- Translations in `locale/` directory

## Extension Architecture
- **Backend**: PHP classes for settings, serializers, and API endpoints
- **Frontend**: TypeScript components for rich text editing interface
- **Admin Panel**: Configuration interface for extension settings
- **Build System**: Webpack configuration for asset compilation

## Development Workflow
- Use `npm run dev` for development with file watching
- Use `npm run build` for production builds
- Follow Flarum's extension testing patterns
- Ensure compatibility with latest Flarum version (1.8+)

## Key Components
- `RichTextEditor.tsx`: Main editor component using Quill.js
- `RichTextEditorSettingsPage.tsx`: Admin configuration interface
- `extend.php`: Extension registration and bootstrapping
- Toolbar configurations and theme support

## Best Practices
- Maintain backward compatibility with existing posts
- Handle editor initialization and cleanup properly
- Support both light and dark themes
- Ensure mobile responsiveness
- Follow accessibility guidelines for rich text editors
