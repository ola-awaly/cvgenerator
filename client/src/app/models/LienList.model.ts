import { LienItem } from "./LienItem.model";


export interface LienList {
    count: number;
    rows:  LienItem[];
    page:  number;
}
