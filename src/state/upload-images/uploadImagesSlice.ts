import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { UploadImage } from "../../types/api/images";
import { v4 as uuid } from "uuid";
import { API_BASE_URL, API_PATH_IMAGES } from "../../config";

interface UploadImagesState {
  images: UploadImage[];
}

const initialState: UploadImagesState = { images: [] };

export const asyncAbortUploadingImages = createAsyncThunk(
  "uploadImages/asyncAbortUploadingImages",
  async (_, { dispatch }) => {
    dispatch(abortUploadingImages());
  }
);

export const uploadImage = createAsyncThunk(
  "uploadImages/uploadImage",
  async (id: string, { getState, signal, dispatch }) => {
    const { uploadImages } = getState() as RootState;
    const img = uploadImages.images.find((image) => id === image.id);
    if (img) {
      let request = new XMLHttpRequest();
      let data = new FormData();
      data.set("id", id);
      data.set("file", img.file);
      signal.addEventListener("abort", () => {
        request.abort();
      });
      request.upload.addEventListener("progress", function (e) {
        let percent_completed = (e.loaded / e.total) * 100;
        dispatch(setImageUploadProgress({ progress: percent_completed, id }));
      });
      await new Promise((resolve, reject) => {
        request.open("POST", API_BASE_URL + API_PATH_IMAGES);
        request.addEventListener("load", async (event) => {
          if (request.status === 201) {
            resolve(JSON.parse(request.response));
          } else {
            reject();
          }
        });
        request.addEventListener("error", () => {
          reject();
        });
        request.send(data);
      });
      if (request.response) {
        return JSON.parse(request.response);
      }
    }
  }
);

function setUploadStatus(
  status: UploadImage["status"],
  state: UploadImagesState,
  action: PayloadAction<
    undefined | unknown,
    string,
    {
      arg: string;
    },
    never
  >
) {
  const img = state.images.find(({ id }) => id === action.meta.arg);
  if (img) {
    img.status = status;
  }
}

export const uploadImagesSlice = createSlice({
  name: "uploadImages",
  initialState,
  reducers: {
    clearUploadImages: (state) => {
      state.images = [];
    },
    abortUploadingImages: (state) => {
      const uploadingImages = state.images.filter(
        ({ status }) => status === "started" || status === "uploading"
      );
      if (uploadingImages.length) {
        uploadingImages.map((img) => {
          img.status = "aborted";
          return img;
        });
        state.images = uploadingImages;
      }
    },
    addUploadImages: (state, action: PayloadAction<File[]>) => {
      if (action.payload.length) {
        const images: UploadImage[] = [];
        action.payload.forEach((file) => {
          images.push({ id: uuid(), file, name: file.name });
        });
        state.images = images;
      } else {
        state.images = [];
      }
    },
    deleteUploadImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter(({ id }) => id !== action.payload);
    },
    startUploadImage: (state, action: PayloadAction<string>) => {
      const img = state.images.find(({ id }) => id === action.payload);
      if (img) {
        img.status = "started";
      }
    },
    setImageUploadProgress: (
      state,
      action: PayloadAction<{ id: string; progress: number }>
    ) => {
      const img = state.images.find(({ id }) => id === action.payload.id);
      if (img) {
        img.progress = action.payload.progress;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state, action) => {
        setUploadStatus("uploading", state, action);
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        setUploadStatus("fulfilled", state, action);
      })
      .addCase(uploadImage.rejected, (state, action) => {
        setUploadStatus("failed", state, action);
      });
  },
});

export const {
  addUploadImages,
  startUploadImage,
  deleteUploadImage,
  setImageUploadProgress,
  clearUploadImages,
  abortUploadingImages,
} = uploadImagesSlice.actions;

export const selectUploadImages = (state: RootState) => state.uploadImages;

export default uploadImagesSlice.reducer;
