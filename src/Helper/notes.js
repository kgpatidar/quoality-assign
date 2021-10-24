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

/**
 * Add new Note
 */
const addNewNote = (data) => {
  let notes = getAllNotes();
  notes = [...notes, data];
  return updateNotesInLS(notes);
};

/**
 * Delete Note
 */
const deleteNote = (notes, uuid) => {
  let updateNotes = notes.filter(({ id }) => id !== uuid);
  updateNotesInLS(updateNotes);
  return updateNotes;
};

/**
 * Get Note by Id;
 */
const getNoteByUuid = (notes, uuid) => {
  let index = notes.indexOf(({ id }) => id === uuid);
  return notes[index];
};

/**
 * Edit Note
 */
const editNotes = (notes, data) => {
  const { id: uuid } = data;
  const index = notes.indexOf(({ id }) => id === uuid);
  notes[index] = data;
  updateNotesInLS(notes);
  return notes;
};

/**
 * Clear all Notes
 */
const clearAllNotes = () => {
  return updateNotesInLS([]);
};

export {
  getAllNotes,
  updateNotesInLS,
  addNewNote,
  deleteNote,
  getNoteByUuid,
  editNotes,
  clearAllNotes,
};
