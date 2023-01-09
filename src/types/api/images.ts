export interface UploadImage {
  id: string;
  name: string;
  file: File;
  status?: "uploading" | "fulfilled" | "failed";
  progress?: number;
}
