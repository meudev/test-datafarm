import { getRealm } from '../realm';

import { IStopRegister } from '../../../model/StopRegister';
import { IFarm, IField } from '../../../model/Farm';
import { IMachine } from '../../../model/Machine';
import { IReason } from '../../../model/Reason';

export async function createStopRegisterOffiline(stopRegister: IStopRegister) {
    try {
        const realm = await getRealm();
        realm.write(() => {
            realm.create('StopRegister', stopRegister, true);
        });
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}

export async function listStopRegisterOffiline() {
    try {
        const realm = await getRealm();
        const stopRegister: any = realm.objects('StopRegister');

        return stopRegister;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateStopRegisterOffiline(recordStops: IStopRegister) {
    try {
        const realm = await getRealm();
        realm.write(() => {
            const registerStopUpdate: any = realm.objectForPrimaryKey(
                'StopRegister',
                recordStops.uuid,
            );
            registerStopUpdate.synchronized = true;
        });
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}

export async function createFarmOffiline(farms: IFarm[]) {
    try {
        const realm = await getRealm();
        farms.forEach((farm: IFarm) => {
            realm.write(() => {
                realm.create('Farm', farm);
            });
        });
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}

export async function listFarmsOffiline() {
    try {
        const realm = await getRealm();
        const farms: any = realm.objects('Farm');

        return farms;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createFieldOffiline(field: IField) {
    try {
        const realm = await getRealm();
        realm.write(() => {
            realm.create('Field', field);
        });
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createMachineOffiline(machineries: IMachine[]) {
    try {
        const realm = await getRealm();
        machineries.forEach((machine: IMachine) => {
            realm.write(() => {
                realm.create('Machine', machine);
            });
        });
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}

export async function listMachineriesOffiline() {
    try {
        const realm = await getRealm();
        const machineries: any = realm.objects('Machine');

        return machineries;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createReasonOffiline(reasons: IReason[]) {
    try {
        const realm = await getRealm();
        reasons.forEach((reason: IReason) => {
            realm.write(() => {
                realm.create('Reason', reason);
            });
        });
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}

export async function listReasonsOffiline() {
    try {
        const realm = await getRealm();
        const reasons: any = realm.objects('Reason');

        return reasons;
    } catch (error: any) {
        throw new Error(error);
    }
}