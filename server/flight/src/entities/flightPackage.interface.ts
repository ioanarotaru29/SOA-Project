import { Flight } from './flight.entity';

export interface FlightPackageInterface {
  id: number;
  amount: number;
  description: string;
  flight: Flight;
}
