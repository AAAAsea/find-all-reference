# Find All References (Wooref)

[![Version](https://img.shields.io/visual-studio-marketplace/v/Asea.find-all-references)](https://marketplace.visualstudio.com/items?itemName=Asea.find-all-references)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/Asea.find-all-references)](https://marketplace.visualstudio.com/items?itemName=Asea.find-all-references)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/Asea.find-all-references)](https://marketplace.visualstudio.com/items?itemName=Asea.find-all-references)

A VSCode extension that provides intuitive reference finding with hover links and CodeLens, bringing WebStorm-like experience to VSCode.

## ✨ Features

- 🎯 **Smart Hover Links**: Show "Find All References" link when hovering over symbols
- 📁 **File Reference CodeLens**: Display "🔍 Find File References" at the beginning of files
- 🔘 **Always-Visible Toolbar Button**: File references button shows immediately when opening files
- ⌨️ **Keyboard Shortcuts**: Quick access with configurable keybindings
- 🌐 **Multi-language Support**: TypeScript, JavaScript, Vue, React and more
- ⚙️ **Highly Configurable**: Enable/disable features and customize supported languages
- 📊 **Enhanced Debug Output**: Detailed logging in output channel for troubleshooting

## 🚀 Quick Start

### Method 1: Hover Links (Recommended)

1. Hover your mouse over any symbol (variable, function, class, etc.)
2. Click the "Find All References" link in the hover tooltip
3. View all references in the References panel (uses `references-view.findReferences`)

### Method 2: File CodeLens

1. Open any supported file (TypeScript, JavaScript, Vue, etc.)
2. Look for the "🔍 Find File References" link at the top of the file (line 1)
3. Click it to view all file references using TypeScript's file reference finder

### Method 3: Toolbar Button (New!)

- The references button now appears **immediately** when you open a file from the sidebar
- No need to click into the editor to focus it first
- Click the button in the editor toolbar for instant file references

### Method 4: Keyboard Shortcuts

- **Symbol References**: `Ctrl+Alt+F12` (Mac: `Cmd+Alt+F12`)
- **File References**: `Ctrl+Shift+F12` (Mac: `Cmd+Shift+F12`)

## 🔧 Configuration

Configure the extension behavior in your VSCode settings:

```json
{
  "findAllReferences.supportedLanguages": [
    "typescript",
    "javascript",
    "typescriptreact",
    "javascriptreact",
    "vue"
  ],
  "findAllReferences.enableCodeLens": true,
  "findAllReferences.enableHover": true
}
```

### Configuration Options

| Setting                                | Type      | Default                                                                     | Description                                                                 |
| -------------------------------------- | --------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `findAllReferences.supportedLanguages` | `array`   | `["typescript", "javascript", "typescriptreact", "javascriptreact", "vue"]` | List of supported language types for finding references                     |
| `findAllReferences.enableCodeLens`     | `boolean` | `true`                                                                      | Enable CodeLens to show 'Find File References' at the top of files          |
| `findAllReferences.enableHover`        | `boolean` | `true`                                                                      | Enable hover links to show 'Find All References' when hovering over symbols |

### VSCode CodeLens Settings

Make sure CodeLens is enabled in your VSCode settings:

```json
{
  "editor.codeLens": true,
  "typescript.referencesCodeLens.enabled": true,
  "javascript.referencesCodeLens.enabled": true
}
```

## 🛠️ Technical Implementation

### Symbol Reference Finding

- **Hover Provider**: Detects symbols at hover position and shows clickable link
- **Command**: `findAllReferences.findReferences`
- **Implementation**: Calls VSCode's built-in `references-view.findReferences` command
- **Parameters**: Passes document URI and position from hover or cursor location

### File Reference Finding

- **CodeLens Provider**: Shows "🔍 Find File References" link at the beginning of each file
- **Toolbar Button**: Always visible when files are open (no focus required)
- **Command**: `findAllReferences.findFileReferences`
- **Implementation**: Calls TypeScript extension's `typescript.findAllFileReferences` command
- **Scope**: Finds all import/require statements referencing the current file

### Key Features

- **Smart Parameter Passing**: Hover links pass exact position to reference finder
- **Language Filtering**: Only activates for configured language types
- **Configurable Components**: Enable/disable CodeLens and Hover independently
- **Immediate Toolbar Access**: Button shows instantly when opening files
- **Fallback Handling**: Graceful error handling when commands are unavailable
- **Enhanced Debug Logging**: Comprehensive output channel logging for troubleshooting

## 🎯 Use Cases

### TypeScript/JavaScript Development

```typescript
// Hover over 'myFunction' to see reference link
function myFunction() {
  return 'Hello World';
}

// Click "🔍 Find File References" CodeLens at top of file to see all imports
```

### Vue Component Development

```vue
<!-- TestComponent.vue -->
<template>
  <div>My Component</div>
</template>

<!-- Click "🔍 Find File References" to see where this component is imported -->
```

### React Development

```jsx
// Hover over component names, props, or functions
const MyComponent = () => {
  return <div>Hello</div>;
};
```

## 📋 Requirements

- **VSCode**: 1.74.0 or higher
- **TypeScript Extension**: For file reference finding (usually pre-installed)
- **References View**: For symbol reference display (built into VSCode)

## 🐛 Debugging & Troubleshooting

The extension provides detailed logging in the "Find All References" output channel:

1. Open Command Palette (`Ctrl+Shift+P`)
2. Run "View: Toggle Output"
3. Select "Find All References" from the dropdown
4. View detailed logs of hover events, command executions, and errors

### Common Issues

**CodeLens not showing?**

- Check that `editor.codeLens` is `true` in VSCode settings
- Verify `findAllReferences.enableCodeLens` is `true`
- Check the output channel for language support messages

**Hover links not working?**

- Ensure `findAllReferences.enableHover` is `true`
- Check if your file language is in `supportedLanguages`
- Look for hover events in the output channel

**Toolbar button not appearing immediately?**

- This should now work automatically after the latest update
- The button appears as soon as you open a file, no focus required

## 🔄 Commands

| Command                                | Description                                     | Keybinding       |
| -------------------------------------- | ----------------------------------------------- | ---------------- |
| `findAllReferences.findReferences`     | Find symbol references at cursor/hover position | `Ctrl+Alt+F12`   |
| `findAllReferences.findFileReferences` | Find all references to current file             | `Ctrl+Shift+F12` |

## ⚡ Performance

- **Lightweight**: Only activates for configured language types
- **Efficient**: Leverages VSCode's built-in language services
- **Non-blocking**: Asynchronous command execution
- **Memory-friendly**: Minimal memory footprint with proper cleanup
- **Configurable**: Disable unused features to reduce overhead

## 🤔 Why This Extension?

### Problems Solved

- **Context Switching**: No need to remember keyboard shortcuts or menu locations
- **Precision**: Hover links work at exact symbol positions
- **Discoverability**: CodeLens makes file references visible and accessible
- **Immediate Access**: Toolbar button works instantly when opening files
- **Consistency**: Unified interface for both symbol and file references

### Design Philosophy

- **Don't Reinvent**: Uses VSCode's powerful built-in reference finding
- **Enhance UX**: Makes existing features more discoverable and accessible
- **Stay Lightweight**: Minimal code, maximum functionality
- **Be Configurable**: Users control what features they want
- **Be Reliable**: Comprehensive error handling and logging

## 🔄 Release Notes

### 1.1.0 (Latest)

- 🔘 **Improved Toolbar Button**: Now shows immediately when opening files (no focus required)
- ⚙️ **Enhanced Configuration**: Added `enableCodeLens` and `enableHover` options
- 🎨 **Better CodeLens**: Improved title with emoji and tooltip
- 📊 **Enhanced Debugging**: More detailed output channel logging
- 🚀 **Better Activation**: Added `onStartupFinished` activation event
- 🔧 **Resolve Support**: Added CodeLens resolve method for better reliability

### 1.0.1

- 🕙 Optimize the display timing of buttons

### 1.0.0

- 🎯 Hover Provider for symbol references with clickable links
- 📁 CodeLens Provider for file references at document start
- ⌨️ Keyboard shortcuts for both symbol and file references
- 🌐 Multi-language support with configurable language list
- 📊 Debug output channel for troubleshooting

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/AAAAsea/find-all-reference/issues).

## ⭐ Support

If you find this extension helpful, please consider:

- ⭐ Starring the repository
- 📝 Leaving a review on the marketplace
- 🐛 Reporting bugs or suggesting features

---

**Enjoy enhanced reference finding in VSCode! 🚀**
