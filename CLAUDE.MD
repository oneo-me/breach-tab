# Breach Tab - Chrome Extension

## Project Overview

Breach Tab is a Chrome/Edge extension that customizes the new tab experience. It allows users to set any website as their new tab page and provides functionality to open tabs in separate windows.

**Version:** 1.2025.1
**Author:** ONEO
**License:** MIT

## Features

1. **Custom New Tab URL**: Set any website as the content of the new tab
2. **Window Management**: Open the current tab in a separate window (popup)
3. **Privacy-focused**: No user information collection

## Tech Stack

- **Framework:** Svelte 5.20.1
- **Language:** TypeScript 5.7.3
- **Build Tool:** extension (latest)
- **Manifest:** Chrome Extension Manifest V3

## Project Structure

```
/
├── src/
│   ├── popup/
│   │   ├── index.ts          # Popup initialization
│   │   └── app/
│   │       └── main.svelte   # Main popup component
│   ├── newtab/
│   │   ├── index.html        # New tab override page
│   │   └── index.ts          # New tab redirect logic
│   └── utils/
│       └── config.ts         # Chrome storage utility class
├── images/                   # Extension icons
├── manifest.json            # Extension manifest
├── package.json
└── tsconfig.json
```

## Key Components

### New Tab Page (`src/newtab/index.ts`)

Handles new tab redirection directly within the new tab page:
- Loads when user opens a new tab
- Retrieves saved URL from storage
- Redirects to configured URL or defaults to Google
- Uses `window.location.replace()` for seamless redirection

### Config Utility (`src/utils/config.ts`)

Wrapper class for Chrome storage API:
- `Get(key)`: Retrieve configuration value
- `Set(key, value)`: Store configuration value
- `Del(key)`: Delete configuration value

Uses `chrome.storage.sync` for cross-device synchronization.

### Popup Interface (`src/popup/`)

Svelte-based UI for user interaction:
- Dynamic item sizes
- Icon component
- Manages new tab URL settings

## Permissions

- `storage`: Save user preferences (sync across devices)

## Development

### Scripts

```bash
npm run dev      # Development mode with hot reload
npm run start    # Start development server
npm run build    # Build production extension
```

### Build System

Uses the `extension` package for Chrome extension development workflow.

## Configuration

The extension uses Chrome's sync storage to persist:
- `saveUrl`: User's preferred new tab URL (defaults to "https://www.google.com/ncr")

## Branch Information

- **Current branch:** gracious-williams
- **Main branch:** main
- **Worktree:** /Users/oneo/.claude-worktrees/chrome-breach-tab/gracious-williams

## Recent Changes

- Added popup interface with dynamic item sizes and icon component
- Implemented functionality for opening current tab in popup window and closing original window
- Added new tab URL setting and reset functionality
- Updated README with feature descriptions

## Development Notes

- Extension uses Manifest V3 (latest Chrome extension standard)
- New tab redirection handled client-side (no background service worker needed)
- Svelte 5 uses new `svelte.mount()` API instead of legacy `new Component()`
- TypeScript configured with Svelte-specific settings via `@tsconfig/svelte`
- Minimal permissions for better privacy and security
