declare module "@editorjs/editorjs" {
  interface OutputBlockData {
    id?: string;
    type: string;
    data: any;
  }

  interface OutputData {
    blocks: OutputBlockData[];
    time?: number;
    version?: string;
  }

  interface EditorConfig {
    holder: string;
    tools?: { [toolName: string]: any };
    placeholder?: string;
    onReady?: () => void;
  }

  class EditorJS {
    constructor(config: EditorConfig);
    save(): Promise<OutputData>;
  }

  export default EditorJS;
}

declare module "@editorjs/header";
declare module "@editorjs/list";
declare module "@editorjs/checklist";
declare module "@editorjs/quote";
declare module "@editorjs/warning";
declare module "@editorjs/marker";
declare module "@editorjs/code";
declare module "@editorjs/delimiter";
declare module "@editorjs/inline-code";
declare module "@editorjs/link";
declare module "@editorjs/embed";
declare module "@editorjs/table";
