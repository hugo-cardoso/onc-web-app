import type { Airport, Procedure } from '../types';

export const groupProcedureByRwy = (airport: Airport, procedures: Procedure[]) => {
  let groups: Procedure[] = [];

  airport.runways
    .filter(runway => runway.type === 'RWY')
    .map(runway => runway.headboards)
    .flatMap(item => item)
    .forEach(headboard => {
      const group = procedures
        .filter(procedure => procedure.name.includes(headboard))
        .map(procedure => ({
          id: procedure.id,
          icao: procedure.icao,
          group: `RWY ${headboard}`,
          type: procedure.type,
          name: procedure.name,
          selected: procedure.selected || false,
          pinned: procedure.pinned || false,
        }));

      groups = [...groups, ...group];
    });

  return groups;
}