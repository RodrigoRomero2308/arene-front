export interface ICreateDocumentationDTO {
  patient_id: number;
  file: File;
  documentation_type_id?: number;
  other_documentation_type?: string;
}
