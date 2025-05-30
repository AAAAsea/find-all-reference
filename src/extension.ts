import * as vscode from 'vscode';

// 创建输出通道
let outputChannel: vscode.OutputChannel;

// 存储悬停时的位置信息，用于命令调用
let lastHoverPosition: { uri: vscode.Uri; position: vscode.Position } | undefined;

/**
 * 扩展激活函数
 * @param context 扩展上下文
 */
export function activate(context: vscode.ExtensionContext) {
    // 创建输出通道
    outputChannel = vscode.window.createOutputChannel('Find All References');
    outputChannel.appendLine('Find All References extension is now active!');
    outputChannel.appendLine(`激活时间: ${new Date().toISOString()}`);
    outputChannel.appendLine(`支持的语言: ${getSupportedLanguages().join(', ')}`);

    // 注册 "查找符号引用" 命令
    const disposable1 = vscode.commands.registerCommand(
        'findAllReferences.findReferences',
        async (uri?: vscode.Uri, position?: vscode.Position) => {
            await findReferences(uri, position); // 传递参数
        }
    );


    // 注册 "查找文件引用" 命令
    const disposable2 = vscode.commands.registerCommand('findAllReferences.findFileReferences', async () => {
        outputChannel.appendLine('执行命令: findAllReferences.findFileReferences');
        await findFileReferences();
    });

    // 注册 Hover Provider - 在符号上悬停时显示查找引用选项
    const hoverProvider = vscode.languages.registerHoverProvider(
        getSupportedLanguages().map(lang => ({ language: lang })),
        new FindReferencesHoverProvider()
    );

    // 注册 CodeLens Provider - 在文件开头显示查找文件引用选项
    const codeLensProvider = vscode.languages.registerCodeLensProvider(
        getSupportedLanguages().map(lang => ({ language: lang })),
        new FindFileReferencesCodeLensProvider()
    );

    outputChannel.appendLine('所有命令和提供者已注册完成');

    context.subscriptions.push(disposable1, disposable2, hoverProvider, codeLensProvider, outputChannel);
}

/**
 * 获取用户配置的支持语言列表
 */
function getSupportedLanguages(): string[] {
    const config = vscode.workspace.getConfiguration('findAllReferences');
    return config.get<string[]>('supportedLanguages', [
        'typescript', 'javascript', 'typescriptreact', 'javascriptreact', 'vue'
    ]);
}

/**
 * Hover Provider - 在符号上悬停时显示查找引用选项
 */
class FindReferencesHoverProvider implements vscode.HoverProvider {
    async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Hover | undefined> {
        // 检查是否为支持的语言
        const supportedLanguages = getSupportedLanguages();
        if (!supportedLanguages.includes(document.languageId)) {
            outputChannel.appendLine(`语言 "${document.languageId}" 不在支持列表中，跳过悬停提示`);
            return undefined;
        }

        // 获取当前位置的单词范围
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return undefined;
        }

        const word = document.getText(wordRange);
        if (!word || word.trim().length === 0) {
            return undefined;
        }

        outputChannel.appendLine(`悬停在单词 "${word}" 上，位置: ${position.line}:${position.character}`);

        // 存储悬停位置信息
        lastHoverPosition = { uri: document.uri, position: position };

        // 使用专门的悬停命令
        const contents = new vscode.MarkdownString();
        contents.appendMarkdown(`**${word}**\n\n`);

        // 构建命令 URI（关键步骤）
        const commandUri = vscode.Uri.parse(
            `command:findAllReferences.findReferences?${encodeURIComponent(
                JSON.stringify([document.uri, position])
            )}`
        );

        outputChannel.appendLine(`commandUri:  ${JSON.stringify(commandUri)}`,)

        contents.appendMarkdown(`[Find All References](${commandUri})`);
        contents.isTrusted = true;

        return new vscode.Hover(contents, wordRange);
    }
}

/**
 * CodeLens Provider - 在文件开头显示查找文件引用选项
 */
class FindFileReferencesCodeLensProvider implements vscode.CodeLensProvider {
    provideCodeLenses(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
        // 检查是否为支持的语言
        const supportedLanguages = getSupportedLanguages();
        if (!supportedLanguages.includes(document.languageId)) {
            outputChannel.appendLine(`语言 "${document.languageId}" 不在支持列表中，跳过CodeLens`);
            return [];
        }

        outputChannel.appendLine(`为文件 "${document.fileName}" 提供CodeLens`);

        // 在文件第一行创建 CodeLens
        const topOfDocument = new vscode.Range(0, 0, 0, 0);
        const codeLens = new vscode.CodeLens(topOfDocument);
        codeLens.command = {
            title: `References`,
            command: 'findAllReferences.findFileReferences',
            arguments: [document.uri]
        };

        return [codeLens];
    }
}

/**
 * 查找符号引用 - 直接调用VSCode内置命令
 */
async function findReferences(uri?: vscode.Uri, position?: vscode.Position) {
    outputChannel.appendLine('开始查找符号引用...');

    outputChannel.appendLine(JSON.stringify(uri));
    outputChannel.appendLine(JSON.stringify(position));

    let targetUri: vscode.Uri;
    let targetPosition: vscode.Position;

    // 如果有传递参数（来自悬浮提示），使用传递的参数
    if (uri && position) {
        targetUri = uri;
        targetPosition = position;
        outputChannel.appendLine(`使用传递的参数 - URI: ${uri.toString()}, Position: ${position.line}:${position.character}`);
    } else {
        // 否则使用当前编辑器的光标位置
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            outputChannel.appendLine('错误: 没有打开的编辑器');
            vscode.window.showErrorMessage('没有打开的编辑器');
            return;
        }
        targetUri = editor.document.uri;
        targetPosition = editor.selection.active;
        outputChannel.appendLine(`使用当前编辑器 - URI: ${targetUri.toString()}, Position: ${targetPosition.line}:${targetPosition.character}`);
    }

    // 获取目标文档
    const document = await vscode.workspace.openTextDocument(targetUri);

    // 检查是否为支持的语言
    const supportedLanguages = getSupportedLanguages();
    if (!supportedLanguages.includes(document.languageId)) {
        outputChannel.appendLine(`警告: 当前语言 "${document.languageId}" 不在支持列表中`);
        vscode.window.showWarningMessage(
            `当前语言 "${document.languageId}" 不在支持列表中。可在设置中配置 "findAllReferences.supportedLanguages"`
        );
        return;
    }

    try {
        // 确保目标文档在编辑器中打开，并将光标移动到目标位置
        await vscode.window.showTextDocument(document, {
            selection: new vscode.Range(targetPosition, targetPosition),
            preserveFocus: false
        });

        outputChannel.appendLine(`已打开文档并移动光标到位置: ${targetPosition.line}:${targetPosition.character}`);
        outputChannel.appendLine('尝试调用 references-view.findReferences 命令...');
        // 直接调用VSCode内置的引用查找命令
        await vscode.commands.executeCommand('references-view.findReferences', targetUri, targetPosition);
        outputChannel.appendLine('成功调用 references-view.findReferences 命令');
    } catch (error) {
        outputChannel.appendLine('[Error]')
    }
}

/**
 * 查找文件引用 - 使用TypeScript扩展的内置命令
 */
async function findFileReferences(uri?: vscode.Uri) {
    outputChannel.appendLine('开始查找文件引用...');

    const editor = vscode.window.activeTextEditor;

    if (!editor && !uri) {
        outputChannel.appendLine('错误: 没有打开的编辑器且未提供URI');
        vscode.window.showErrorMessage('没有打开的编辑器');
        return;
    }

    const document = uri ? await vscode.workspace.openTextDocument(uri) : editor!.document;
    outputChannel.appendLine(`查找文件引用: ${document.fileName}`);

    try {
        outputChannel.appendLine('尝试调用 typescript.findAllFileReferences 命令...');
        // 使用 TypeScript 扩展提供的文件引用查找命令
        await vscode.commands.executeCommand('typescript.findAllFileReferences', document.uri);
        outputChannel.appendLine('成功调用 typescript.findAllFileReferences 命令');
    } catch (error) {
        outputChannel.appendLine(`查找文件引用失败: ${error}`);
        console.error('查找文件引用失败:', error);
    }
}

/**
 * 扩展停用函数
 */
export function deactivate() {
    outputChannel?.appendLine('Find All References extension is now deactivated!');
    outputChannel?.dispose();
}
