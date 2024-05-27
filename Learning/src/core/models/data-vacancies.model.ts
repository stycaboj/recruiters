import { RecruiterModel } from "./recruiter.model";
import { SeniorityModel } from "./seniority.model";
import { TypeModel } from "./type.model";
import { VacancyModel } from "./vacancy.model";

export interface DataVacanciesModel {
    vacancy?: VacancyModel,
    recruiters: RecruiterModel[],
    seniorities: SeniorityModel[],
    types: TypeModel[],
}