import Realm from 'realm';

export class MachineSchema extends Realm.Object {
    static schema = {
      name: 'Machine',
      primaryKey: 'id',
      properties: {
        id: 'int',
        name: 'string',
        serialNumber: 'string?',
        growerId: 'int'
      }
    }
}