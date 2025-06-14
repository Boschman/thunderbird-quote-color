# Quote Color for Thunderbird

A Thunderbird extension that automatically colors quoted text in compose windows.

## Features

- Quote level 1: Blue (#3366ff)
- Quote level 2 and deeper: Purple (#a07c9f)
- Automatically applies when composing or replying to emails

## Installation

1. Open Thunderbird
2. Go to Tools → Add-ons and Themes
3. Click the gear icon and select "Install Add-on From File..."
4. Select the `quote-color.xpi` file (see Building section)

## Building

To create the installable .xpi file:

```bash
zip -r quote-color.xpi manifest.json background.html background.js compose.css icon.svg
```

## Development

To test during development:
1. Open Thunderbird
2. Go to Tools → Developer Tools → Debug Add-ons
3. Click "Load Temporary Add-on"
4. Select the manifest.json file from this directory

## Compatibility

- Thunderbird 128.0 and later

## License

This extension is provided as-is for personal use.