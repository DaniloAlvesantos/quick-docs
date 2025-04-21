import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { Document } from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Placeholder } from "@tiptap/extension-placeholder";

import { proseStyling } from "../../utils/editor";
import "./placeholder.css";
import { FloatingMenuComp } from "../menus/floatingMenu";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { useEditorStore } from "@/store/editorStore";
import { HeaderTools } from "../header/headerTools";
import { BubbleMenuComp } from "../menus/bubbleMenu";
import Underline from "@tiptap/extension-underline";
import { DownloadButton } from "../buttons/downloadButton";
import AdSenseHorizontal from "../ads/horizontal";

export function Editor() {
  const { setEditor } = useEditorStore();

  const tiptap = useEditor({
    extensions: [
      StarterKit.configure({
        document: false,
        heading: {
          levels: [1, 2, 3, 4],
        },
        horizontalRule: {
          HTMLAttributes: {
            class: "marginY",
          },
        },
      }),
      Document.extend({
        content: "heading block* paragraph*",
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Untitled";
          }
          return "Type '/' to see commands...";
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "min-h-4",
        },
      }),
      Link.configure({
        validate: (href) => /^https?:\/\//.test(href),
      }).extend({
        inclusive: false,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded object-cover aspect-video marginY",
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      FontFamily,
      TextStyle,
      Underline,
    ],
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    // onUpdate: ({ editor }) => {
    //   console.log(editor.getJSON());
    // },
    content: "",
  });

  useEffect(() => {
    if (tiptap && !useEditorStore.getState().editor) {
      setEditor(tiptap);
    }
  }, [tiptap, setEditor]);

  return (
    <main className="flex flex-col px-4 py-8 items-center justify-center w-full h-full gap-8">
      <HeaderTools />
      <EditorContent
        editor={tiptap}
        id="editor-content"
        className={`prose prose-sm sm:prose-base xl:prose-lg 2xl:prose-xl prose-invert ${proseStyling} w-full`}
      />
      {tiptap && (
        <>
          <FloatingMenuComp editor={tiptap} />
          <BubbleMenuComp editor={tiptap} />
        </>
      )}
      <DownloadButton />
      <div className="w-full flex justify-center items-center fixed bottom-0">
        <AdSenseHorizontal />
      </div>
    </main>
  );
}
