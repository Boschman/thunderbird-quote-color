# Quote Color for Thunderbird

A Thunderbird extension that automatically adds color to quoted text in emails using inline styles, ensuring compatibility with all email clients.

## Features

- Quote level 1: Blue (#3366ff)
- Quote level 2 and deeper: Purple (#a07c9f)
- Colors are added as inline styles to the HTML, ensuring they appear in all email clients
- Automatically applies when composing, replying to, or forwarding emails
- Dynamic updates when pasting quoted content

## How it works

The extension injects a content script into compose windows that:
1. Finds all quoted text (blockquote elements)
2. Determines the nesting level of each quote
3. Applies inline style attributes with the appropriate color
4. Monitors for changes to update colors dynamically

The inline styles are included in the sent email HTML, so recipients see the colored quotes regardless of their email client's CSS support.

## Installation

1. Open Thunderbird
2. Go to Tools → Add-ons and Themes
3. Click the gear icon and select "Install Add-on From File..."
4. Select the `quote-color.xpi` file (see Building section)

## Building

To create the installable .xpi file:

```bash
zip -r quote-color.xpi manifest.json background.html background.js compose-script.js icon.svg
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