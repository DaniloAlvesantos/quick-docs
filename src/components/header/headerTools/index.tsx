import { HeaderToolsButton } from "@/components/buttons/headerToolsButton";
import { useEditorStore } from "@/store/editorStore";
import { HeaderToolsData } from "@/types/defaultEditorWidgestProps";

export const HeaderTools = () => {
  const { editor } = useEditorStore();

  if (!editor) {
    return null;
  }

  return (
    <header className="w-full overflow-x-scroll no-scrollbar flex items-center md:justify-center gap-4 px-4">
      {HeaderToolsData.map((button) => (
        <HeaderToolsButton
          text={button.title}
          key={crypto.randomUUID()}
          editor={editor}
          onClick={button.onClick}
        />
      ))}
    </header>
  );
};
