import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Marker from "@editorjs/marker";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import { postBlogReq } from "./request/postBlogReq";

let blogContent: null | undefined | object;
export function initializeEditor() {
  const editor = new EditorJS({
    holder: "editorjs",
    placeholder: "Add Your Words",
    tools: {
      header: Header,
      list: List,
      checklist: Checklist,
      quote: Quote,
      warning: Warning,
      marker: Marker,
      code: CodeTool,
      delimiter: Delimiter,
      inlineCode: InlineCode,
      linkTool: LinkTool,
      embed: Embed,
      table: Table,
    },
    onReady: () => {
      console.log("Editor.js is ready to work!");
    },
  });

  document.getElementById("save-button")?.addEventListener("click", () => {
    editor
      .save()
      .then(async (outputData: any) => {
        // Assuming the first header is the title
        const title = document.getElementById("blog-title") as HTMLInputElement;
        const blogData = {
          title: title.value?.trim(),
          content: outputData,
        };
        blogContent = blogData;

        const content: object | null | undefined = getBlogContent();

        await postBlogReq(content);

        window.location.href = "./viewBlog.html";
      })
      .catch((error: any) => {
        console.log("Saving failed: ", error);
      });
  });
}

function getBlogContent(): object | null | undefined {
  return blogContent;
}

export { getBlogContent };
