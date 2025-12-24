# Project Overview

This is a browser extension built with WXT (Web Extension Toolkit) and Svelte 5. The extension provides two main features:
1. **New Tab Redirect**: Automatically redirects new tabs to a user-configured URL
2. **Popup Window Opener**: Opens the current tab in a new popup window with responsive device size presets

## Tech Stack

- **Framework**: WXT (Web Extension Toolkit)
- **UI Library**: Svelte 5
- **Language**: TypeScript
- **Build Tool**: Vite (via WXT)
- **Package Manager**: Bun
- **Styling**: Tailwind CSS v4
- **Linter/Formatter**: Biome.js

## Project Structure

```
breach-tab/
├── src/
│   ├── entrypoints/          # Extension entry points
│   │   ├── newtab/           # New tab redirect entry point
│   │   │   ├── index.html    # Newtab HTML template
│   │   │   └── main.ts       # Redirect logic
│   │   └── popup/            # Extension popup UI
│   │       ├── App.svelte    # Main popup component (device presets)
│   │       ├── main.ts       # Popup entry point
│   │       ├── index.html    # Popup HTML template
│   │       └── app.css       # Popup styles (with Tailwind CSS)
│   ├── lib/                  # Reusable Svelte components
│   │   └── Icon.svelte       # Device icon component
│   ├── utils/                # Utility functions
│   │   └── config.ts         # Cloud storage configuration helper
│   └── assets/               # Static assets (images, icons)
├── wxt.config.ts             # WXT configuration
├── biome.json                # Biome.js configuration
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## Key Files

### Entry Points

- **newtab/** (`src/entrypoints/newtab/`): New tab override that redirects to saved URL
  - `main.ts` - Retrieves saved URL from cloud storage and redirects
  - Falls back to Google NCR if no URL is saved
- **popup/** (`src/entrypoints/popup/`): Extension popup UI built with Svelte
  - `App.svelte` - Main UI with device presets and settings buttons
  - 6 responsive device size presets (Desktop, Phone variants)
  - "Set as new tab" and "Reset" buttons for managing redirect URL

### Components

- **Icon.svelte** (`src/lib/Icon.svelte:1`): Device icon component
  - Displays device aspect ratio visualization
  - Uses Svelte 5 runes (`$props`, `$derived`)

### Utilities

- **config.ts** (`src/utils/config.ts:1`): Cloud storage helper
  - `Config.Get(key)` - Retrieve value from cloud storage
  - `Config.Set(key, value)` - Store value in cloud storage
  - `Config.Del(key)` - Delete value from cloud storage

### Configuration

- **wxt.config.ts** (`wxt.config.ts:1`): WXT configuration
  - Svelte module enabled
  - Permissions: storage, tabs
  - Chrome URL override for new tab
- **biome.json** (`biome.json:1`): Biome.js linter and formatter configuration
- **package.json** (`package.json:1`): Project metadata and dependencies

## Development Workflow

### Available Scripts

- `bun run dev` - Start development server for Chrome/Chromium
- `bun run dev:firefox` - Start development server for Firefox
- `bun run build` - Build extension for Chrome/Chromium
- `bun run build:firefox` - Build extension for Firefox
- `bun run zip` - Create distributable ZIP for Chrome
- `bun run zip:firefox` - Create distributable ZIP for Firefox
- `bun run check` - Run Svelte type checking
- `bun run lint` - Run Biome.js linter
- `bun run lint:fix` - Fix linting issues automatically
- `bun run format` - Format code with Biome.js

### Development Process

1. Run `bun run dev` to start the development server
2. Load the extension from `.output/chrome-mv3` (Chrome) or `.output/firefox-mv3` (Firefox)
3. Make changes to source files - WXT will automatically rebuild
4. Reload the extension in the browser to see changes
5. Run `bun run lint` to check code quality
6. Run `bun run format` to format code before committing

## Extension Architecture

### New Tab Override

- Automatically loads when user opens a new tab
- Retrieves saved URL from `browser.storage.sync`
- Redirects to saved URL or Google NCR (default)
- Uses `window.location.replace()` for seamless redirect

### Popup

- Built with Svelte 5
- Shows when user clicks the extension icon
- Features:
  - **Device Presets**: 6 responsive window sizes for testing
    - Desktop: 900×675px
    - Desktop Plus: 1024×768px
    - Desktop Max: 1366×1024px
    - Phone: 320×608px
    - Phone Plus: 380×723px
    - Phone Max: 420×798px
  - **Set as new tab**: Save current page as default new tab URL
  - **Reset**: Reset new tab to Google NCR
- Uses cloud storage for cross-device sync

## Dependencies

### Core
- `wxt@^0.20.13` - Web Extension Toolkit
- `@wxt-dev/module-svelte@^2.0.4` - Svelte integration for WXT

### UI
- `svelte@^5.46.1` - UI framework (version 5 - latest)
- `tailwindcss@^4.1.18` - Utility-first CSS framework (v4)

### Development
- `typescript@^5.9.3` - Type checking
- `svelte-check@^4.3.5` - Svelte type checking
- `@tsconfig/svelte@^5.0.6` - TypeScript config for Svelte
- `@biomejs/biome@^2.3.10` - Fast linter and formatter

## Coding Standards

### TypeScript
- Strict mode enabled
- Use explicit types where beneficial
- Leverage type inference where appropriate

### Svelte
- Use Svelte 5 syntax (runes, snippets, etc.)
- Component files use `.svelte` extension
- Use `<script lang="ts">` for TypeScript in components

### Styling
- Use Tailwind CSS v4 utility classes
- Import Tailwind in CSS files with `@import "tailwindcss"`
- Prefer utility classes over custom CSS
- Use `<style>` blocks in Svelte components for component-specific styles

### Code Quality
- Biome.js handles linting and formatting
- Single quotes for strings (configured in `biome.json`)
- Semicolons as needed (not required)
- 2-space indentation
- 100 character line width
- Run `bun run lint:fix` before committing

### File Organization
- Entry points go in `src/entrypoints/`
- Reusable components go in `src/lib/`
- Static assets go in `src/assets/`
- Each entry point type (popup, options, etc.) gets its own directory

## Browser API Usage

- Use `browser.*` API (WebExtension standard) for cross-browser compatibility
- **Storage API**: `browser.storage.sync` for cloud-synced settings
- **Tabs API**: `browser.tabs.query()` to get current tab
- **Windows API**: `browser.windows.create()` to open popup windows
- Extension uses Manifest V3

## Common Tasks

### Adding a New Component
1. Create `.svelte` file in `src/lib/`
2. Import and use in your entry point components

### Adding a New Entry Point
1. Create new file/directory in `src/entrypoints/`
2. WXT will automatically detect and build it
3. Types: `background`, `content`, `popup`, `options`, `sidepanel`, etc.

### Changing Device Presets
- Edit the `items` array in `src/entrypoints/popup/App.svelte`
- Each item has `width`, `height`, and `header` properties
- Height is calculated based on aspect ratio (4:3 for Desktop, 9:17 for Phone)

### Adding Dependencies
1. Run `bun add <package>` (or `bun add -D <package>` for dev dependencies)
2. Import normally in your TypeScript/Svelte files

### Using Tailwind CSS
1. Add utility classes directly in Svelte components
2. Example: `<div class="flex items-center gap-4 p-4 bg-gray-100">`
3. Tailwind v4 is automatically configured via `@import "tailwindcss"` in `app.css`
4. No need for a separate `tailwind.config.js` file in v4

## Build Output

- Development: `.output/<browser>-mv3/`
- Production: `.output/<browser>-mv3/` (optimized)
- ZIP files: `.output/<name>-<version>-<browser>.zip`

## Testing the Extension

### Chrome/Chromium
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `.output/chrome-mv3` directory

### Firefox
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select any file in `.output/firefox-mv3` directory

## Features in Detail

### New Tab Redirect
- When you open a new tab, it automatically redirects to your saved URL
- Set the URL by clicking "Set as new tab" in the popup while on your desired page
- Reset to Google with the "Reset" button
- URL is saved in cloud storage and syncs across devices

### Popup Window Opener
- Click any device preset to open the current page in a popup window with that size
- Useful for responsive design testing
- Window closes automatically after opening the popup
- Presets include common desktop and mobile device sizes

## Notes

- WXT handles manifest generation automatically
- Hot reload works for popup
- New tab changes require extension reload in browser
- All settings sync via `browser.storage.sync`
