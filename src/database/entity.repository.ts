import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

@Injectable()
export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[] | null> {
    try {
      return this.entityModel.find(entityFilterQuery, {
        // _id: 0,
        __v: 0,
        // hash: 0,
        ...projection,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    try {
      return this.entityModel
        .findOne(entityFilterQuery, {
          // _id: 0,
          __v: 0,
          ...projection,
        })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async create(createEntityData: unknown): Promise<T> {
    try {
      const newEntity = new this.entityModel(createEntityData);
      return newEntity.save();
    } catch (error) {
      throw error;
    }
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    try {
      return this.entityModel.findOneAndUpdate(
        entityFilterQuery,
        updateEntityData,
        {
          new: true,
          projection: {
            __v: 0,
            // hash: 0,
            ...projection,
          },
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T> {
    try {
      return this.entityModel.findOneAndDelete(entityFilterQuery, {
        projection: {
          __v: 0,
          ...projection,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    try {
      const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
      return deleteResult.deletedCount >= 1;
    } catch (error) {
      throw error;
    }
  }
}
