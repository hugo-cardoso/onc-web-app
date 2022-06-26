import React, { createContext, useState, RefObject, createRef, LegacyRef, useRef } from "react";
import { Page } from 'react-pdf';

type PageDimensions = {
  width: number;
  height: number;
};

type PagePosition = {
  x: number;
  y: number;
};

interface ProcedureViewerContextType {
  pageRef: RefObject<HTMLCanvasElement | null>;
  setPageRef: (page: HTMLCanvasElement) => void,
  pageDimensions: PageDimensions;
  pagePosition: PagePosition;
  setPageDimensions: (pageDimensions: PageDimensions) => void;
  setPagePosition: (pagePosition: PagePosition) => void;
  updatePageStyle: () => void;
  toolbarIsOpen: boolean;
  setToolbarIsOpen: (toolbarIsOpen: boolean) => void;
};

export const ProcedureViewerContext = createContext<ProcedureViewerContextType>({
  pageRef: createRef<HTMLCanvasElement | null>(),
  setPageRef: () => {},
  pageDimensions: {
    width: 200,
    height: 200,
  },
  pagePosition: {
    x: 0,
    y: 0,
  },
  setPageDimensions: () => {},
  setPagePosition: () => {},
  updatePageStyle: () => {},
  toolbarIsOpen: false,
  setToolbarIsOpen: () => {},
});

type ProcedureViewerContextProviderProps = {
  children: React.ReactNode;
};

export const ProcedureViewerProvider = (props: ProcedureViewerContextProviderProps) => {
  let pageRef = useRef<HTMLCanvasElement | null>(null);
  const [pageDimensions, setPageDimensions] = useState<PageDimensions>({
    width: 200,
    height: 200,
  });
  const [pagePosition, setPagePosition] = useState<PagePosition>({
    x: 0,
    y: 0,
  });
  const [toolbarIsOpen, setToolbarIsOpen] = useState<boolean>(true);

  const setPageRef = (page: HTMLCanvasElement) => {
    pageRef.current = page;
  }

  const updatePageStyle = () => {

   if (!pageRef.current) return;

    const pageStyle = getComputedStyle(pageRef.current);

    setPageDimensions({
      width: Number(pageStyle.width.replace('px', '')),
      height: Number(pageStyle.height.replace('px', '')),
    });

    setPagePosition({
      x: pageRef.current.offsetLeft,
      y: pageRef.current.offsetTop,
    });
  }

  return (
    <ProcedureViewerContext.Provider
      value={{
        pageRef,
        setPageRef,
        pageDimensions,
        pagePosition,
        setPageDimensions,
        setPagePosition,
        updatePageStyle,
        toolbarIsOpen,
        setToolbarIsOpen,
      }}
    >
      {props.children}
    </ProcedureViewerContext.Provider>
  );
};