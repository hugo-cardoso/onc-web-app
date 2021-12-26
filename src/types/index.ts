export type Airport = {
  _id: string;
  __v: number;
  name: string;
  icao: string;
  location: {
    cordinates: {
      lat: string;
      lng: string;
    }
  };
  radios: {
    _id: string;
    type: string;
    frequences: string[];
  }[];
  runways: {
    headboards: string[];
    ident: string;
    width: string;
    length: string;
    type: string;
  }[];
  charts: {
    _id: string;
    name: string;
    type: string;
    chartUrl: string;
  }[];
};

export type ProcedureOptions = 'STAR' | 'IAC' | 'TAXI' | 'SID' | 'ADC' | 'PDC';

export type Icao = string;

export type Procedure = {
  id: string;
  icao?: string;
  type: ProcedureOptions;
  name: string;
  selected?: boolean;
  pinned?: boolean;
  group?: string;
};

export type ServiceResponse = {
  data: any;
  success: boolean;
};