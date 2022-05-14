import {Nullable} from "@skbkontur/react-ui-validations/typings/Types";
import {IEntityViewModel} from "./IEntity";
import {IEntityRepository} from "./IEntityRepository";
import {makeAutoObservable} from "mobx";

export class Repository<TEntity extends IEntityViewModel<TId>, TId> implements IEntityRepository<TEntity, TId> {
    private _items: Array<TEntity> = [];

    constructor() {
        makeAutoObservable(this);
    }
    public getAll(): Array<TEntity> {
        return this._items;
    }

    public addRange(items: Array<TEntity>): void {
        const ids = new Set(items.map(x => x.id));
        this._items = this._items.filter(x => !ids.has(x.id)).concat(items);
    }

    public removeWhere(filter: (x: TEntity) => boolean): void {
        this._items = this._items.filter(x => !filter(x));
    }

    public getById(id: TId): Nullable<TEntity> {
        return this._items.find(x => x.id === id);
    }
}