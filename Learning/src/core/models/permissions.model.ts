export interface PermissionsModel {
  [key: string]: string | null;
  vacanciesView: string | null;
  recruitersView: string | null;
  candidatesView: string | null;
  interviewsView: string | null;
  vacanciesCreate: string | null;
  recruitersCreate: string | null;
  candidatesCreate: string | null;
  interviewsCreate: string | null;
  vacanciesEdit: string | null;
  recruitersEdit: string | null;
  candidatesEdit: string | null;
  interviewsEdit: string | null;
  vacanciesDelete: string | null;
  recruitersDelete: string | null;
  candidatesDelete: string | null;
  interviewsDelete: string | null;
}
