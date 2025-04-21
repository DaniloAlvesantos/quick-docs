import { useEditorStore } from "@/store/editorStore";
import ReactDOM from "react-dom";

interface CreateImageModalProps {
  show: boolean;
  onClose: () => void;
}

export const CreateImageModal = ({ onClose, show }: CreateImageModalProps) => {
  const { editor } = useEditorStore();
  if (!show || !editor) return null;

  const getLink = () => {
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

  return ReactDOM.createPortal(
    <div className="fixed inset-0">
      <div>
        <h4>Enter URL</h4>
        <input type="text" />
        <button onClick={getLink}>Insert</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>,
    document.body as HTMLElement
  );
};
