import { useContext, useEffect } from 'react';
import Head from 'next/head'
import { Text } from '@tunadao1/onc-components'
import * as Styles from '../../../src/styles/AppPage.styles';
import * as GlobalStyles from '../../../src/styles/Global.styles';
import { SearchContext } from '../../../src/contexts/searchContext';
import { ProcedureViewerContext } from '../../../src/contexts/procedureViewerContext';
import { SearchProcedures } from '../../../src/components/SearchProcedures';

import type { NextPage, NextPageContext } from 'next'
import { PinnedProcedures } from '../../../src/components/PinnedProcedures';
import { ProcedureViewer } from '../../../src/components/ProcedureViewer';
import { Airport, Icao, Procedure, ProcedureOptions } from '../../../src/types';
import { oncService } from '../../../src/services/oncService';
import { useRouter } from 'next/router';
import { ModalAirportInfo } from '../../../src/components/ModalAirportInfo';
import { ButtonIcon } from '../../../src/components/ButtonIcon';

type AppPageProps = {
  procedureType?: ProcedureOptions;
  procedure?: Procedure;
  procedures?: Procedure[];
  airport?: Airport;
};

const AppPage: NextPage<AppPageProps> = ({ procedureType, procedure, airport }) => {
  const router = useRouter();
  const searchContext = useContext(SearchContext);
  const procedureViewerContext = useContext(ProcedureViewerContext);

  useEffect(() => {
    const query = {} as any;

    if (airport) {
      searchContext.setAirport(airport);
      searchContext.setIcao(airport.icao);
      query.icao = airport.icao;
    }

    if (procedureType) {
      searchContext.setProcedureType(procedureType);
      query.procedureType = procedureType;
    };

    if (procedure) {
      searchContext.setActiveProcedure(procedure);
      query.procedure = procedure.id;
    };

    if (!searchContext.icaoList.length) {
      oncService.getIcaoList().then(icaoList => {
        searchContext.setIcaoList(icaoList.data);
      });
    };

    router.push({
      pathname: '/app/search',
      query,
    }, undefined, { shallow: true });

  }, [])

  return (
    <>
      <Head>
        <title>Open Nav Charts - Search</title>
      </Head>

      <Styles.Wrapper isFull={!searchContext.sidebarIsOpen}>
        <Styles.Sidebar>
          {
            searchContext.view === 'search' && (
              <SearchProcedures
                icao={airport?.icao}
                procedureType={procedureType}
              />
            )
          }
          {
            searchContext.view === 'pinned' && <PinnedProcedures />
          }
        </Styles.Sidebar>
        <Styles.Content>
          <Styles.BtnToggleSidebar>
            <ButtonIcon
              icon={searchContext.sidebarIsOpen ? 'menu-fold-line' : 'menu-unfold-line'}
              onClick={() => {
                searchContext.setSidebarIsOpen(!searchContext.sidebarIsOpen);
                setTimeout(() => {
                  procedureViewerContext.updatePageStyle();
                }, 300);
              }}
            />
          </Styles.BtnToggleSidebar>
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
                <ModalAirportInfo />
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

  if (icao) {
    const airport = await oncService.getAirport(icao);
    const procedures = await oncService.getProcedures(icao, procedureType || 'STAR');

    if (airport.success) pageProps.airport = airport.data;

    if (procedure && procedureType) {
      const procedureFind = procedures.data.find((procedureItem: Procedure) => procedureItem.id === procedure);

      pageProps.procedureType = procedureType;
      if (procedureFind) pageProps.procedure = procedureFind;
    }
  };

  return pageProps;
}

export default AppPage
