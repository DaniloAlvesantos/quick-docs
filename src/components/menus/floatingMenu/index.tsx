import { FloatingButton } from "@/components/buttons/floatingButton";
import {
  DefaultEditorWidgestProps,
  FloatingMenuData,
} from "@/types/defaultEditorWidgestProps";
import { FloatingMenu } from "@tiptap/react";

export const FloatingMenuComp = (props: DefaultEditorWidgestProps) => {
  const currentLineContent =
    props.editor.state.selection.$from.nodeBefore?.textContent;
  const textContent = currentLineContent?.startsWith("/")
    ? currentLineContent.slice(1)
    : currentLineContent;
    
  return (
    <FloatingMenu
      editor={props.editor}
      className="bg-off-white rounded-lg flex-col py-2 px-1 max-h-56 overflow-y overflow-x-hidden scrollbar-none no-scrollbar"
      shouldShow={({ state }) => {
        const { $from } = state.selection;
        const currentLine = $from.nodeBefore?.textContent;

        if (!currentLine || currentLine.trim() === "") {
          return false;
        }

        return currentLine.startsWith("/") || currentLine.trim() === "/";
      }}
    >
      {FloatingMenuData.filter((val) =>
        val.title.toLowerCase().includes(textContent?.toLowerCase() || "")
      ).map((button) => (
        <FloatingButton
          icon={button.icon}
          text={button.title}
          onClick={button.onClick}
          editor={props.editor}
          key={button.title}
        />
      ))}
    </FloatingMenu>
  );
};
