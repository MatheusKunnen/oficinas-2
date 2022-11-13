export interface LockerOcupationModel {
  id: number;
  id_locker: number;
  entrance_time: Date;
  leave_time: Date | null;
}
