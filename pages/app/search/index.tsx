import { useContext } from 'react';
import Head from 'next/head'
import { Text } from '@tunadao1/onc-components'
import * as Styles from '../../../src/styles/AppPage.styles';
import * as GlobalStyles from '../../../src/styles/Global.styles';
import { SearchContext } from '../../../src/contexts/searchContext';
import { SearchProcedures } from '../../../src/components/SearchProcedures';

import type { NextPage } from 'next'
import { PinnedProcedures } from '../../../src/components/PinnedProcedures';
import { ProcedureViewer } from '../../../src/components/ProcedureViewer';

const AppPage: NextPage = () => {
  const searchContext = useContext(SearchContext);

  return (
    <>
      <Head>
        <title>Open Nav Charts - Search</title>
      </Head>

      <Styles.Wrapper>
        <Styles.Sidebar>
          {
            searchContext.view === 'search' && <SearchProcedures />
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

export default AppPage
