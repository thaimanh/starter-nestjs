import { FindAllResponse } from '@common/type'

export interface BaseRepositoryInterface<T> {
  create(dto: T | unknown): Promise<T>

  findOneById(id: string, projection?: string): Promise<T>

  findOneByCondition(condition: object, projection?: string): Promise<T>

  findAll(condition: object, options?: object): Promise<FindAllResponse<T>>

  update(condition: object, dto: Partial<T>): Promise<T>

  softDelete(id: string): Promise<boolean>

  permanentlyDelete(id: string): Promise<boolean>
}
