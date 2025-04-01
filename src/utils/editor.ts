import { Editor } from "@tiptap/core";

interface Props {
  editor: Editor;
}

export const getLink = ({ editor }: Props) => {
  const previousUrl = editor.getAttributes("link").href;
  const url = prompt("URL:", previousUrl);

  if (url === null) {
    return;
  }

  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  editor
    .chain()
    .focus()
    .extendMarkRange("link")
    .toggleLink({
      href: url,
      target: "_blank",
      class: "cursor-pointer text-blue-500",
    })
    .run();
};

export const getImage = ({ editor }: Props) => {
  const url = prompt("Image URL: ");

  if (!url) {
    return;
  }

  if (url === "") {
    return;
  }

  editor.chain().focus().setImage({ src: url }).run();
};

export const proseStyling =
  "prose-blockquote:border-white prose-hr:border-white prose-li:marker:text-white";
