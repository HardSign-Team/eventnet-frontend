import {DateEquality} from "./DateEquality";

export class DateFilterModel {
    public constructor(readonly border: Date, readonly dateEquality: DateEquality) {
    }
}