// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  SettingMonitor,
  ServerOptions,
  TransportKind,
  TextEdit,
  RequestType,
  TextDocumentIdentifier,
  ResponseError,
  InitializeError,
  State as ClientState,
  NotificationType
} from "vscode-languageclient";

export function activate(context: vscode.ExtensionContext) {
  const serverConf = {
    transport: TransportKind.stdio,
    command: "ocamllsp",
    args: ["--log-file=/Users/matthieudubet/lsplogg"]
  };

  let clientOptions: LanguageClientOptions = {
    documentSelector: ["ocaml"]
  };
  // Create the language client and start the client.
  let disposable = new LanguageClient(
    "ocamlLanguageServer",
    serverConf,
    clientOptions
  ).start();

  // Push the disposable to the context's subscriptions so that the
  // client can be deactivated on extension deactivation
  context.subscriptions.push(disposable);

  console.info("ocaml lsp running");
}

// this method is called when your extension is deactivated
export function deactivate() {}
