import * as vscode from 'vscode';
import { FrontMatter } from './commands';
import { TaxonomyType } from './models';

let frontMatterStatusBar: vscode.StatusBarItem;
let debouncer: { (fnc: any, time: number): void; };

export function activate({ subscriptions }: vscode.ExtensionContext) {

	let insertTags = vscode.commands.registerCommand('frontMatter.insertTags', () => {
		FrontMatter.insert(TaxonomyType.Tag);
	});

	let insertCategories = vscode.commands.registerCommand('frontMatter.insertCategories', () => {
		FrontMatter.insert(TaxonomyType.Category);
	});

	let createTag = vscode.commands.registerCommand('frontMatter.createTag', () => {
		FrontMatter.create(TaxonomyType.Tag);
	});

	let createCategory = vscode.commands.registerCommand('frontMatter.createCategory', () => {
		FrontMatter.create(TaxonomyType.Category);
	});

	let exportTaxonomy = vscode.commands.registerCommand('frontMatter.exportTaxonomy', () => {
		FrontMatter.export();
	});
	
	let setDate = vscode.commands.registerCommand('frontMatter.setDate', () => {
		FrontMatter.setDate();
	});

	const toggleDraftCommand = 'frontMatter.toggleDraft';
	const toggleDraft = vscode.commands.registerCommand(toggleDraftCommand, async () => {
		await FrontMatter.toggleDraft();
		triggerShowDraftStatus();
	});

	// Create the status bar
 	frontMatterStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	frontMatterStatusBar.command = toggleDraftCommand;
	subscriptions.push(frontMatterStatusBar);
	debouncer = debounceShowDraftTrigger();
	// Register listeners that make sure the status bar
	subscriptions.push(vscode.window.onDidChangeActiveTextEditor(triggerShowDraftStatus));
	subscriptions.push(vscode.window.onDidChangeTextEditorSelection(triggerShowDraftStatus));
	// Automatically run the command
	triggerShowDraftStatus();

	// Subscribe all commands
	subscriptions.push(insertTags);
	subscriptions.push(insertCategories);
	subscriptions.push(createTag);
	subscriptions.push(createCategory);
	subscriptions.push(exportTaxonomy);
	subscriptions.push(setDate);
	subscriptions.push(toggleDraft);
}

export function deactivate() {}

const triggerShowDraftStatus = () => {
	debouncer(() => { FrontMatter.showDraftStatus(frontMatterStatusBar); }, 1000);
};

const debounceShowDraftTrigger = () => {
  let timeout: NodeJS.Timeout;

  return (fnc: any, time: number) => {
    const functionCall = (...args: any[]) => fnc.apply(args);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};