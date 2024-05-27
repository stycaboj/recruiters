import { CandidateModel } from "./candidate.model";
import { InterviewModel } from "./interview.model";
import { RecruiterModel } from "./recruiter.model";
import { VacancyModel } from "./vacancy.model";

export interface DataInterviewsModel {
    interview?: InterviewModel,
    vacancies: VacancyModel[],
    candidates: CandidateModel[],
    recruiters: RecruiterModel[]
}