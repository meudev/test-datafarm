import Realm from 'realm';

import { FarmSchema } from './schemas/FarmSchema';
import { FieldSchema } from './schemas/FieldSchema';
import { MachineSchema } from './schemas/MachineSchema';
import { ReasonSchema } from './schemas/ReasonSchema';
import { StopRegisterSchema } from './schemas/StopRegisterSchema';

export const getRealm = async () => await Realm.open({
    path: 'DataFarm',
    schema: [
        FarmSchema,
        FieldSchema,
        MachineSchema,
        ReasonSchema,
        StopRegisterSchema,
    ],
})