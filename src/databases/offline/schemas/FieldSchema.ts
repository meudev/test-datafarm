import Realm from 'realm';

export class FieldSchema extends Realm.Object {
    static schema = {
      name: 'Field',
      primaryKey: 'id',
      properties: {
        id: 'int',
        name: 'string'
      }
    }
}