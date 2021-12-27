import React, { createContext, useState } from 'react';
import { localStoragePinnedProceduresService } from '../services/localStoragePinnedProceduresService';

import type { Procedure, Airport, ProcedureOptions, Icao } from '../types';

type ViewOptions = 'search' | 'pinned';

type SearchContextType = {
  icao: Icao;
  setIcao: (icao: Icao) => void;
  procedureType: ProcedureOptions;
  setProcedureType: (procedureType: ProcedureOptions) => void;
  activeProcedure: Procedure | null;
  setActiveProcedure: (procedure: Procedure | null) => void;
  view: ViewOptions;
  setView: (view: ViewOptions) => void;
  pinnedProcedures: Procedure[];
  clearPinnedProcedures: () => void;
  addPinnedProcedure: (procedure: Procedure) => void;
  removePinnedProcedure: (procedure: Procedure) => void;
  airport: Airport | null;
  setAirport: (airport: Airport | null) => void;
  procedures: Procedure[];
  setProcedures: (procedures: Procedure[]) => void;
};

export const SearchContext = createContext<SearchContextType>({
  icao: '',
  setIcao: () => {},
  procedureType: 'STAR',
  setProcedureType: () => {},
  activeProcedure: null,
  setActiveProcedure: () => {},
  view: 'search',
  setView: () => {},
  pinnedProcedures: [],
  clearPinnedProcedures: () => {},
  addPinnedProcedure: () => {},
  removePinnedProcedure: () => {},
  airport: null,
  setAirport: () => {},
  procedures: [],
  setProcedures: () => {},
});

type SearchContextProps = {
  children: React.ReactNode;
};

export const SearchProvider = (props: SearchContextProps) => {
  const [icao, setIcao] = useState<Icao>('');
  const [procedureType, setProcedureType] = useState<ProcedureOptions>('STAR');
  const [airport, setAirport] = useState<Airport | null>(null);
  const [activeProcedure, setActiveProcedure] = useState<Procedure | null>(null);
  const [view, setView] = useState<ViewOptions>("search");
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [pinnedProcedures, setPinnedProcedures] = useState<Procedure[]>(localStoragePinnedProceduresService.get());


  const clearPinnedProcedures = () => {
    setPinnedProcedures([]);
    localStoragePinnedProceduresService.set([]);
  };

  const addPinnedProcedure = (procedure: Procedure) => {
    const newPinnedProcedures = [...pinnedProcedures, procedure];
    setPinnedProcedures(newPinnedProcedures);
    localStoragePinnedProceduresService.set(newPinnedProcedures);
  };

  const removePinnedProcedure = (procedure: Procedure) => {
    const newPinnedProcedures = pinnedProcedures.filter(p => p.id !== procedure.id);
    setPinnedProcedures(newPinnedProcedures);
    localStoragePinnedProceduresService.set(newPinnedProcedures);
  };

  return (
    <SearchContext.Provider
      value={{
        icao,
        setIcao,
        procedureType,
        setProcedureType,
        airport,
        setAirport,
        procedures,
        setProcedures,
        view,
        setView,
        pinnedProcedures,
        clearPinnedProcedures,
        addPinnedProcedure,
        removePinnedProcedure,
        activeProcedure,
        setActiveProcedure,
      }}
    >
      { props.children }
    </SearchContext.Provider>
  );
};
