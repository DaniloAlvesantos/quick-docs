import { ReactNode, ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  children?: ReactNode;
}

export function BubbleButton(props: ButtonProps) {
  return (
    <button
      className="p-2 text-pale text-sm font-medium leading-none data-[active=true]:text-white bg-off-white/15 rounded-md transition-all duration-200"
      {...props}
    />
  );
}
