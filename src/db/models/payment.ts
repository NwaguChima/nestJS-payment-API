import { Model, RelationMappings, RelationMappingsThunk } from 'objection';

class Payment extends Model {
  static get tableName(): string {
    return 'payment';
  }

  // static get relationMappings(): RelationMappings | RelationMappingsThunk {
  //   return {
  //     user: {
  //       relation: Model.HasOneRelation,
  //       modelClass: User,
  //       join: {
  //         from: 'payment.user_id',
  //         to: 'user.id',
  //       },
  //     },
  //   };
  // }
}

export default Payment;
