import { CandidateModel } from "./candidate.model";
import { RecruiterModel } from "./recruiter.model";
import { VacancyModel } from "./vacancy.model";

export interface InterviewModel {
    id: number;
    vacancy: VacancyModel;
    recruiter: RecruiterModel;
    candidate: CandidateModel;
    dateTime: Date;
}