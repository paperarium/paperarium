/*
 * PDFDisplay.tsx
 * author: evan kirkiles
 * created on Sun Aug 28 2022
 * 2022 the nobot space,
 */
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { SerializedFile } from "../../pages/upload/design";
import s from './PDFDisplay.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type PDFDisplayProps = {
  pdf: SerializedFile;
  defaultWidth: number;
};

const PDFDisplay: React.FC<PDFDisplayProps> = function PDFDisplay({ pdf, defaultWidth}) {
  const docRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [width, setWidth] = useState<number>(defaultWidth);

  useEffect(() => {
    const onResize = () => {
      if (!docRef.current) return;
      const { width, height } = docRef.current.getBoundingClientRect();
      console.log(width, height);
    }
    onResize();
    window.addEventListener('resize', onResize, false);
    return () => window.removeEventListener('resize', onResize, false);
  })

  return (
    <Document
      onLoadSuccess={({ numPages }) => {
        setNumPages(numPages);
      }}
      inputRef={docRef}
      file={pdf.objectURL}
      className={s.preview_pdf}
    >
      {numPages !== null
        ? Array.from({ length: numPages }, (x, i) => (
            <Page
              key={i}
              pageIndex={i}
              className={s.preview_pdf_page}
              width={width}
            />
          ))
        : null}
    </Document>
  );
};

export default PDFDisplay;
