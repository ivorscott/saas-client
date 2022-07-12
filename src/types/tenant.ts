export interface ConnectionMap {
  [index: string]: Connection;
}

export type Connection = {
  id: string;
  path: string;
  plan: string;
  companyName: string;
};

export interface Organization {
  id: string;
  path: string;
  name: string;
  color?: string;
}

export interface SeatsAvailable {
  maxSeats: number;
  seatsAvailable: number;
}

export interface TMap {
  [index: string]: {
    path: string;
    company: string;
    id: string;
  };
}
