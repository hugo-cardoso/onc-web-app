import { useContext, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs, PDFPageProxy,  } from 'react-pdf';
import CanvasDraw from "react-canvas-draw";
import { Button, Spinner, Text } from '@tunadao1/onc-components';
import { ButtonIcon } from '../ButtonIcon';

import * as Styles from './styles';

import type { ProcedureViewerProps, PageOrientation, PageRotation, PageRotationOrientation, ViewerStatus } from './types';
import { SearchContext } from '../../contexts/searchContext';

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
  const searchContext = useContext(SearchContext);

  const canvasPageRef = useRef<any>(null);
  const canvasRef: React.MutableRefObject<CanvasDraw | null> = useRef(null);
  const [status, setStatus] = useState<ViewerStatus>(defaultControls.status);
  const [pageNumber, setPageNumber] = useState(defaultControls.pageNumber);
  const [numberOfPages, setNumberOfPages] = useState(defaultControls.numberOfPages);
  const [zoom, setZoom] = useState<number>(defaultControls.zoom);
  const [pageRotation, setPageRotation] = useState<PageRotation>(defaultControls.rotation);
  const [pageOrientation, setPageOrientation] = useState<PageOrientation>(defaultControls.orientation);
  const [pageDimensions, setPageDimensions] = useState<{ width: number, height: number }>({ width: 200, height: 200 });
  const [pagePosition, setPagePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [activeDraw, setActiveDraw] = useState<boolean>(false);

  const resetControls = () => {
    setStatus(defaultControls.status);
    setZoom(defaultControls.zoom);
    setPageNumber(defaultControls.pageNumber);
    setNumberOfPages(defaultControls.numberOfPages);
    setPageRotation(defaultControls.rotation);
    setActiveDraw(false);
    setPageDimensions({ width: 200, height: 200 });
    setPagePosition({ x: 0, y: 0 });
  };

  const handleDocumentLoadSuccess = (pdf: any) => {
    setNumberOfPages(pdf.numPages);
    setStatus('default');
  };

  const handlePageLoadSuccess = (page: PDFPageProxy) => {
    setPageOrientation(page.width > page.height ? 'landscape' : 'portrait');
    setPageDimensions({ width: page.width, height: page.height });
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
      console.log(canvasPageRef.current);
      setPageRotation(angle);
      return;
    }

    if (orientation === 'left') {
      angle = pageRotation - 90 as PageRotation;
    } else {
      angle = pageRotation + 90 as PageRotation;
    }

    setPageRotation(angle);
    // canvasRef.current?.clear();
  };

  const handleClickTryAgain = () => {
    resetControls();
    setStatus('default');
  };

  const handleClickZoom = (zoom: number) => {
    setZoom(zoom);
  };

  const updatePageStyle = () => {
    const pageStyle = getComputedStyle(canvasPageRef.current);

    if (!pageStyle) return;

    console.log(canvasPageRef.current.offsetLeft);

    setPageDimensions({
      width: Number(pageStyle.width.replace('px', '')),
      height: Number(pageStyle.height.replace('px', '')),
    });

    setPagePosition({
      x: canvasPageRef.current.offsetLeft,
      y: canvasPageRef.current.offsetTop,
    });
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
            renderAnnotationLayer={false}
            renderTextLayer={false}
            canvasRef={canvasPageRef}
            onRenderSuccess={updatePageStyle}
          >
            {
              activeDraw && (
                <CanvasDraw
                  style={{
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    left: pagePosition.x,
                    top: pagePosition.y,
                    zIndex: 10,
                  }}
                  backgroundColor='rgba(0, 0, 0, 0)'
                  catenaryColor='rgba(0, 0, 0, 0)'
                  hideGrid={true}
                  brushRadius={3}
                  brushColor='blue'
                  canvasWidth={pageDimensions.width}
                  canvasHeight={pageDimensions.height}
                  ref={canvas => canvasRef.current = canvas}
                />
              )
            }
          </Page>
        </Document>
      </Styles.Wrapper>
      <Styles.Toolbar>
        <Styles.ToolbarItem>
          <ButtonIcon
            icon='pencil-line'
            onClick={() => setActiveDraw(!activeDraw)}
            active={activeDraw}
          />
          <ButtonIcon
            icon='close-line'
            onClick={() => searchContext.setActiveProcedure(null)}
          />
        </Styles.ToolbarItem>
        <Styles.ToolbarItem>
          <ButtonIcon
            icon='zoom-out-line'
            onClick={() => handleClickZoom(zoom - 1)}
            disabled={!zoom || activeDraw}
          />
          <ButtonIcon
            icon='zoom-in-line'
            onClick={() => handleClickZoom(zoom + 1)}
            disabled={(zoom === zoomLevels[pageOrientation].length - 1) || activeDraw}
          />
        </Styles.ToolbarItem>
        <Styles.ToolbarItem>
          <ButtonIcon
            icon='anticlockwise-2-line'
            onClick={() => handleClickRotate('left')}
            disabled={activeDraw}
          />
          <ButtonIcon
            icon='clockwise-2-line'
            onClick={() => handleClickRotate('right')}
            disabled={activeDraw}
          />
        </Styles.ToolbarItem>
        <Styles.ToolbarItem>
          <ButtonIcon
            icon='arrow-left-s-line'
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={(pageNumber === 1) || activeDraw}
          />
          <ButtonIcon
            icon='arrow-right-s-line'
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={(pageNumber === numberOfPages) || activeDraw}
          />
        </Styles.ToolbarItem>
        <Styles.AdPlaceholder>
          <Text
            text='Ad space'
            size='medium'
            color='highlight'
          />
        </Styles.AdPlaceholder>
      </Styles.Toolbar>
    </Styles.Layout>
  )
}