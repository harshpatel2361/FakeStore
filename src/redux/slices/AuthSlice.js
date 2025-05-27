import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userDetails: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userDetails = action.payload;
    },
    userLogout: (state) => {
      state.userDetails = null
    },
    updateProfile: (state, action) => {
      if(state.userDetails) {
        state.userDetails={
          ...state.userDetails,
          ...action.payload
        }
      }
    }
  }
})

export const {userLogin, userLogout, updateProfile} = authSlice.actions;
export default authSlice.reducer;