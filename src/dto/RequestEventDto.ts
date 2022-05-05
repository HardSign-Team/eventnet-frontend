import {PageInfo} from "./PageInfo";

export class RequestEventDto {
    public constructor(readonly filterModel: any, readonly pageInfo: PageInfo) {}
}