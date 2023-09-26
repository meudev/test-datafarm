import Realm from 'realm';

export class FarmSchema extends Realm.Object {
    static schema = {
      name: 'Farm',
      primaryKey: 'id',
      properties: {
        id: 'int',
        name: 'string',
        growerId: 'int',
        growerName: 'string',
        fields: 'Field[]',
      }
    }
}