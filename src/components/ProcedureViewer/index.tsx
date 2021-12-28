import { Document, Page, pdfjs } from 'react-pdf';
import { Spinner } from '@tunadao1/onc-components';

import * as Styles from './styles';

import type { Procedure } from '../../types';
import { useEffect, useState } from 'react';
import { ButtonIcon } from '../ButtonIcon';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type ProcedureViewerProps = {
  procedure: Procedure;
};

const zoomLevels = [
  1,
  1.25,
  1.5,
  1.75,
];

export const ProcedureViewer = (props: ProcedureViewerProps) => {
  const [status, setStatus] = useState<'default' | 'loading' | 'error'>('loading');
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState<number>(0);

  const resetControls = () => {
    setStatus('loading');
    setZoom(0);
    setPageNumber(1);
    setNumberOfPages(1);
  };

  const handleLoadSuccess = (pdf: any) => {
    setNumberOfPages(pdf.numPages);
    setStatus('default');
  };

  useEffect(() => {
    resetControls();
  }, [props.procedure]);

  return (
    <Styles.Layout>
      <Styles.Wrapper>
        <Document
          file={`${ process.env.NEXT_PUBLIC_API_URL }/charts/id?id=${ props.procedure.id }`}
          renderMode='canvas'
          onLoadSuccess={handleLoadSuccess}
          loading={(
            <Styles.Spinner>
              <Spinner />
            </Styles.Spinner>
          )}
        >
          <Page
            rotate={0}
            pageNumber={pageNumber}
            width={900 * zoomLevels[zoom]}
          />
        </Document>
      </Styles.Wrapper>
      <Styles.Toolbar>
        <Styles.ToolbarItem>
          <ButtonIcon
            icon='zoom-out-line'
            onClick={() => setZoom(zoom - 1)}
            disabled={!zoom}
          />
        </Styles.ToolbarItem>
        <Styles.ToolbarItem>
          <ButtonIcon
            icon='zoom-in-line'
            onClick={() => setZoom(zoom + 1)}
            disabled={zoom === zoomLevels.length - 1}
          />
        </Styles.ToolbarItem>
        <Styles.ToolbarItem>
          <ButtonIcon
            icon='arrow-left-s-line'
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber === 1}
          />
        </Styles.ToolbarItem>
        <Styles.ToolbarItem>
          <ButtonIcon
            icon='arrow-right-s-line'
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber === numberOfPages}
          />
        </Styles.ToolbarItem>
      </Styles.Toolbar>
    </Styles.Layout>
  )
}