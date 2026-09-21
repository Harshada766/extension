# extension
# TabPulse Resource Shield

A Chrome/Chromium browser extension that helps reduce memory usage by automatically discarding inactive tabs based on a user-selected profile. It also includes a lightweight telemetry HUD overlay and a whitelist option to protect important sites from sleeping.

## Features

- Automatic tab sleeping for inactive tabs
- Three optimization profiles:
  - Aggressive
  - Balanced
  - Developer Heavy
- Manual whitelist for domains that should never sleep
- Memory usage HUD overlay for active pages
- Simple popup UI for fast configuration
- Works as an MV3 Chrome extension

## Project Overview

This extension monitors tab activity and uses Chrome alarms to periodically check for idle tabs. Tabs that remain inactive beyond the configured threshold are discarded to free memory. Important sites can be excluded using the whitelist in the popup.

## Files

- `manifest.json` — extension manifest and permissions
- `background.js` — idle tab detection and sleep logic
- `popup.html` — extension popup UI
- `popup.js` — saves profile and whitelist settings
- `hud.js` — injected HUD overlay on pages

## Installation

1. Open Google Chrome or Chromium.
2. Go to `chrome://extensions`.
3. Enable Developer Mode.
4. Click Load unpacked.
5. Select this project folder.
6. The extension will be enabled and ready to use.

## Usage

1. Click the extension icon in the browser toolbar.
2. Choose a memory profile:
   - Aggressive: sleep after 5 minutes
   - Balanced: sleep after 30 minutes
   - Developer Heavy: sleep after 2 hours
3. Add domains to the whitelist, one per line.
4. The extension will automatically manage idle tabs in the background.

## Notes

- The extension uses the `tabs`, `storage`, and `alarms` permissions.
- `chrome.tabs.discard()` is used to release memory from inactive tabs safely.
- The HUD is only a lightweight display and does not modify the page content beyond injecting a floating overlay.

## License

This project is provided as-is for educational and personal use.
