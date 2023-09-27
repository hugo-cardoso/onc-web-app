import { useContext, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs, PDFPageProxy,  } from 'react-pdf';
import CanvasDraw from "react-canvas-draw";
import { Button, Spinner, Text } from '@tunadao1/onc-components';
import { ButtonIcon } from '../ButtonIcon';

import * as Styles from './styles';

import type { ProcedureViewerProps, PageOrientation, PageRotation, PageRotationOrientation, ViewerStatus, DrawColor } from './types';
import { SearchContext } from '../../contexts/searchContext';
import { ProcedureViewerContext } from '../../contexts/procedureViewerContext';
import { useRouter } from 'next/router';
import { ModalAirportInfo } from '../ModalAirportInfo';
import { Donate } from '../Donate';
import { AdsenseSkeleton } from "../Adsense/Skeleton"

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
  drawColor: 'blue' as DrawColor,
};

export const ProcedureViewer = (props: ProcedureViewerProps) => {
  const router = useRouter();
  const searchContext = useContext(SearchContext);
  const procedureViewerContext = useContext(ProcedureViewerContext);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef: React.MutableRefObject<CanvasDraw | null> = useRef(null);
  const [status, setStatus] = useState<ViewerStatus>(defaultControls.status);
  const [pageNumber, setPageNumber] = useState(defaultControls.pageNumber);
  const [numberOfPages, setNumberOfPages] = useState(defaultControls.numberOfPages);
  const [zoom, setZoom] = useState<number>(defaultControls.zoom);
  const [pageRotation, setPageRotation] = useState<PageRotation>(defaultControls.rotation);
  const [pageOrientation, setPageOrientation] = useState<PageOrientation>(defaultControls.orientation);
  const [activeDraw, setActiveDraw] = useState<boolean>(false);
  const [drawColor, setDrawColor] = useState<DrawColor>('blue');

  const resetControls = () => {
    setStatus(defaultControls.status);
    setZoom(defaultControls.zoom);
    setPageNumber(defaultControls.pageNumber);
    setNumberOfPages(defaultControls.numberOfPages);
    setPageRotation(defaultControls.rotation);
    setActiveDraw(false);
    procedureViewerContext.setPageDimensions({ width: 200, height: 200 });
    procedureViewerContext.setPagePosition({ x: 0, y: 0 });
    setDrawColor('blue');
  };

  const handleDocumentLoadSuccess = (pdf: any) => {
    setNumberOfPages(pdf.numPages);
    setStatus('default');
  };

  const handlePageLoadSuccess = (page: PDFPageProxy) => {
    setPageOrientation(page.width > page.height ? 'landscape' : 'portrait');
    procedureViewerContext.setPageDimensions({ width: page.width, height: page.height });
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
    // canvasRef.current?.clear();
  };

  const handleClickTryAgain = () => {
    resetControls();
    setStatus('default');
  };

  const handleClickZoom = (zoom: number) => {
    setZoom(zoom);
  };

  const handleClickCloseProcedure = () => {
    searchContext.setActiveProcedure(null);
    router.push({
      pathname: '/app/search',
      query: {
        icao: router.query.icao,
        procedureType: router.query.procedureType,
      }
    }, undefined, { shallow: true });
  }

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

  useEffect(() => {
    window.addEventListener('resize', procedureViewerContext.updatePageStyle);

    return () => {
      window.removeEventListener('resize', () => procedureViewerContext.updatePageStyle);
    }
  }, []);

  useEffect(() => {
    console.log("render")
  }, []);

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
    <Styles.Layout isFull={!procedureViewerContext.toolbarIsOpen}>
      <Styles.Wrapper ref={wrapperRef}>
        <Document
          file={`https://d3k987dq9enre4.cloudfront.net/${props.procedure.icao}/${props.procedure.id}.pdf`}
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
            canvasRef={(page) => {
              if (!page) return;
              procedureViewerContext.setPageRef(page);
            }}
            onRenderSuccess={procedureViewerContext.updatePageStyle}
          >
            {
              activeDraw && (
                <CanvasDraw
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    position: 'absolute',
                    left: procedureViewerContext.pagePosition.x,
                    top: procedureViewerContext.pagePosition.y,
                    zIndex: 10,
                  }}
                  catenaryColor='rgba(0, 0, 0, 0)'
                  hideGrid={true}
                  brushRadius={3}
                  brushColor={drawColor}
                  canvasWidth={procedureViewerContext.pageDimensions.width}
                  canvasHeight={procedureViewerContext.pageDimensions.height}
                  lazyRadius={0}
                  ref={canvas => canvasRef.current = canvas}
                />
              )
            }
          </Page>
        </Document>
        <ModalAirportInfo />
        <Styles.BtnToggleToolbar>
          <ButtonIcon
            icon={procedureViewerContext.toolbarIsOpen ?  'menu-unfold-line' : 'menu-fold-line'}
            onClick={() => {
              procedureViewerContext.setToolbarIsOpen(!procedureViewerContext.toolbarIsOpen);
              setTimeout(() => {
                procedureViewerContext.updatePageStyle();
              }, 300);
            }}
          />
        </Styles.BtnToggleToolbar>
      </Styles.Wrapper>
      {
        procedureViewerContext.toolbarIsOpen && (
          <Styles.Toolbar>
            <Styles.ToolbarItem>
              <ButtonIcon
                icon='pencil-line'
                onClick={() => setActiveDraw(!activeDraw)}
                active={activeDraw}
              />
              <ButtonIcon
                icon='close-line'
                onClick={handleClickCloseProcedure}
              />
            </Styles.ToolbarItem>
            {
              !activeDraw ? (
                <>
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
                </>
              ) : (
                <>
                  <Styles.ToolbarItem>
                    <ButtonIcon
                      icon='arrow-go-back-line'
                      onClick={() => canvasRef.current?.undo()}
                    />
                    <ButtonIcon
                      icon='refresh-line'
                      onClick={() => canvasRef.current?.clear()}
                    />
                  </Styles.ToolbarItem>
                  <Styles.ToolbarItem>
                    <Styles.ToolbarItemColor
                      color="blue"
                      onClick={() => setDrawColor('blue')}
                      active={drawColor === 'blue'}
                    />
                    <Styles.ToolbarItemColor
                      color="red"
                      onClick={() => setDrawColor('red')}
                      active={drawColor === 'red'}
                    />
                  </Styles.ToolbarItem>
                  <Styles.ToolbarItem>
                    <Styles.ToolbarItemColor
                      color="green"
                      onClick={() => setDrawColor('green')}
                      active={drawColor === 'green'}
                    />
                    <Styles.ToolbarItemColor
                      color="yellow"
                      onClick={() => setDrawColor('yellow')}
                      active={drawColor === 'yellow'}
                    />
                  </Styles.ToolbarItem>
                </>
              )
            }
            {/* Desabilitado para experimentar os Banners do Ali Express */}
            {/* <Styles.AdPlaceholder>
              <Text
                text='Enjoying? Buy me a coffee! ☕'
                size='medium'
                color='highlight'
              />
              <Donate type='aside'/>
            </Styles.AdPlaceholder> */}
            <AdsenseSkeleton />
          </Styles.Toolbar>
        )
      }
    </Styles.Layout>
  )
}