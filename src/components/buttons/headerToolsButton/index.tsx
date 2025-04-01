import { Editor } from "@tiptap/react";

interface HeaderToolsButtonProps {
  text: string;
  onClick: (editor: Editor) => void;
  editor: Editor;
}

export const HeaderToolsButton = (props: HeaderToolsButtonProps) => {
  return (
    <button
      className="flex items-center justify-center p-2 px-8 rounded bg-off-white/15 text-pale cursor-pointer"
      onClick={() => props.onClick(props.editor)}
    >
      <p className={`${formatToCamelCase(props.text)} text-xs font-medium`}>
        {props.text}
      </p>
    </button>
  );
};

const formatToCamelCase = (text: string) => {
  return (
    "font-" +
    text
      .trim()
      .toLowerCase()
      .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
  );
};
