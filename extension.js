var vscode = require("vscode");

function activate(context) {
  // formatter implemented using API
  // https://code.visualstudio.com/docs/extensionAPI/vscode-api#DocumentFormattingEditProvider
  const formatter = vscode.languages.registerDocumentFormattingEditProvider(
    "cfml",
    {
      provideDocumentFormattingEdits(
        document
      ) {
        // get configuration settings from user
        const config = vscode.workspace.getConfiguration().editor;
        const firstLineId = 0;
        const firstLine = document.lineAt(0);
        const lastLineId = document.lineCount - 1;
        const lastLine = document.lineAt(lastLineId);

        // always trim trailing whitespace
        vscode.commands.executeCommand("editor.action.trimTrailingWhitespace");

        // ensure indentation is consistent
        vscode.commands.executeCommand(`editor.action.indentationTo${config.insertSpaces ? 'Spaces' : 'Tabs'}`);

        // TextEdit[] required for return param
        let edits = [];

        for (i = firstLineId; i < lastLineId; i++) {
          var line = document.lineAt(i);

          // delete lines that are only whitespace
          if (line.isEmptyOrWhitespace) {
            edits.push(
              vscode.TextEdit.delete(new vscode.Range(line.start, line.end))
            );
          }

          // remove spaces more than 1, e.g.
          // `div  style=` --> `div style=`
          // ?
        }
        return edits;
      }
    }
  );
  context.subscriptions.push(formatter);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
