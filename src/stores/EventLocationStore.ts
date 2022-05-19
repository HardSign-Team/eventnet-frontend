import {Repository} from "../utils/Repository";
import {EventLocationViewModel} from "../viewModels/EvenLocationViewModel";
import {guid} from "../viewModels/Guid";
import {makeAutoObservable, observable} from "mobx";
import {Nullable} from "@skbkontur/react-ui/typings/utility-types";
import {IEntityRepository} from "../utils/IEntityRepository";

export class EventLocationStore implements IEntityRepository<EventLocationViewModel, guid> {
    private _repository: IEntityRepository<EventLocationViewModel, guid>;
    constructor() {
        this._repository = observable(new Repository<EventLocationViewModel, guid>());
        makeAutoObservable(this);
    }

    addRange(items: Array<EventLocationViewModel>): void {
        this._repository.addRange(items);
    }

    getAll(): Array<EventLocationViewModel> {
        return this._repository.getAll();
    }

    getById(id: guid): Nullable<EventLocationViewModel> {
        return this._repository.getById(id);
    }

    removeWhere(filter: (x: EventLocationViewModel) => boolean): void {
        this._repository.removeWhere(filter);
    }

    // private _items: Array<EventLocationViewModel> = [];
    //
    // public getAll(): Array<EventLocationViewModel> {
    //     return this._items;
    // }
    //
    // public addRange(items: Array<EventLocationViewModel>): void {
    //     const ids = new Set(items.map(x => x.id));
    //     this._items = this._items.filter(x => !ids.has(x.id)).concat(items);
    // }
    //
    // public removeWhere(filter: (x: EventLocationViewModel) => boolean): void {
    //     this._items = this._items.filter(x => !filter(x));
    // }
    //
    // public getById(id: guid): Nullable<EventLocationViewModel> {
    //     return this._items.find(x => x.id === id);
    // }
}