import type { Procedure } from '../types';

export const groupProceduresByIcao = (procedures: Procedure[]) => {
  return procedures.map((procedure) => ({
    ...procedure,
    group: procedure.icao,
  }));
}