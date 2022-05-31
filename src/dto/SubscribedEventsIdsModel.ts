import { guid } from "../viewModels/Guid";

export class SubscribedEventsIdsModel {
  public constructor(readonly eventIds: Array<guid>) {}
}
