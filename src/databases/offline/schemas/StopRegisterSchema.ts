import Realm from 'realm';

export class StopRegisterSchema extends Realm.Object {
    static schema = {
      name: 'StopRegister',
      primaryKey: 'uuid',
      properties: {
        uuid: 'string',
        note: 'string',
        farm: 'Farm',
        field: 'Field',
        reason: 'Reason',
        machine: 'Machine',
        minutes: 'int',
        longitude: 'double',
        latitude: 'double',
        synchronized: { type: 'bool', default: false },
        createdAt: 'date',
      }
    }
}