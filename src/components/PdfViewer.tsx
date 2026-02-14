import { Button } from "@/components/ui/button";
import { X, ExternalLink, Download } from "lucide-react";

interface PdfViewerProps {
  url: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PdfViewer = ({ url, open, onOpenChange }: PdfViewerProps) => {
  if (!open || !url) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/90">
      {/* Minimal toolbar — browser PDF viewer handles zoom/print/etc */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border shrink-0">
        <span className="text-sm font-semibold text-foreground">PDF Preview</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" asChild>
            <a href={url} download>
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" onClick={() => window.open(url, "_blank")}>
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Tab</span>
          </Button>
          <div className="w-px h-5 bg-border mx-1" />
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF rendered by browser's native viewer */}
      <div className="flex-1" onClick={(e) => { if (e.target === e.currentTarget) onOpenChange(false); }}>
        <iframe
          src={url}
          className="w-full h-full border-none"
          title="PDF Preview"
        />
      </div>
    </div>
  );
};

export default PdfViewer;
