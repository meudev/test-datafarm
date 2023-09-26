import { IFarm, IField } from "./Farm";
import { IMachine } from "./Machine";
import { IReason } from "./Reason";

export interface IStopRegister {
    uuid: string;
    note: string;
    farm: IFarm;
    field: IField;
    reason: IReason;
    machine: IMachine;
    minutes: number;
    longitude: number;
    latitude: number;
    synchronized?: boolean;
    createdAt: Date;
}