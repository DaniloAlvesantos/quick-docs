import { Editor } from "@tiptap/react";
import { create } from "zustand";

interface EditorStoreProps {
  editor: Editor | null;
  setEditor: (editor: Editor) => void;
}

export const useEditorStore = create<EditorStoreProps>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));
