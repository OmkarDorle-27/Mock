
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCw, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface PdfProps {
  currentQuestion: number;
  onQuestionNavigate: (questionNumber: number) => void;
}

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function PdfComponent({ currentQuestion, onQuestionNavigate }: PdfProps) {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadPdfJs();
  }, []);

  const loadPdfJs = async () => {
    try {
      // Load PDF.js if not already loaded
      if (!window.pdfjsLib) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        document.head.appendChild(script);
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
        
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }

      // Get PDF from localStorage
      const storedPdfUrl = localStorage.getItem('mockTestPDF');
      if (storedPdfUrl) {
        await loadPdf(storedPdfUrl);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading PDF.js or PDF file:', error);
      setLoading(false);
    }
  };

  const loadPdf = async (url: string) => {
    try {
      const pdf = await window.pdfjsLib.getDocument(url).promise;
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      setCurrentPage(1);
      await renderPage(pdf, 1);
      setLoading(false);
    } catch (error) {
      console.error('Error loading PDF:', error);
      setLoading(false);
    }
  };

  const renderPage = async (pdf: any, pageNum: number) => {
    try {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale, rotation });
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  };

  // Re-render when scale or rotation changes
  useEffect(() => {
    if (pdfDoc) {
      renderPage(pdfDoc, currentPage);
    }
  }, [scale, rotation, pdfDoc, currentPage]);

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const rotate = () => setRotation(prev => (prev + 90) % 360);
  
  const nextPage = () => {
    if (pdfDoc && currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      renderPage(pdfDoc, newPage);
    }
  };
  
  const prevPage = () => {
    if (pdfDoc && currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      renderPage(pdfDoc, newPage);
    }
  };

  const downloadPdf = () => {
    const storedPdfUrl = localStorage.getItem('mockTestPDF');
    if (storedPdfUrl) {
      const link = document.createElement('a');
      link.href = storedPdfUrl;
      link.download = 'question-paper.pdf';
      link.click();
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Question Paper PDF...</p>
        </div>
      </div>
    );
  }

  if (!pdfDoc) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No Question Paper Loaded</p>
          <p className="text-sm text-gray-500">Please upload a PDF file to view questions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* PDF Controls */}
      <div className="flex justify-between items-center p-3 border-b bg-gray-50 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={zoomOut} disabled={scale <= 0.5}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button variant="outline" size="sm" onClick={zoomIn} disabled={scale >= 3}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={rotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <span className="text-sm text-gray-600 min-w-20 text-center">
            Page {currentPage} / {totalPages}
          </span>
          <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={downloadPdf}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      {/* PDF Canvas Container */}
      <div 
        ref={containerRef}
        className="flex-1 bg-gray-100 p-4 overflow-auto flex justify-center items-start"
      >
        <canvas
          ref={canvasRef}
          className="shadow-lg border border-gray-300 bg-white max-w-full h-auto"
        />
      </div>

      {/* Page Navigation Footer */}
      <div className="p-2 border-t bg-gray-50 flex-shrink-0">
        <div className="flex justify-center items-center space-x-4">
          <span className="text-xs text-gray-600">
            Current Question: Q{currentQuestion}
          </span>
          <span className="text-xs text-gray-500">
            Use controls above to navigate pages
          </span>
        </div>
      </div>
    </div>
  );
}
