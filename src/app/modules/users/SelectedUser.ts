import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedUser {
  id: string;
  name: string;
}

interface SelectedUserState {
  current: SelectedUser | null;
}

const initialState: SelectedUserState = {
  current: null,
};

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<SelectedUser>) => {
      state.current = action.payload;
    },
    clearSelectedUser: (state) => {
      state.current = null;
    },
  },
});

export const { setSelectedUser, clearSelectedUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
