import { useEffect, useState } from 'react';
import { Document, Page, pdfjs, PDFPageProxy,  } from 'react-pdf';
import { Button, Spinner, Text } from '@tunadao1/onc-components';
import { ButtonIcon } from '../ButtonIcon';

import * as Styles from './styles';

import type { ProcedureViewerProps, PageOrientation, PageRotation, PageRotationOrientation, ViewerStatus } from './types';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const zoomLevels = {
  landscape: [
    1.35,
    1.5,
    1.75,
    1.85,
  ],
  portrait: [
    1,
    1.25,
    1.5,
    1.75,
  ],
} as {
  [key in PageOrientation]: number[];
};

const defaultControls = {
  status: 'default' as ViewerStatus,
  pageNumber: 1,
  numberOfPages: 1,
  zoom: 0,
  rotation: 0 as PageRotation,
  orientation: 'portrait' as PageOrientation,
};

export const ProcedureViewer = (props: ProcedureViewerProps) => {
  const [status, setStatus] = useState<ViewerStatus>(defaultControls.status);
  const [pageNumber, setPageNumber] = useState(defaultControls.pageNumber);
  const [numberOfPages, setNumberOfPages] = useState(defaultControls.numberOfPages);
  const [zoom, setZoom] = useState<number>(defaultControls.zoom);
  const [pageRotation, setPageRotation] = useState<PageRotation>(defaultControls.rotation);
  const [pageOrientation, setPageOrientation] = useState<PageOrientation>(defaultControls.orientation);

  const resetControls = () => {
    setStatus(defaultControls.status);
    setZoom(defaultControls.zoom);
    setPageNumber(defaultControls.pageNumber);
    setNumberOfPages(defaultControls.numberOfPages);
    setPageRotation(defaultControls.rotation);
  };

  const handleDocumentLoadSuccess = (pdf: any) => {
    setNumberOfPages(pdf.numPages);
    setStatus('default');
  };

  const handlePageLoadSuccess = (page: PDFPageProxy) => {
    setPageOrientation(page.width > page.height ? 'landscape' : 'portrait');
  };
  

  const handleClickRotate = (orientation: PageRotationOrientation) => {
    let angle: PageRotation = pageRotation;

    if (orientation === 'right' && angle === 270) {
      angle = 0;
      setPageRotation(angle);
      return;
    }

    if (orientation === 'left' && angle === 0) {
      angle = 270;
      setPageRotation(angle);
      return;
    }

    if (orientation === 'left') {
      angle = pageRotation - 90 as PageRotation;
    } else {
      angle = pageRotation + 90 as PageRotation;
    }

    setPageRotation(angle);
  };

  const handleClickTryAgain = () => {
    resetControls();
    setStatus('default');
  };

  useEffect(() => {
    if (
      pageRotation === 0 ||
      pageRotation === 180
    ) {
      setPageOrientation('portrait');
      return;
    }
    setPageOrientation('landscape');
  }, [pageRotation])

  useEffect(() => {
    resetControls();
  }, [props.procedure]);

  if (status === 'error') return (
    <Styles.Layout>
      <Styles.TextError>
        <Text
          text='Error loading PDF'
          size='medium'
          color='highlight'
        />
        <Button
          text='Try again'
          color='secondary'
          onClick={handleClickTryAgain}
        />
      </Styles.TextError>
    </Styles.Layout>
  )

  return (
    <Styles.Layout>
      <Styles.Wrapper>
        <Document
          file={`${ process.env.NEXT_PUBLIC_API_URL }/charts/id?id=${ props.procedure.id }`}
          renderMode='canvas'
          onLoadSuccess={handleDocumentLoadSuccess}
          onLoadError={() => setStatus('error')}
          loading={(
            <Styles.Spinner>
              <Spinner />
            </Styles.Spinner>
          )}
        >
          <Page
            rotate={pageRotation}
            pageNumber={pageNumber}
            width={900 * zoomLevels[pageOrientation][zoom]}
            onLoadSuccess={handlePageLoadSuccess}
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
          <ButtonIcon
            icon='zoom-in-line'
            onClick={() => setZoom(zoom + 1)}
            disabled={zoom === zoomLevels[pageOrientation].length - 1}
          />
        </Styles.ToolbarItem>
        <Styles.ToolbarItem>
          <ButtonIcon
            icon='anticlockwise-2-line'
            onClick={() => handleClickRotate('left')}
          />
          <ButtonIcon
            icon='clockwise-2-line'
            onClick={() => handleClickRotate('right')}
          />
        </Styles.ToolbarItem>
        <Styles.ToolbarItem>
          <ButtonIcon
            icon='arrow-left-s-line'
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber === 1}
          />
          <ButtonIcon
            icon='arrow-right-s-line'
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber === numberOfPages}
          />
        </Styles.ToolbarItem>
        <Styles.AdPlaceholder>
          <ins className="adsbygoogle"
            style={{display:'inline-block',width: '120px', height: '600px'}}
            data-ad-client="ca-pub-5349498948047909"
            data-ad-slot="1668831009"></ins>
          <script
            dangerouslySetInnerHTML={{
              __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
            }}
          />
        </Styles.AdPlaceholder>
      </Styles.Toolbar>
    </Styles.Layout>
  )
}