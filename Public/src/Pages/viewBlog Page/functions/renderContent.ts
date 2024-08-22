type BlockType =
  | "header"
  | "paragraph"
  | "list"
  | "checklist"
  | "quote"
  | "code"
  | "delimiter"
  | "image"
  | "table";

interface BlockData {
  text?: string;
  level?: number;
  style?: string;
  items?: { text: string; checked?: boolean }[];
  code?: string;
  file?: { url: string };
  content?: string[][];
  caption?: string;
}

interface Block {
  type: BlockType;
  data: BlockData;
}

interface Content {
  blocks: Block[];
}

export function renderContent(content: Content, container: HTMLElement): void {
  content.blocks.forEach((block) => {
    let element: HTMLElement | null = null;

    switch (block.type) {
      case "header":
        element = document.createElement(
          `h${block.data.level}` as keyof HTMLElementTagNameMap
        );
        element.textContent = block.data.text || "";
        element.classList.add(
          "font-bold",
          `text-${block.data.level ? block.data.level + 2 : ""}xl`,
          "my-4"
        );
        break;

      case "paragraph":
        element = document.createElement("p");
        element.innerHTML = block.data.text || "";
        element.classList.add("text-lg", "leading-relaxed", "my-2");
        break;

      case "list":
        element = document.createElement(
          block.data.style === "ordered" ? "ol" : "ul"
        );
        block.data.items?.forEach((item) => {
          const li = document.createElement("li");
          li.innerHTML = item.text;
          li.classList.add("list-disc", "list-inside", "my-1");
          element!.appendChild(li);
        });
        element.classList.add("my-2", "ml-4");
        break;

      case "checklist":
        element = document.createElement("ul");
        block.data.items?.forEach((item) => {
          const li = document.createElement("li");
          li.innerHTML = `<input type="checkbox" ${item.checked ? "checked" : ""}> ${item.text}`;
          li.classList.add("my-1");
          element!.appendChild(li);
        });
        element.classList.add("my-2", "ml-4");
        break;

      case "quote":
        element = document.createElement("blockquote");
        element.innerHTML = block.data.text || "";
        element.classList.add("italic", "border-l-4", "pl-4", "my-4");
        break;

      case "code":
        element = document.createElement("pre");
        element.textContent = block.data.code || "";
        element.classList.add(
          "bg-gray-200",
          "p-2",
          "rounded",
          "my-2",
          "overflow-auto"
        );
        break;

      case "delimiter":
        element = document.createElement("hr");
        element.classList.add("my-4", "border-t-2");
        break;

      case "image":
        element = document.createElement("div");
        element.classList.add("text-center", "my-4");
        const img = document.createElement("img");
        img.src = block.data.file?.url || "";
        img.alt = block.data.caption || "Image";
        img.classList.add("max-w-full", "h-auto", "mx-auto");
        element.appendChild(img);
        break;

      case "table":
        element = document.createElement("table");
        element.classList.add("table-auto", "my-4", "w-full");
        block.data.content?.forEach((row) => {
          const tr = document.createElement("tr");
          row.forEach((cell) => {
            const td = document.createElement("td");
            td.innerHTML = cell;
            td.classList.add("border", "px-4", "py-2");
            tr.appendChild(td);
          });
          element!.appendChild(tr);
        });
        break;

      default:
        console.warn("Unknown block type:", block.type);
        break;
    }

    if (element) {
      container.appendChild(element);
    }
  });
}
