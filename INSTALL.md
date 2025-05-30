# 安装和使用指南

## 📦 安装扩展

### 方法1: 通过 VSIX 文件安装（推荐）

1. **下载扩展包**
   - 在当前目录找到 `find-all-references-1.0.0.vsix` 文件

2. **在 VSCode/Cursor 中安装**
   - 打开 VSCode 或 Cursor
   - 按 `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`) 打开命令面板
   - 输入 `Extensions: Install from VSIX...`
   - 选择 `find-all-references-1.0.0.vsix` 文件
   - 等待安装完成

3. **重启编辑器**
   - 安装完成后重启 VSCode/Cursor

## 🚀 使用方法

### 🎯 四种交互方式

#### 1. 智能悬浮提示 (推荐) ⭐
- **功能**: 查找符号引用
- **操作**: 将鼠标悬停在任何符号上
- **结果**: 显示悬浮提示，包含可点击的 "Find All References" 链接
- **优势**: 最直观，符合用户习惯

#### 2. CodeLens 链接
- **功能**: 查找文件引用
- **位置**: 文件第一行
- **显示**: "$(reference) References"
- **操作**: 直接点击链接

#### 3. 快捷键
- **符号引用**: `Ctrl+Alt+F12` (Mac: `Cmd+Alt+F12`)
- **文件引用**: `Ctrl+Shift+F12` (Mac: `Cmd+Shift+F12`)

#### 4. 工具栏按钮
- **位置**: 编辑器右上角
- **图标**: `$(reference)`
- **功能**: 查找文件引用

## 🧪 测试扩展功能

### 测试智能悬浮提示
1. **打开演示文件**
   - 在VSCode中打开 `examples/demo.ts` 文件

2. **测试悬浮功能**
   - 将鼠标悬停在 `DemoClass`、`demoMethod`、`demoInstance` 等符号上
   - 应该看到包含符号名称和 "Find All References" 链接的悬浮提示
   - 点击链接应该在引用视图中显示所有引用

### 测试 CodeLens 功能
1. **查看文件开头**
   - 在 `examples/demo.ts` 文件的第一行应该看到：
   - "$(reference) References"

2. **测试 CodeLens**
   - 点击 CodeLens 链接
   - 应该在引用视图中显示文件的所有引用位置

### 测试快捷键
1. **符号引用快捷键**
   - 将光标放在任何符号上
   - 按 `Ctrl+Alt+F12` (Mac: `Cmd+Alt+F12`)
   - 应该显示符号的所有引用

2. **文件引用快捷键**
   - 在任何文件中按 `Ctrl+Shift+F12` (Mac: `Cmd+Shift+F12`)
   - 应该显示文件的所有引用

### 测试工具栏按钮
1. **查找按钮**
   - 在编辑器右上角应该看到 `$(reference)` 图标按钮

2. **测试按钮**
   - 点击按钮应该显示当前文件的所有引用

## 📋 预期结果

### 符号引用查找结果
扩展会按以下优先级尝试显示引用：

1. **VSCode References View** (推荐) - 在侧边栏显示引用树
2. **Peek References** - 在编辑器中显示引用预览
3. **错误提示** - 如果找不到引用或出现错误

### 文件引用查找结果
扩展会按以下优先级尝试显示文件引用：

1. **TypeScript File References** (推荐) - 精确的 import/require 引用
2. **搜索面板备选** - 如果 TypeScript 功能不可用

## 🎨 用户体验特点

### 智能悬浮的优势
- ✅ **零学习成本**: 符合用户直觉
- ✅ **上下文相关**: 直接在符号位置显示
- ✅ **非侵入性**: 不占用界面空间
- ✅ **即时反馈**: 鼠标悬停即可看到选项

### CodeLens 的优势
- ✅ **位置固定**: 总是在文件开头
- ✅ **一目了然**: 清楚显示文件名
- ✅ **持续可见**: 不需要特殊操作
- ✅ **专业外观**: 类似 IDE 的 CodeLens 功能

## 🔧 故障排除

### 悬浮提示不显示
- 确保鼠标悬停在有效的符号上（变量、函数、类等）
- 检查文件语言是否在支持列表中
- 尝试重启 VSCode

### CodeLens 不显示
- 确保文件语言在支持列表中
- 检查 VSCode 设置中 CodeLens 功能是否启用
- 尝试重新打开文件

### 引用查找失败
- 确保项目有正确的 TypeScript 配置
- 检查是否安装了 TypeScript 扩展
- 尝试重新索引项目（重启 VSCode）

## 🎯 最佳实践

1. **优先使用悬浮提示** - 最直观的交互方式
2. **利用 CodeLens** - 快速了解文件依赖关系
3. **记住快捷键** - 提高工作效率
4. **配置支持语言** - 根据项目需要调整语言列表

## 📞 获取帮助

如果遇到问题：
1. 检查 VSCode 开发者控制台的错误信息
2. 确认扩展已正确安装和激活
3. 查看项目的 GitHub Issues
4. 提交新的 Issue 描述问题

## ⚙️ 配置选项

### 自定义支持的语言
1. 打开 VSCode 设置 (`Ctrl+,`)
2. 搜索 `findAllReferences.supportedLanguages`
3. 添加或移除支持的语言类型

```json
{
  "findAllReferences.supportedLanguages": [
    "typescript", "javascript", "vue", "python", "java"
  ]
}
```

### 自定义文件搜索模式
1. 打开 VSCode 设置 (`Ctrl+,`)
2. 搜索 `findAllReferences.fileSearchPatterns`
3. 添加或移除文件搜索模式

```json
{
  "findAllReferences.fileSearchPatterns": [
    "**/*.ts", "**/*.js", "**/*.vue", "**/*.py"
  ]
}
```

## 🔧 支持的文件类型 (默认)

### 符号引用查找支持:
- `.ts` - TypeScript
- `.js` - JavaScript
- `.tsx` - TypeScript React
- `.jsx` - JavaScript React  
- `.vue` - Vue组件
- `.py` - Python
- `.java` - Java
- `.cs` - C#
- `.go` - Go
- `.rs` - Rust
- `.php` - PHP

### 文件引用查找支持:
- 所有上述文件类型
- 可通过配置扩展更多类型

## 🎯 实际使用场景

### Vue.js 开发
```vue
<!-- TestComponent.vue -->
<template>
  <div>My Component</div>
</template>
```
1. 打开 `TestComponent.vue`
2. 按 `Ctrl+Shift+F12` 查找哪些地方使用了这个组件
3. 快速了解组件的使用情况和依赖关系

### React/TypeScript 重构
```typescript
function myUtilFunction() {
  return "utility";
}
```
1. 选中 `myUtilFunction`
2. 按 `Ctrl+Alt+F12` 查找所有调用位置
3. 安全地进行函数重命名或重构

### Python 模块分析
```python
# utils.py
def helper_function():
    pass
```
1. 打开 `utils.py`
2. 使用文件引用查找了解模块被导入的位置
3. 优化模块结构和依赖关系

## 🎉 享受使用！

现在你拥有了比WebStorm更强大的引用查找功能：
- 🎯 精确的符号引用查找
- 📁 智能的文件引用查找  
- ⚙️ 灵活的自定义配置
- 🌐 广泛的语言支持

开始高效的代码导航和重构之旅吧！ 