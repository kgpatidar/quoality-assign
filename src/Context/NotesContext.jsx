import * as React from "react";

const NOTE_KEY = "notes";

/**
 * @returns All Notes from Local Storage
 */
const getAllNotes = () => {
  const notes = window.localStorage.getItem(NOTE_KEY);
  if (!notes) return [];
  return JSON.parse(notes);
};

/**
 * Update local storage with notes
 */
const updateNotesInLS = (data) => {
  if (!data) return false;
  window.localStorage.setItem(NOTE_KEY, JSON.stringify(data));
  return true;
};

const NotesContext = React.createContext();
const NotesReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      state = { ...state, ...action.payload };
      break;
    default:
      state = state;
  }
  return state;
};

function NotesProvider({ children }) {
  const [state, dispatch] = React.useReducer(NotesReducer, {
    notes: [],
  });
  const value = { state, dispatch };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

const updateContext = (context, notes) => {
  context.dispatch({
    type: "SET_DATA",
    payload: {
      notes,
    },
  });
};

const useNotes = () => {
  const context = React.useContext(NotesContext);
  React.useEffect(async () => {
    const notes = await getAllNotes();
    context.dispatch({
      type: "SET_DATA",
      payload: {
        notes,
      },
    });
  }, []);
  if (!context) return [];

  let notes = context.state.notes;

  /**Dispatch Changes */
  const dispatchChange = (notes) => {
    context.dispatch({
      type: "SET_DATA",
      payload: {
        notes,
      },
    });
    updateNotesInLS(notes);
  };

  /**Adding New Note */
  const addNewNote = (data) => {
    notes = [...notes, data];
    dispatchChange(notes);
  };

  /**Edit Note */
  const editNotes = (data) => {
    const { id: uuid } = data;
    notes = notes.map((note) => {
      if (uuid === note.id) {
        return data;
      }
      return note;
    });
    console.log("###", notes);
    dispatchChange(notes);
  };

  /**Delete Note */
  const deleteNote = (uuid) => {
    notes = notes.filter(({ id }) => id !== uuid);
    dispatchChange(notes);
  };

  return { notes, addNewNote, deleteNote, editNotes };
};

export { NotesProvider, useNotes };
