// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  // formatter implemented using API
  // https://code.visualstudio.com/docs/extensionAPI/vscode-api#DocumentFormattingEditProvider
  const formatter = vscode.languages.registerDocumentFormattingEditProvider('cfml', {
    provideDocumentFormattingEdits(document) {
      const firstLineId = 0;
      const firstLine = document.lineAt(0);
      const lastLineId = document.lineCount - 1;
      const lastLine = document.lineAt(lastLineId);
      vscode.commands.executeCommand("editor.action.indentationToTabs");
      vscode.commands.executeCommand("editor.action.trimTrailingWhitespace");
      // for (i = 0; i < lastLineId; i++) {

      // }
      if (firstLine.text !== '42') {
          // TODO: determine why TextEdits are not being applied
          return [vscode.TextEdit.insert(new vscode.Position(0, 0), '42\n')];
      }
    }
  });
  context.subscriptions.push(formatter);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
