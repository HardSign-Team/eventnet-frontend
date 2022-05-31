import { PageInfoDto } from "./PageInfoDto";
import { FilterEventModel } from "./FilterEventModel";

export class RequestEventDto {
  public constructor(
    readonly filterModel: FilterEventModel,
    readonly pageInfo: PageInfoDto
  ) {}
}
