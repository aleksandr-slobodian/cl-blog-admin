export interface UploadImage {
  id: string;
  name: string;
  file: File;
  status?: "started" | "uploading" | "fulfilled" | "failed" | "aborted";
  progress?: number;
}

export interface Image {
  id: string;
  name: string;
  originalname: string;
  date: number;
}
