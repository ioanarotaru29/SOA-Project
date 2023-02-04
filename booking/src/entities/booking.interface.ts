export type Status = 'success' | 'pending' | 'denied';

export interface BookingInterface {
  id: number;
  userId: number;
  packageId: number;
  status: Status;
}
