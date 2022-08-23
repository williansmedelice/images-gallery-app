import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataImages: null,
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImages: (state, action) => {
      // console.log("Desde redux: ", action.payload);
      state.dataImages = action.payload;
    },
    searchImg: (state, action) => {
      const foundImage = state.dataImages.find(
        (image) => image.id == action.payload
      );
      state.dataImages = state.dataImages.filter(
        (image) => image.id !== action.payload
      );
      state.dataImages.unshift(foundImage);
    },
  },
});

export const { addImages, searchImg } = imageSlice.actions;
export default imageSlice.reducer;
