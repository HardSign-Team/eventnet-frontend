import { IEntityViewModel } from "./IEntity";
import { Nullable } from "@skbkontur/react-ui-validations/typings/Types";

export interface IEntityRepository<TEntity extends IEntityViewModel<TId>, TId> {
  getAll(): Array<TEntity>;

  addRange(items: Array<TEntity>): void;

  setRange(items: Array<TEntity>): void;

  removeWhere(filter: (x: TEntity) => boolean): void;

  getById(id: TId): Nullable<TEntity>;
}
