import { useContext, useEffect } from 'react';
import Head from 'next/head'
import { Text } from '@tunadao1/onc-components'
import * as Styles from '../../../src/styles/AppPage.styles';
import * as GlobalStyles from '../../../src/styles/Global.styles';
import { SearchContext } from '../../../src/contexts/searchContext';
import { SearchProcedures } from '../../../src/components/SearchProcedures';

import type { NextPage, NextPageContext } from 'next'
import { PinnedProcedures } from '../../../src/components/PinnedProcedures';
import { ProcedureViewer } from '../../../src/components/ProcedureViewer';
import { Icao, Procedure, ProcedureOptions } from '../../../src/types';
import { oncService } from '../../../src/services/oncService';

type AppPageProps = {
  icao?: Icao;
  procedureType?: ProcedureOptions;
  procedure?: Procedure;
};

const AppPage: NextPage<AppPageProps> = ({ icao, procedureType, procedure }) => {
  const searchContext = useContext(SearchContext);

  useEffect(() => {
    if (icao) searchContext.setIcao(icao);
    if (procedureType) searchContext.setProcedureType(procedureType);
    if (procedure) searchContext.setActiveProcedure(procedure);
  }, [])

  return (
    <>
      <Head>
        <title>Open Nav Charts - Search</title>
      </Head>

      <Styles.Wrapper>
        <Styles.Sidebar>
          {
            searchContext.view === 'search' && (
              <SearchProcedures
                icao={icao}
                procedureType={procedureType}
              />
            )
          }
          {
            searchContext.view === 'pinned' && <PinnedProcedures />
          }
        </Styles.Sidebar>
        <Styles.Content>
          {
            searchContext.activeProcedure ? (
              <ProcedureViewer
                procedure={searchContext.activeProcedure}
              />
            ) : (
              <GlobalStyles.TodoContainer>
                <Text
                  size='medium'
                  color='highlight'
                  text='Select a procedure to view'
                />
              </GlobalStyles.TodoContainer>
            )
          }
        </Styles.Content>
      </Styles.Wrapper>
    </>
  )
}

AppPage.getInitialProps = async (context: NextPageContext): Promise<AppPageProps> => {

  const icao = context.query?.icao as Icao;
  const procedureType = context.query?.procedureType as ProcedureOptions;
  const procedure = context.query?.procedure as string;

  const pageProps: AppPageProps = {};

  if (icao) pageProps.icao = icao;
  if (procedureType) pageProps.procedureType = procedureType;
  if (procedure) {
    const procedures = await oncService.getProcedures(icao, procedureType);
    const procedureFind = procedures.data.find((procedureItem: Procedure) => procedureItem.id === procedure);

    if (procedureFind) {
      pageProps.procedure = procedureFind;
    };
  }

  console.log(pageProps);

  return pageProps;
}

export default AppPage
