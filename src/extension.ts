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
    command: "ocamllsp"
    //TODO args: ["--log-file=lsplog"]
  };

  let clientOptions: LanguageClientOptions = {
    documentSelector: ["ocaml"]
  };
  // Create the language client and start the client.
  let disposable = new LanguageClient(
    "vscode-ocaml-lsp-client",
    "OCaml Language Server",
    serverConf,
    clientOptions
  ).start();

  vscode.commands.registerCommand("vscode-ocaml-lsp-client.restart", () => {
    if (disposable) {
      disposable.dispose();
    }
    activate(context);
  });
  // Push the disposable to the context's subscriptions so that the
  // client can be deactivated on extension deactivation
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
