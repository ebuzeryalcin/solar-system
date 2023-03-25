export interface Moon {
    id: string;
    name: string;
    gravity: number;
    density: number;
  }
  
  export default interface MoonData {
    gravity: number;
    density: number;
  }
  
  export interface Planet {
    id: string;
    name: string;
    details?: boolean;
    moons: Moon[];
    gravity?: number;
    density?: number;
    moonsData?: Record<string, MoonData>; 
  }
  
  export interface PlanetsState {
    loading: boolean;
    planets: Planet[];
    error: string;
    refresh: boolean;
  }
  
  export interface PlanetsResponse {
    bodies: Planet[];
  }
  
  
  export interface Mission {
    id: string;
    name: string;
    details: string;
    moons: Moon[] | null;
  }
  