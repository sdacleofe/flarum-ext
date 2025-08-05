# Quick Installation Guide

Since the package is not yet published on Packagist, here are the current installation options:

## Option 1: Development Installation (Recommended)

Add the repository to your Flarum installation and install as a development package:

```bash
# Navigate to your Flarum root directory
cd /path/to/your/flarum

# Add the repository
composer config repositories.flarum-rich-text-editor vcs https://github.com/sdacleofe/flarum-ext

# Install the extension
composer require sdacleofe/flarum-rich-text-editor:dev-main

# Enable the extension
php flarum extension:enable sdacleofe-rich-text-editor
```

## Option 2: Manual Installation

```bash
# Navigate to your Flarum extensions directory
cd /path/to/your/flarum/extensions

# Clone the repository
git clone https://github.com/sdacleofe/flarum-ext.git flarum-rich-text-editor

# Navigate to the extension directory
cd flarum-rich-text-editor

# Install PHP dependencies
composer install --no-dev

# Install Node dependencies and build
npm install
npm run build

# Go back to Flarum root and enable the extension
cd /path/to/your/flarum
php flarum extension:enable sdacleofe-rich-text-editor
```

## Option 3: Packagist Publication (Coming Soon)

To make this package available via `composer require sdacleofe/flarum-rich-text-editor`:

1. **Submit to Packagist**: Go to [packagist.org](https://packagist.org) and submit the GitHub repository
2. **Wait for approval**: Packagist will automatically sync with the GitHub repository
3. **Install normally**: Once published, you can install with standard Composer commands

## Troubleshooting

If you get the error "The package sdacleofe/flarum-ext could not be found":

1. Make sure you're using the correct package name: `sdacleofe/flarum-rich-text-editor`
2. Add the repository first using Option 1 above
3. Or wait for Packagist publication

## Next Steps

After installation:
1. Go to Admin Panel → Extensions
2. Enable "Rich Text Editor"
3. Configure the extension settings as needed
