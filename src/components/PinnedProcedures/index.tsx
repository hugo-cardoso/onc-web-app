import { ListProcedures, TabsProcedures } from '@tunadao1/onc-components';
import { useContext, useState } from 'react';
import { SearchContext } from '../../contexts/searchContext';
import { groupProceduresByIcao } from '../../utils/groupProceduresByIcao';
import * as Styles from './styles';

import { ProcedureOptions } from '../../types';
import { useRouter } from 'next/router';

export const PinnedProcedures = () => {
  const router = useRouter();

  const searchContext = useContext(SearchContext);
  const [procedureType, setProcedureType] = useState<ProcedureOptions>('STAR');
  
  const filteredProcedures = () => {
    return groupProceduresByIcao(searchContext.pinnedProcedures.map((procedure) => ({
      ...procedure,
      type: procedure.type === 'ADC' || procedure.type === 'PDC' ? 'TAXI' : procedure.type,
    })).filter((procedure) => procedure.type === procedureType))
      .map(procedure => ({
        ...procedure,
        pinned: true,
        selected: searchContext.activeProcedure?.id === procedure.id,
        group: procedure.icao,
      }));
  };

  const handleClickProcedure = (id: string) => {
    const procedure = searchContext.pinnedProcedures.find((procedure) => procedure.id === id);
    if (!procedure) return; 
    searchContext.setActiveProcedure(procedure);

    router.push({
      pathname: '/app/search',
      query: {
        ...router.query,
        icao: procedure.icao,
        procedureType: procedure.type,
        procedure: procedure.id,
      }
    }, undefined, { shallow: true });
  };

  const handleClickProcedurePin = (id: string) => {
    const procedure = searchContext.pinnedProcedures.find((procedure) => procedure.id === id);
    if (!procedure) return; 
    searchContext.removePinnedProcedure(procedure);
  };

  return (
    <Styles.Aside>
      <Styles.Tabs>
        <TabsProcedures
          initialTab={procedureType as any}
          onTabChange={(type: ProcedureOptions) => setProcedureType(type)}
        />
      </Styles.Tabs>
      <ListProcedures
        message={`No pinned procedures for ${procedureType}`}
        procedures={filteredProcedures() as any}
        status={!filteredProcedures().length ? 'message' : 'default'}
        onClickProcedurePin={handleClickProcedurePin}
        onClickProcedure={handleClickProcedure}
      />
    </Styles.Aside>
  )
};