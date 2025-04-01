import { getImage, getLink } from "@/utils/editor";
import { Editor } from "@tiptap/core";
import {
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Link,
  List,
  ListOrdered,
  ListTodo,
  LucideIcon,
  Minus,
  Quote,
  WrapText,
} from "lucide-react";

export type DefaultEditorWidgestProps = {
  editor: Editor;
};

export type ButtonsMenuProps = {
  title: string;
  icon: LucideIcon;
  onClick: (editor: Editor) => void;
};

export const FloatingMenuData: ButtonsMenuProps[] = [
  {
    title: "Heading 1",
    icon: Heading1,
    onClick: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    title: "Heading 2",
    icon: Heading2,
    onClick: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    title: "Heading 3",
    icon: Heading3,
    onClick: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    title: "Heading 4",
    icon: Heading3,
    onClick: (editor) =>
      editor.chain().focus().toggleHeading({ level: 4 }).run(),
  },
  {
    title: "Divider",
    icon: Minus,
    onClick: (editor) => editor.chain().focus().setHorizontalRule().run(),
  },
  {
    title: "Bullet list",
    icon: List,
    onClick: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    title: "Numbered List",
    icon: ListOrdered,
    onClick: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    title: "Task List",
    icon: ListTodo,
    onClick: (editor) => editor.chain().focus().toggleTaskList().run(),
  },
  {
    title: "Quote",
    icon: Quote,
    onClick: (editor) => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    title: "Code Block",
    icon: Code2,
    onClick: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
  {
    title: "Hard Break",
    icon: WrapText,
    onClick: (editor) => editor.chain().focus().setHardBreak().run(),
  },
  {
    title: "Image",
    icon: Image,
    onClick: (editor) => getImage({ editor }),
  },
  {
    title: "Link",
    icon: Link,
    onClick: (editor) => getLink({ editor }),
  },
];

export const HeaderToolsData: Omit<ButtonsMenuProps, "icon">[] = [
  {
    title: "Inter",
    onClick: (editor) => editor.chain().focus().setFontFamily("Inter").run(),
  },
  {
    title: "Poppins",
    onClick: (editor) => editor.chain().focus().setFontFamily("Poppins").run(),
  },
  {
    title: "JetBrains Mono",
    onClick: (editor) =>
      editor.commands.setFontFamily("JetBrains Mono"),
  },
  {
    title: "Merriweather",
    onClick: (editor) =>
      editor.chain().focus().setFontFamily("Merriweather").run(),
  },
  {
    title: "Montserrat",
    onClick: (editor) =>
      editor.chain().focus().setFontFamily("Montserrat").run(),
  },
  {
    title: "Roboto",
    onClick: (editor) => editor.chain().focus().setFontFamily("Roboto").run(),
  },
  {
    title: "Fira Sans",
    onClick: (editor) =>
      editor.chain().focus().setFontFamily("Fira Sans").run(),
  },
];
