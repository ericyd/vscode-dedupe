// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var fs = require('fs');
var path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  var disposable = vscode.commands.registerCommand(
    'extension.dedupe',
    function() {
      var activeEditor = vscode.window.activeTextEditor;
      var activeDoc = activeEditor.document;
      var activeDocText = activeDoc.getText().toString();

      var dedupedText;
      try {
        dedupedText = activeDocText
          .split(/\n/)
          .filter((item, pos, self) => {
            // if not equal, then it's a dupe
            return self.indexOf(item) === pos;
          })
          .join('\n');
      } catch (e) {
        console.log('error splitting', e);
      }

      try {
        return activeEditor.edit(editorEdit => {
          var start = new vscode.Position(0, 0);
          var end = new vscode.Position(activeDoc.lineCount + 1, 0);
          editorEdit.delete(new vscode.Range(start, end));
          editorEdit.replace(new vscode.Position(0, 0), dedupedText);
        });
      } catch (e) {
        console.log('error!', e);
        return;
      }
    }
  );
  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
