import { FormationItem } from "./FormationItem.model";

export interface FormationList{
    count:number,
    rows:FormationItem[],
    page:number
}