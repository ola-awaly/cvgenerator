import { ExperienceItem } from "./ExperienceItem.model"

export interface ExperienceList{
    count: number,
    rows: ExperienceItem[],
    page: number
}