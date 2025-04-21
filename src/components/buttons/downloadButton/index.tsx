import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { useState } from "react";

export function DownloadButton() {
  const { editor } = useEditorStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (!editor) return;
    setIsExporting(true);

    const element = document.getElementById("editor-content");
    if (!element) {
      setIsExporting(false);
      return;
    }

    try {
      const clone = element.cloneNode(true) as HTMLElement;

      clone.style.width = "800px";
      clone.style.padding = "20px";
      clone.style.background = "#222831";
      clone.style.color = "#ffffff";
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.zIndex = "-1";

      // Force child elements to not override background
      clone.querySelectorAll("*").forEach((child) => {
        const el = child as HTMLElement;
        el.style.backgroundColor = "transparent";
        el.style.setProperty("background", "transparent", "important");
      });

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 4,
        useCORS: true,
        logging: false,
        backgroundColor: "#222831",
        allowTaint: true,
        onclone: (document, element) => {
          const editorContent = element.querySelector("#editor-content");
          if (editorContent) {
            document.fonts.ready.then(() => {
              console.log("Fonts loaded for PDF generation");
            });
          }
        },
      });

      document.body.removeChild(clone);

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      let position = 0;

      const heading = element.querySelector("h1")?.textContent || "Document";
      const filename = `${heading.substring(0, 30).trim()}.pdf`;

      while (position < imgHeight) {
        const contentHeight = Math.min(imgHeight - position, pageHeight);
        const canvas2 = document.createElement("canvas");
        const ctx = canvas2.getContext("2d");

        canvas2.width = canvas.width;
        canvas2.height = (pageHeight * canvas.width) / imgWidth;

        if (ctx) {
          // Fundo escuro completo para evitar branco em áreas vazias
          ctx.fillStyle = "#222831";
          ctx.fillRect(0, 0, canvas2.width, canvas2.height);

          ctx.drawImage(
            canvas,
            0,
            (position * canvas.width) / imgWidth,
            canvas.width,
            (contentHeight * canvas.width) / imgWidth,
            0,
            0,
            canvas2.width,
            (contentHeight * canvas.width) / imgWidth
          );
        }

        const imgData = canvas2.toDataURL("image/png");

        if (position > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          imgData,
          "JPEG",
          0,
          0,
          imgWidth,
          pageHeight,
          undefined,
          "FAST"
        );
        position += pageHeight;
      }

      pdf.setDocumentProperties({
        title: heading,
      });
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className="fixed right-4 bottom-4"
      disabled={isExporting}
    >
      <Download className={`size-4 ${isExporting ? "animate-pulse" : ""}`} />
      {isExporting ? "Exporting..." : "Export PDF"}
    </Button>
  );
}
