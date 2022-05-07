import {PageInfoDto} from "./PageInfoDto";

export class RequestEventDto {
    public constructor(readonly filterModel: any, readonly pageInfo: PageInfoDto) {}
}