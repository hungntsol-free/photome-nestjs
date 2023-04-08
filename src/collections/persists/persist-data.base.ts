import { Injectable, Scope } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateResult, UpdateResult, RemoveResult } from './persist-data.model';

@Injectable({ scope: Scope.TRANSIENT })
export abstract class PersistData<T> {
  constructor(protected readonly model: mongoose.Model<T>) {}

  asModel(): mongoose.Model<T> {
    return this.model;
  }

  /**
   * Save new document.
   */
  async saveAsync(
    document: unknown,
    saveOptions?: mongoose.SaveOptions,
  ): Promise<CreateResult> {
    const createdDocument = new this.model(document);
    const saveResult = await createdDocument.save(saveOptions);

    return { id: saveResult.id, created: !!saveResult.id };
  }

  /**
   * Find all document match filter definition.
   */
  async findAsync(
    filter: mongoose.FilterQuery<T>,
    options?: mongoose.QueryOptions,
  ): Promise<T[]> {
    return await this.model.find(filter, null, options);
  }

  /**
   * Find one document by given id.
   */
  async findByIdAsync(id: string): Promise<T> {
    return await this.model.findById(id);
  }

  /**
   * Find one entry by given filter definition.
   */
  async findOneAsync(
    filter: mongoose.FilterQuery<T>,
    options?: mongoose.QueryOptions,
  ) {
    return await this.model.findOne(filter, null, options);
  }

  /**
   * Find all document in collection.
   */
  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  /**
   * Update one document with definition.
   */
  async updateOneAsync(
    filter: mongoose.FilterQuery<T>,
    updated: mongoose.UpdateWithAggregationPipeline | mongoose.UpdateQuery<T>,
    options?: mongoose.QueryOptions,
  ): Promise<UpdateResult> {
    return await this.model.updateOne(filter, updated, options);
  }

  /**
   * Update multiple document.
   */
  async updateManyAsync(
    filter: mongoose.FilterQuery<T>,
    updated: mongoose.UpdateWithAggregationPipeline | mongoose.UpdateQuery<T>,
    options?: mongoose.QueryOptions,
  ): Promise<UpdateResult> {
    return await this.model.updateMany(filter, updated, options);
  }

  /**
   * Remove multiple document.
   */
  async removeAsync(filter: mongoose.FilterQuery<T>): Promise<RemoveResult> {
    const { deletedCount } = await this.model.deleteMany(filter);
    return { deletedCount, deleted: !!deletedCount };
  }
}
