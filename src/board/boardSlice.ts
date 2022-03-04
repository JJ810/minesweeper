import { createSelector, createSlice } from '@reduxjs/toolkit';

interface BoardSlice {
  map: string[];
  message: string;
}

interface BoardReduxState {
  board: BoardSlice;
}

const initialState: BoardSlice = {
  map: [],
  message: ''
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setMap(state, action) {
      if (action.payload) {
        state.map = action.payload
          .replace('map:', '')
          .split('\n')
          .filter((item: string[]) => Boolean(item.length));
      }
    },
    setMessage(state, action) {
      state.message = action.payload;
    }
  }
});

export const { setMap, setMessage } = boardSlice.actions;

const boardStateSelector = (state: BoardReduxState) => state.board;

export const mapSelector = createSelector(boardStateSelector, (state: BoardSlice) => state.map);
export const messageSelector = createSelector(
  boardStateSelector,
  (state: BoardSlice) => state.message
);

export default boardSlice.reducer;
