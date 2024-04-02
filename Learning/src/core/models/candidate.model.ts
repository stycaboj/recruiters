export interface CandidateModel {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    birthday: Date;
    image: string;
    skills: Array<string>;
}