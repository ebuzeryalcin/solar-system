import { PlanetsResponse, Moon } from '../redux/planets/types';

const API_URL = 'https://api.le-systeme-solaire.net/rest/bodies/';

interface FetchPlanetsOptions {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: string[];
  includeMoons?: boolean;
}

export const fetchPlanets = async ({
  sortBy,
  sortOrder,
  filters,
  includeMoons = false,
}: FetchPlanetsOptions = {}): Promise<PlanetsResponse> => {
  let query = '?filter[]=isPlanet,eq,true';
  if (filters && filters.length > 0) {
    const filterQuery = filters.map(filter => `&filter[]=${filter}`).join('');
    query += filterQuery;
  }

  if (sortBy) {
    query += `&sort=${sortBy}`;
    if (sortOrder) {
      query += `&order=${sortOrder}`;
    }
  }

  if (includeMoons) {
    query += '&include[]=moons.gravity';
  }
 
  const response = await fetch(`${API_URL}${query}`);
  const data = await response.json();
  return data as PlanetsResponse;
};


export const getMoonsDataX = async (planetID: string = ""): Promise<Moon[]> => {
  const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planetID}/moons`);
  const data = await response.json();
  const moons: Moon[] = [];

  for (const satellite of data.moons) {
    const moonResponse = await fetch(satellite.rel);
    const moonDetails = await moonResponse.json();

    const moon: Moon = {
      id: moonDetails.id,
      name: moonDetails.name,
      gravity: moonDetails.gravity, 
      density: moonDetails.density
    };
    moons.push(moon);
  }
  
  return moons;
};
