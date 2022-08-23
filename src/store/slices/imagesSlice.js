import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataImages: null,
  searchImage: null,
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
      console.log("Found Image: ", foundImage);
      console.log("Data Images: ", state.dataImages);

      // const newArray = state.dataImages.unshift(foundImage);
      // console.log("NEW ARRAY", newArray);

      // state.dataImages = state.dataImages.unshift(foundImage);
    },
  },
});

export const { addImages, searchImg } = imageSlice.actions;
export default imageSlice.reducer;
