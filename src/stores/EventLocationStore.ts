import { Repository } from "../utils/Repository";
import { EventLocationViewModel } from "../viewModels/EvenLocationViewModel";
import { guid } from "../viewModels/Guid";
import { makeAutoObservable, observable } from "mobx";
import { Nullable } from "@skbkontur/react-ui/typings/utility-types";
import { IEntityRepository } from "../utils/IEntityRepository";

export class EventLocationStore
  implements IEntityRepository<EventLocationViewModel, guid>
{
  private _repository: IEntityRepository<EventLocationViewModel, guid>;
  private canAdd = true;

  constructor() {
    this._repository = observable(
      new Repository<EventLocationViewModel, guid>()
    );
    makeAutoObservable(this);
  }

  allowAdding() {
    this.canAdd = true;
  }

  forbidAdding() {
    this.canAdd = false;
  }

  setRange(items: Array<EventLocationViewModel>): void {
    this._repository.setRange(items);
  }

  addRange(items: Array<EventLocationViewModel>): void {
    if (this.canAdd) this._repository.addRange(items);
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
}
