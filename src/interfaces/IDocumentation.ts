import { IDocumentationType } from "./IDocumentationType";

export interface IDocumentation {
  id: number;
  patient_id: number;
  documentation_type_id?: number;
  other_documentation_type?: string;
  filename: string;
  mimetype: string;
  created_by: number;
  updated_by?: number;
  deleted_by?: number;
  its: Date;
  uts?: Date;
  dts?: Date;
  documentationType?: IDocumentationType;
}
