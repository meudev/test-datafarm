import Realm from 'realm';

export class ReasonSchema extends Realm.Object {
    static schema = {
      name: 'Reason',
      primaryKey: 'id',
      properties: {
        id: 'int',
        name: 'string',
        icon: 'string'
      }
    }
}