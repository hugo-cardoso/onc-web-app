import { Document, Page, pdfjs } from 'react-pdf';
import { Spinner } from '@tunadao1/onc-components';

import * as Styles from './styles';

import type { Procedure } from '../../types';
import { useEffect, useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type ProcedureViewerProps = {
  procedure: Procedure;
};

export const ProcedureViewer = (props: ProcedureViewerProps) => {
  const [status, setStatus] = useState<'default' | 'loading' | 'error'>('loading');

  useEffect(() => {
    setStatus('loading');
  }, [props.procedure]);

  return (
    <Styles.Wrapper>
      <Document
        file={`${ process.env.NEXT_PUBLIC_API_URL }/charts/id?id=${ props.procedure.id }`}
        renderMode='canvas'
        onLoadSuccess={() => setStatus('default')}
        loading={(
          <Styles.Spinner>
            <Spinner />
          </Styles.Spinner>
        )}
      >
        <Page pageNumber={1} rotate={0} width={900}/>
      </Document>
    </Styles.Wrapper>
  )
}