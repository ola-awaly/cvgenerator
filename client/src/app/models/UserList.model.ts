import { UserItem } from "./UserITem.model";

export interface UserList{
    count:number,
    rows: UserItem[],
    page: number
}