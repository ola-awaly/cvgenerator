import { SectionItem } from "./SectionItem.model";

export interface SectionList{
    count: number,
    rows: SectionItem[],
    page:number
}