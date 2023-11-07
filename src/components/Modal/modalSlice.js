import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
  content: ""
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    openModal: (state, action) => {
      const {content} = action.payload.content
      state.isOpen = true
      state.content = action.payload.content
    },
    closeModal: (state) => {
      state.isOpen = false
      state.content = ""
    }
  }
})

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;