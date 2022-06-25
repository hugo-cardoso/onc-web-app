import { Procedure } from "../../types";

export type DrawColor = 'blue' | 'red' | 'green' | 'yellow';

export type PageOrientation = 'portrait' | 'landscape';

export type PageRotation = 0 | 90 | 180 | 270;

export type PageRotationOrientation = 'left' | 'right';

export type ViewerStatus = 'default' | 'loading' | 'error';

export type ProcedureViewerProps = {
  procedure: Procedure;
};
