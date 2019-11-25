// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "copyPasta" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand("extension.copyPasta", function() {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage("no active editor window");
			return;
		}

		const selection = editor.document.getText(editor.selection);
		const textArray = selection.split("\n");
		const defaultIndentation = Math.min(
			...textArray
				.filter((value) => value !== "")
				.map((string) => string.length - string.trimLeft().length)
		);
		const parsedArray = [];

		for (const line of textArray) {
			parsedArray.push(line.substring(defaultIndentation));
		}
		
		const parsedSelection = parsedArray.join("\n");

		vscode.env.clipboard.writeText(parsedSelection);
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
