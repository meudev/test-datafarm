import { IFarm } from "./Farm";
import { IMachine } from "./Machine";
import { IReason } from "./Reason";

export interface IResource {
    machineries: IMachine[];
    farms: IFarm[];
    reasons: IReason[];
}