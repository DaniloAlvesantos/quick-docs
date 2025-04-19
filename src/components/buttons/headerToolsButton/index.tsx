import { useEditorStore } from "@/store/editorStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Editor } from "@tiptap/react";
import { useCallback } from "react";

interface HeaderToolsButtonProps {
  text: string;
  onClick: (editor: Editor) => void;
}

export const HeaderToolsButton = (props: HeaderToolsButtonProps) => {
  const { editor } = useEditorStore();

  const handleClick = useCallback(() => {
    if (!editor) return;
    props.onClick(editor);
  }, [editor, props]);

  const currentFont =
    props.text !== "Unset Font" ? props.text.trim() : "sans-serif";
  const activeFont = editor?.getAttributes("textStyle")?.fontFamily || "";

  const normalizeFont = (font: string) => font.replace(/['"]/g, "").trim();
  const isActive = normalizeFont(activeFont) === normalizeFont(currentFont);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={650}>
        <TooltipTrigger asChild>
          <button
            className="flex items-center justify-center p-2 px-8 rounded bg-off-white/15 text-pale cursor-pointer hover:bg-off-white/30 transition-colors duration-300 data-[active=true]:text-white"
            onDoubleClick={handleClick}
            data-active={isActive}
          >
            <p
              className="text-xs font-medium tracking-wider"
              style={{ fontFamily: currentFont }}
            >
              {props.text}
            </p>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Double click to apply it</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
