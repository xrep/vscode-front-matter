import { Uri } from "vscode";

export interface Page {
  fmGroup: string;
  fmFilePath: string;
  fmFileName: string;
  fmModified: number;

  title: string;
  slug: string;
  date: string | Date;
  draft: string;
  description: string;

  preview?: string;
  [prop: string]: any;
}