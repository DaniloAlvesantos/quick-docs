import { useRef, useEffect } from "react";
import { HeaderToolsButton } from "@/components/buttons/headerToolsButton";
import { HeaderToolsData } from "@/types/defaultEditorWidgestProps";

export const HeaderTools = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute left-0 bg-gradient-to-r from-[#222831] to-transparent top-0 h-12 w-14 lg:hidden" />
      <div className="pointer-events-none absolute right-0 bg-gradient-to-l from-[#222831] to-transparent top-0 h-12 w-14 lg:hidden" />
      <header
        ref={scrollRef}
        className="w-full overflow-x-auto no-scrollbar flex items-center lg:justify-center gap-4 px-4 touch-pan-x"
      >
        {HeaderToolsData.map((button) => (
          <HeaderToolsButton
            text={button.title}
            key={crypto.randomUUID()}
            onClick={button.onClick}
          />
        ))}
      </header>
    </div>
  );
};
