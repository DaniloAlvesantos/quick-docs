import { LucideIcon } from "lucide-react";
import { Editor } from "@tiptap/react";

interface FloatingButtonProps {
  icon: LucideIcon;
  text: string;
  onClick: (editor: Editor) => void;
  editor: Editor;
}

export const FloatingButton = (props: FloatingButtonProps) => {
  const { icon: Icon } = props;
  return (
    <button
      className="flex items-center gap-2 p-1 rounded min-w-[200px] hover:bg-accent"
      onClick={() => props.onClick(props.editor)}
    >
      <Icon className="size-5" />
      <p className="font-jetBrains">{props.text}</p>
    </button>
  );
};
