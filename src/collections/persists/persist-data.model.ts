import { ObjectId } from 'mongoose';

export type UpdateResult = {
  matchedCount: number;
  modifiedCount: number;
  acknowledged: boolean;
  upsertedId: unknown | ObjectId;
  upsertedCount: number;
};

export type RemoveResult = {
  deletedCount: number;
  deleted: boolean;
};

export type CreateResult = {
  id: string;
  created: boolean;
};
