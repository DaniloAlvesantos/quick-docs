import { BubbleButton } from "@/components/buttons/bubbleButton";
import { getLink } from "@/utils/editor";
import { BubbleMenu, Editor, isNodeSelection } from "@tiptap/react";
import { Bold, Italic, Link, Strikethrough, Underline } from "lucide-react";
import { ReactNode } from "react";

interface BubbleMenuCompProps {
  editor: Editor;
}

interface ButtonDefinition {
  name: string;
  icon: ReactNode;
}

const textButtonDefs: ButtonDefinition[] = [
  { name: "bold", icon: <Bold className="size-4" /> },
  { name: "italic", icon: <Italic className="size-4" /> },
  { name: "underline", icon: <Underline className="size-4" /> },
  { name: "strike", icon: <Strikethrough className="size-4" /> },
  { name: "link", icon: <Link className="size-4" /> },
];

const imageButtonDefs: ButtonDefinition[] = [
  { name: "link", icon: <Link className="size-4" /> },
];

export const BubbleMenuComp = ({ editor }: BubbleMenuCompProps) => {
  const getClickHandler = (name: string): (() => void) => {
    switch (name) {
      case "bold":
        return () => editor.chain().focus().toggleBold().run();
      case "italic":
        return () => editor.chain().focus().toggleItalic().run();
      case "underline":
        return () => editor.chain().focus().toggleUnderline().run();
      case "strike":
        return () => editor.chain().focus().toggleStrike().run();
      case "link":
        return () => getLink({ editor });
      default:
        return () => {};
    }
  };

  const isImageSelected =
    isNodeSelection(editor.view.state.selection) &&
    editor.view.state.selection.node.type.name === "image";
  const currentButtonDefs = isImageSelected ? imageButtonDefs : textButtonDefs;

  return (
    <BubbleMenu
      editor={editor}
      className="flex gap-1 bg-zinc-800 p-1 rounded-md shadow-xl border border-zinc-700"
      tippyOptions={{ duration: 100 }}
      shouldShow={({ state }) => {
        const { selection } = state;
        const { empty } = selection;

        if (empty) {
          return false;
        }

        return true;
      }}
    >
      {currentButtonDefs.map((buttonDef) => (
        <BubbleButton
          key={buttonDef.name}
          onClick={getClickHandler(buttonDef.name)}
          data-active={editor.isActive(buttonDef.name)}
        >
          {buttonDef.icon}
        </BubbleButton>
      ))}
    </BubbleMenu>
  );
};
