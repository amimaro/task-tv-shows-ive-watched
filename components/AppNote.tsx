import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { selectIsAuth } from "../store/auth-slice";
import { noteActions } from "../store/note-slice";
import { AppButton } from "./AppButton";
import AppTitle from "./AppTitle";

type AppNoteProps = {
  mediaId: number;
};

export default function AppNote({ mediaId }: AppNoteProps) {
  const isAuth = useSelector(selectIsAuth);
  const [noteContent, setNoteContent] = useState("");

  const dispatch = useDispatch();

  const note = useSelector((state: AppState) => {
    const noteFound = state.note.notes.find(
      (note) => note.media_id === mediaId
    );
    return noteFound;
  });

  // Sync notes
  useEffect(() => {
    setNoteContent(note?.content || "");
  }, [note]);

  const handleSumbitNote = () => {
    dispatch(
      noteActions.addNote({
        media_id: mediaId,
        content: noteContent,
      })
    );
    alert("Note added!");
  };

  const handleRemoveNote = () => {
    dispatch(
      noteActions.removeNote({
        media_id: mediaId,
        content: "",
      })
    );
    alert("Note removed!");
  };

  if (!isAuth) return null;

  return (
    <div className="pt-10 flex flex-col items-center gap-2">
      <AppTitle>Add Note</AppTitle>
      <textarea
        className="border-2 w-full p-2 focus:ring-4 rounded-md bg-transparent ring-teal-700 outline-teal-700"
        rows={5}
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <div className="flex items-center gap-4">
        <AppButton onClick={handleSumbitNote}>Submit Note</AppButton>
        <AppButton onClick={handleRemoveNote} className="bg-red-500">
          Remove Note
        </AppButton>
      </div>
    </div>
  );
}
