import { ObjectIdColumn, ObjectId, Entity } from 'typeorm';

export abstract class BaseMongoEntity {
  @ObjectIdColumn()
  _id: ObjectId;
}
