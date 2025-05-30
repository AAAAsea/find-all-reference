# Find All References

[![Version](https://img.shields.io/visual-studio-marketplace/v/Asea.find-all-references)](https://marketplace.visualstudio.com/items?itemName=Asea.find-all-references)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/Asea.find-all-references)](https://marketplace.visualstudio.com/items?itemName=Asea.find-all-references)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/Asea.find-all-references)](https://marketplace.visualstudio.com/items?itemName=Asea.find-all-references)

A VSCode extension that provides intuitive reference finding with hover links and CodeLens, bringing WebStorm-like experience to VSCode.

## ✨ Features

- 🎯 **Smart Hover Links**: Show "Find All References" link when hovering over symbols
- 📁 **File Reference CodeLens**: Display "References" at the beginning of files
- ⌨️ **Keyboard Shortcuts**: Quick access with configurable keybindings
- 🌐 **Multi-language Support**: TypeScript, JavaScript, Vue, React and more
- ⚙️ **Configurable**: Customize supported languages
- 📊 **Debug Output**: Detailed logging in output channel for troubleshooting

## 🚀 Quick Start

### Method 1: Hover Links (Recommended)

1. Hover your mouse over any symbol (variable, function, class, etc.)
2. Click the "Find All References" link in the hover tooltip
3. View all references in the References panel (uses `references-view.findReferences`)

### Method 2: File CodeLens

1. Open any supported file
2. Click the "References" link at the top of the file (line 1)
3. View all file references using TypeScript's file reference finder

### Method 3: Keyboard Shortcuts

- **Symbol References**: `Ctrl+Alt+F12` (Mac: `Cmd+Alt+F12`)
- **File References**: `Ctrl+Shift+F12` (Mac: `Cmd+Shift+F12`)

### Method 4: Toolbar Button

- Click the references button in the editor toolbar for file references

## 🔧 Configuration

Configure supported languages in your VSCode settings:

```json
{
  "findAllReferences.supportedLanguages": [
    "typescript",
    "javascript",
    "typescriptreact",
    "javascriptreact",
    "vue"
  ]
}
```

**Default supported languages**: TypeScript, JavaScript, TypeScript React, JavaScript React, Vue

## 🛠️ Technical Implementation

### Symbol Reference Finding

- **Hover Provider**: Detects symbols at hover position and shows clickable link
- **Command**: `findAllReferences.findReferences`
- **Implementation**: Calls VSCode's built-in `references-view.findReferences` command
- **Parameters**: Passes document URI and position from hover or cursor location

### File Reference Finding

- **CodeLens Provider**: Shows "References" link at the beginning of each file
- **Command**: `findAllReferences.findFileReferences`
- **Implementation**: Calls TypeScript extension's `typescript.findAllFileReferences` command
- **Scope**: Finds all import/require statements referencing the current file

### Key Features

- **Smart Parameter Passing**: Hover links pass exact position to reference finder
- **Language Filtering**: Only activates for configured language types
- **Fallback Handling**: Graceful error handling when commands are unavailable
- **Debug Logging**: Comprehensive output channel logging for troubleshooting

## 🎯 Use Cases

### TypeScript/JavaScript Development

```typescript
// Hover over 'myFunction' to see reference link
function myFunction() {
  return 'Hello World';
}

// Click "References" CodeLens at top of file to see all imports
```

### Vue Component Development

```vue
<!-- TestComponent.vue -->
<template>
  <div>My Component</div>
</template>

<!-- Click "References" to see where this component is imported -->
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

## 🐛 Debugging

The extension provides detailed logging in the "Find All References" output channel:

1. Open Command Palette (`Ctrl+Shift+P`)
2. Run "View: Toggle Output"
3. Select "Find All References" from the dropdown
4. View detailed logs of hover events, command executions, and errors

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

## 🤔 Why This Extension?

### Problems Solved

- **Context Switching**: No need to remember keyboard shortcuts or menu locations
- **Precision**: Hover links work at exact symbol positions
- **Discoverability**: CodeLens makes file references visible and accessible
- **Consistency**: Unified interface for both symbol and file references

### Design Philosophy

- **Don't Reinvent**: Uses VSCode's powerful built-in reference finding
- **Enhance UX**: Makes existing features more discoverable and accessible
- **Stay Lightweight**: Minimal code, maximum functionality
- **Be Reliable**: Comprehensive error handling and logging

## 🔄 Release Notes

### 1.0.0

- 🎯 Hover Provider for symbol references with clickable links
- 📁 CodeLens Provider for file references at document start
- ⌨️ Keyboard shortcuts for both symbol and file references
- 🌐 Configurable language support (TS, JS, Vue, React)
- 📊 Comprehensive debug logging in output channel
- 🚀 Integration with VSCode's references-view and TypeScript extension

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues

If you encounter any issues or have feature requests, please [create an issue](https://github.com/AAAAsea/find-all-reference/issues) on GitHub.

## ⭐ Support

If you find this extension helpful, please consider:

- ⭐ Starring the repository
- 📝 Leaving a review on the marketplace
- 🐛 Reporting bugs or suggesting features

---

**Enjoy enhanced reference finding in VSCode! 🚀**
