import { CvItem } from "./CvItem.model"

export interface CvList{
    count:number,
    rows: CvItem[],
    page: number
}