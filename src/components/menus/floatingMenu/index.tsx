import { FloatingButton } from "@/components/buttons/floatingButton";
import {
  DefaultEditorWidgestProps,
  FloatingMenuData,
} from "@/types/defaultEditorWidgestProps";
import { FloatingMenu } from "@tiptap/react";

export const FloatingMenuComp = (props: DefaultEditorWidgestProps) => {
  return (
    <FloatingMenu
      editor={props.editor}
      className="bg-off-white rounded-lg flex-col py-2 px-1 max-h-56 overflow-y overflow-x-hidden scrollbar-none no-scrollbar"
      shouldShow={({ state }) => {
        const { $from } = state.selection;
        const currentLine = $from.nodeBefore?.textContent;
        return currentLine?.trim() === "/";
      }}
    >
      {FloatingMenuData.map((button) => (
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
