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
  constructor() {
    this._repository = observable(
      new Repository<EventLocationViewModel, guid>()
    );
    makeAutoObservable(this);
  }

  setRange(items: Array<EventLocationViewModel>): void {
    this._repository.setRange(items);
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
}
