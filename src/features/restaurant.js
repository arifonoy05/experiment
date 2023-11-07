import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://localhost:8080/api/restaurants/all";

export const getRestaurantList = createAsyncThunk('restaurant/getRestaurantList', ()=>{
  return fetch(url)
  .then((res) => res.json())
  .catch((err) => console.log(err))
})

const initialState = { value: [], isLoading: true }

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  extraReducers: {
    [getRestaurantList.pending]: (state) => {
      state.isLoading = true
    },
    [getRestaurantList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.value = action.payload
    },
    [getRestaurantList.rejected]: (state) => {
      state.isLoading = false
    }
  },
});

export const {
  // getRestaurantList,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
