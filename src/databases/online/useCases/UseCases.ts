import AsyncStorage from "@react-native-async-storage/async-storage";

import { createFarmOffiline, createMachineOffiline, createReasonOffiline, listFarmsOffiline, listMachineriesOffiline, listReasonsOffiline, listStopRegisterOffiline, updateStopRegisterOffiline } from "../../offline/repository/Repository";
import api from "../../../services/api";

import { IResource } from "../../../model/Resource";
import { IFarm } from "../../../model/Farm";
import { IMachine } from "../../../model/Machine";
import { IReason } from "../../../model/Reason";
import { IStopRegisterApi } from "../../../model/StopRegisterApi";
import { IStopRegister } from "../../../model/StopRegister";

export async function login(email: string, password: string) {
    let result;

    try {
        await api.post('/api/auth/v2', {
            email: email,
            senha: password,
            idPartner: 372
        }).then(async (response: any) => {
            await AsyncStorage.setItem('Token', response.data.data.token);

            result = { status: 200 }
        });
    } catch (e) {
        result = { status: 400 }
    }

    return result
}

export async function createStopRegisterApi(data: IStopRegisterApi) {
    let result;
    const token = await AsyncStorage.getItem('Token');

    try {
        await api.post('/mobile/machine/stop-register/registry', {
            uuid: data.uuid,
            note: data.note,
            idFarm: data.idFarm,
            idField: data.idField,
            idReason: data.idReason,
            idMachinery: data.idMachinery,
            minutes: data.minutes,
            longitude: data.longitude,
            latitude: data.latitude
        }, {
            headers: {
                'TokenAuthorization': token
            }
        }).then(async (response: any) => {
            result = { status: 200 }
        });
    } catch (e) {
        result = { status: 400 }
    }

    return result
}

export async function synchronizeDatabases() {
    let result;
    const token = await AsyncStorage.getItem('Token');

    try {
        await api.get('/mobile/machine/resources', {
            headers: {
                'TokenAuthorization': token
            }
        }).then(async (response: any) => {
            await synchronizeDatabasesStopRegisterApi();
            await synchronizeDatabasesOffline(response.data.data.resources)
            result = { status: 200 }
        })
    } catch (e) {
        result = { status: 400, msg: 'Falha ao sincronizar os dados.' }
    }

    return result
}

export async function synchronizeDatabasesStopRegisterApi() {
    const listStopRegisterOffline = await listStopRegisterOffiline();
    const missingtopRegisterApi: IStopRegister[] = listStopRegisterOffline.toJSON().filter((stopRegister: IStopRegister) => stopRegister.synchronized === false);

    if (missingtopRegisterApi.length > 0) {
        missingtopRegisterApi.map(async (stopRegister) => {
            const response = await createStopRegisterApi({
                uuid: stopRegister.uuid,
                note: stopRegister.note,
                idFarm: stopRegister.farm.id,
                idField: stopRegister.field.id,
                idReason: stopRegister.reason.id,
                idMachinery: stopRegister.machine.id,
                minutes: stopRegister.minutes,
                longitude: stopRegister.longitude,
                latitude: stopRegister.latitude
            })

            if(response?.status === 200) {
                await updateStopRegisterOffiline(stopRegister)
                console.log('subiu')
            }
        })
    }
}

export async function synchronizeDatabasesOffline(data: IResource) {
    try {
        const listMachineriesOffline = await listMachineriesOffiline();
        const listMachineriesApi = data.machineries;

        const missingMachineOffline = listMachineriesApi.filter((machine: IMachine) =>
            !listMachineriesOffline.toJSON().find((machineFind: IMachine) => machineFind.id === machine.id),
        );

        if (missingMachineOffline.length > 0) {
            await createMachineOffiline(missingMachineOffline);
        }

        const listFarmsOffline = await listFarmsOffiline();
        const listFarmsApi = data.farms;

        const missingFarmOffline = listFarmsApi.filter((farm: IFarm) =>
            !listFarmsOffline.toJSON().find((farmFind: IFarm) => farmFind.id === farm.id),
        );

        if (missingFarmOffline.length > 0) {
            await createFarmOffiline(missingFarmOffline);
        }

        const listReasonsOffline = await listReasonsOffiline();
        const listReasonsApi = data.reasons;

        const missingReasonsOffline = listReasonsApi.filter((reason: IReason) =>
            !listReasonsOffline.toJSON().find((reasonFind: IReason) => reasonFind.id === reason.id),
        );

        if (missingReasonsOffline.length > 0) {
            await createReasonOffiline(missingReasonsOffline);
        }

    } catch (e) {
        console.log(e)
    }
}