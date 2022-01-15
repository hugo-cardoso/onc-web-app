import { useState, useContext, useEffect } from 'react';
import { SearchContext } from '../../contexts/searchContext';
import { oncService } from '../../services/oncService';
import { groupProcedureByRwy } from '../../utils/groupProcedureByRwy';

import {
  TabsProcedures,
  Text,
  ListProcedures,
  Button,
} from '@tunadao1/onc-components';

import { Input } from '../Input';

import * as Styles from './styles';

import type {
  ProcedureOptions,
  Icao,
  Procedure,
  ServiceResponse,
} from '../../types';
import { useRouter } from 'next/router';

type SearchProceduresProps = {
  icao?: Icao;
  procedureType?: ProcedureOptions;
};

export const SearchProcedures = (props: SearchProceduresProps) => {
  const router = useRouter();
  const searchContext = useContext(SearchContext);

  const [proceduresListStatus, setProceduresListStatus] = useState<'default' | 'loading' | 'empty' | 'error' | 'message'>('message');
  const [proceduresQuery, setProceduresQuery] = useState<string>('');
  const [searchSugestions, setSearchSugestions] = useState<Icao[]>([]);

  const updateProceduresList = async (icao: Icao, type: ProcedureOptions) => {
    const {
      airport,
      setProcedures,
      setAirport,
    } = searchContext;

    setProcedures([]);
    setProceduresListStatus('loading');

    const sameAirport = airport && airport?.icao === icao || false;

    const responseAirport = sameAirport ? {
      data: airport,
      success: true,
    } as ServiceResponse : await oncService.getAirport(icao);
    const responseProcedures = await oncService.getProcedures(icao, type);

    if (
      !responseAirport.success ||
      !responseProcedures.success
    ) {
      setProceduresListStatus('error');
      return;
    }

    setAirport(responseAirport.data);

    if (responseProcedures.data.length === 0) {
      setProceduresListStatus('empty');
      return;
    }

    const parsedProcedures = responseProcedures.data.map((procedure: Procedure) => ({
      ...procedure,
      pinned: false,
      selected: false,
      group: 'Default',
    } as Procedure));

    setProceduresListStatus('default');

    const headboardsCount = responseAirport.data.runways.flatMap((rwy: any) => rwy.headboards).length;
    setProcedures(type === 'IAC' && headboardsCount ? groupProcedureByRwy(responseAirport.data, parsedProcedures) : parsedProcedures);
  };

  const handleChangeProcedureType = (value: ProcedureOptions) => {
    searchContext.setProcedureType(value);
    if (!searchContext.icao.length) return;
    updateProceduresList(searchContext.icao, value);
    setProceduresQuery('');

    router.push({
      pathname: '/app/search',
      query: {
        icao: searchContext.icao,
        procedureType: value,
      },
    }, undefined, { shallow: true });
  };

  const handleChangeProcedureFilter = (value: string) => {
    setProceduresQuery(value);
  };

  const handleClickPinProcedure = (id: string) => {
    const {
      procedures,
      setProcedures,
      addPinnedProcedure,
      removePinnedProcedure,
    } = searchContext;

    const procedure = procedures.find(p => p.id === id);
    if (!procedure) return;

    if (procedure.pinned) {
      removePinnedProcedure(procedure);
      setProcedures(procedures.map(p => p.id === id ? { ...p, pinned: false } : p));
      return
    }

    addPinnedProcedure({
      id: procedure.id,
      name: procedure.name,
      icao: procedure.icao,
      type: procedure.type,
    });
    setProcedures(procedures.map(p => p.id === id ? { ...p, pinned: true } : p));
  }

  const handleClickProcedure = (id: string) => {
    const procedure = searchContext.procedures.find(p => p.id === id);
    if (!procedure) return;
    searchContext.setActiveProcedure({
      id: procedure.id,
      name: procedure.name,
      icao: procedure.icao,
      type: procedure.type,
    });

    router.push({
      pathname: '/app/search',
      query: {
        icao: procedure.icao,
        procedureType: ['ADC','PDC'].includes(procedure.type) ? 'TAXI' : procedure.type,
        procedure: id,
      }
    }, undefined, { shallow: true });
  }

  const handleSubmitSearchForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchContext.icao.length) return;

    router.push({
      pathname: '/app/search',
      query: {
        icao: searchContext.icao,
      },
    }, undefined, { shallow: true });

    updateProceduresList(searchContext.icao, searchContext.procedureType);
    searchContext.setAirportMetar('');
    setSearchSugestions([]);
  }

  const parseProceduresList = (procedures: Procedure[], pinnedProcedures: Procedure[]) => {
    return procedures
      .filter((procedure) => procedure.name.toLocaleLowerCase().includes(proceduresQuery.trim().toLocaleLowerCase()))
      .map((procedure: Procedure) => (
        {
        ...procedure,
        pinned: !!searchContext.pinnedProcedures.find(p => p.id === procedure.id),
        selected: procedure.id === searchContext.activeProcedure?.id,
      }));
  }

  const handleChangeIcaoInput = (value: string) => {
    searchContext.setIcao(value);
    
    if (value.length >= 2) {
      const autosugestions = searchContext.icaoList.filter(icao => icao.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()));
      setSearchSugestions(autosugestions);
    } else {
      setSearchSugestions([]);
    }
  };

  const handleClickAutosugestion = (icao: string) => {
    searchContext.setIcao(icao);
    setSearchSugestions([]);

    updateProceduresList(icao, searchContext.procedureType);

    router.push({
      pathname: '/app/search',
      query: {
        icao: searchContext.icao,
        procedureType: searchContext.procedureType,
      },
    }, undefined, { shallow: true });
  };

  useEffect(() => {
    if (searchContext.airport && searchContext.procedures.length) {
      setProceduresListStatus('default');
      return;
    };

    if (props.procedureType) {
      searchContext.setProcedureType(props.procedureType);
    }

    if (props.icao) {
      searchContext.setIcao(props.icao);
      updateProceduresList(props.icao, props.procedureType || searchContext.procedureType);
    }
  }, []);

  return (
    <Styles.Aside>
      <Styles.SearchForm onSubmit={handleSubmitSearchForm}>
        <Input
          label="Search"
          placeholder="Search for airport ICAO"
          onChange={handleChangeIcaoInput}
          onBlur={() => setTimeout(() => setSearchSugestions([]), 300)}
          initialValue={searchContext.icao}
        />
        {
          searchSugestions.length > 0 && (
            <Styles.SearchAutoComplete>
              {
                searchSugestions.map((icao: string) => (
                  <Styles.SearchAutoCompleteItem
                    onClick={() => handleClickAutosugestion(icao)}
                    key={icao}
                  >
                    { icao }
                  </Styles.SearchAutoCompleteItem>
                ))
              }
            </Styles.SearchAutoComplete>
          )
        }
      </Styles.SearchForm>
      <Styles.ProceduresTabs>
        <TabsProcedures
          initialTab={searchContext.procedureType as any}
          onTabChange={handleChangeProcedureType}
        />
      </Styles.ProceduresTabs>
      {
        searchContext.airport && (
          <Styles.Airport>
            <Text
              text={`${ searchContext.airport.icao } - ${ searchContext.airport.name }`}
              color='neutral'
              size='medium'
            />
            <Button
              text='INFO'
              onClick={() => searchContext.setShowAirportModal(true)}
            />
          </Styles.Airport>
        )
      }
      {
        proceduresListStatus === 'default' && (
          <Styles.Filter>
            <Input
              placeholder="Filter by procedure name"
              color='dark'
              size='small'
              onChange={handleChangeProcedureFilter}
            />
          </Styles.Filter>
        )
      }
      <ListProcedures
        message='Please, search for airport'
        procedures={parseProceduresList(searchContext.procedures, searchContext.pinnedProcedures) as any}
        status={proceduresListStatus}
        onClickProcedure={handleClickProcedure}
        onClickProcedurePin={handleClickPinProcedure}
      />
    </Styles.Aside>
  )
}