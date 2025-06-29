
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ZoomIn, ZoomOut, RotateCw, Download, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface PdfViewerProps {
  currentQuestion: number;
  onQuestionNavigate: (questionNumber: number) => void;
}

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function PdfViewer({ currentQuestion, onQuestionNavigate }: PdfViewerProps) {
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevPage();
      } else if (event.key === 'ArrowRight') {
        nextPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

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

  const goToPage = (pageNum: number) => {
    if (pdfDoc && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      renderPage(pdfDoc, pageNum);
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
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (!pdfDoc) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No PDF loaded</p>
          <p className="text-sm text-gray-500">Please upload a PDF file to view questions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
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
          <span className="text-sm text-gray-600 ml-4">Q: {currentQuestion}</span>
          <Button variant="outline" size="sm" onClick={downloadPdf}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      {/* PDF Canvas Container */}
      <div 
        ref={containerRef}
        className="flex-1 bg-gray-100 p-4 overflow-auto flex justify-center items-start relative"
      >
        {/* Left Navigation Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage === 1}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Right Navigation Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <canvas
          ref={canvasRef}
          className="shadow-lg border border-gray-300 bg-white"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {/* Compact Navigation */}
      <div className="p-2 border-t bg-gray-50 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-600 mr-2">Pages:</span>
            {[1, 2, 3, 4, 5, Math.floor(totalPages/2), totalPages].filter((page, index, array) => 
              page <= totalPages && array.indexOf(page) === index
            ).map(pageNum => (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(pageNum)}
                className="w-8 h-6 text-xs"
              >
                {pageNum}
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-600 mr-2">Questions:</span>
            {[1, 5, 10, 15, 20, 25, 30].map(qNum => (
              <Button
                key={qNum}
                variant={currentQuestion === qNum ? "default" : "outline"}
                size="sm"
                onClick={() => onQuestionNavigate(qNum)}
                className="w-8 h-6 text-xs"
              >
                {qNum}
              </Button>
            ))}
          </div>
        </div>
        <div className="text-center mt-1">
          <span className="text-xs text-gray-500">Use ← → arrow keys or buttons to navigate pages</span>
        </div>
      </div>
    </div>
  );
}
