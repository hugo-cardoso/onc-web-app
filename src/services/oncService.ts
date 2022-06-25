import axios from 'axios';
import type {
  Icao,
  ServiceResponse,
  ProcedureOptions,
} from '../types';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export const oncService = {
  getAirport: async (icao: string): Promise<ServiceResponse> => {
    const response: ServiceResponse = {
      data: null,
      success: false,
    };

    try {
      const apiResponse = await axios.get(`/search/airport?icao=${ icao }`);
      
      response.data = apiResponse.data;
      response.success = true;
    } finally {
      return response;
    }
  },

  getProcedures: async (icao: Icao, type: ProcedureOptions): Promise<ServiceResponse> => {
    const response: ServiceResponse = {
      data: null,
      success: false,
    };

    try {
      const apiResponse = await axios.get(`/charts?icao=${ icao }&type=${ type }`);
      
      response.data = apiResponse.data.map((procedure: any) => ({
        id: procedure._id,
        icao: procedure.icao,
        type: procedure.type,
        name: procedure.name,
      }));
      response.success = true;
    } finally {
      return response;
    }
  },

  getAirportMetar: async (icao: Icao): Promise<ServiceResponse> => {
    const response: ServiceResponse = {
      data: null,
      success: false,
    };

    try {
      const apiResponse = await axios.get(`/metar?icao=${ icao }`);
      response.success = true;
      response.data = apiResponse.data;
    } finally {
      return response;
    }
  },

  getIcaoList: async (): Promise<ServiceResponse> => {
    const response: ServiceResponse = {
      data: null,
      success: false,
    };

    try {
      const apiResponse = await axios.get('/airports');
      response.success = true;
      response.data = apiResponse.data;
    } finally {
      return response;
    }
  },

  getPayments: async (): Promise<ServiceResponse> => {
    const response: ServiceResponse = {
      data: null,
      success: false,
    };

    try {
      const apiResponse = await axios.get('/payments');
      response.success = true;
      response.data = apiResponse.data;
    } finally {
      return response;
    }
  },
}
