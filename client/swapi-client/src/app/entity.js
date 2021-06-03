import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
    name: 'entity',
    initialState: {
      value: ""
    },
    reducers: {
      update: (state, action) => {
        state.value = action.payload
      }
    }
})

export const {update} = slice.actions;

export const selectEntity = state => state.entity.value;


export default slice.reducer;
