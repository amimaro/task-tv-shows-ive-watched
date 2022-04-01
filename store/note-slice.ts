import { createSlice } from "@reduxjs/toolkit";
import { AppState } from ".";
import { INote } from "../types/note";

export interface INoteState {
  notes: Array<INote>;
}

const initialState: INoteState = {
  notes: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    removeNote(state, action) {
      const newNote: INote = action.payload;
      state.notes = state.notes.filter(
        (note) => note.media_id !== newNote.media_id
      );
    },
    addNote(state, action) {
      const newNote: INote = action.payload;
      const existingNote = state.notes.find(
        (item: INote) => item.media_id === newNote.media_id
      );
      if (existingNote) {
        existingNote.content = newNote.content;
      } else {
        state.notes.push(newNote);
      }
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice;
