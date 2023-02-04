import { FlightPackage } from './flightPackage.entity';

export interface FlightInterface {
  id: number;
  source: string;
  destination: string;
  departure: Date;
  packages: FlightPackage[];
}
