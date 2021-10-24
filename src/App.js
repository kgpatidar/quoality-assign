import React from "react";
import { useNotes } from "./Context/NotesContext";
import { editNotes } from "./Helper/notes";
import Search from "./search.svg";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex items-center w-full p-3 border-b border-black">
      <img src={Search} />
      &nbsp;&nbsp;
      <input
        value={value}
        onChange={onChange}
        placeholder={"Seach title"}
        className="outline-none text-black border-0"
      />
    </div>
  );
};

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const SingleNote = ({ note, onClick }) => {
  const date = new Date(note.createdAt).toLocaleDateString();
  const time = formatAMPM(new Date(note.createdAt));
  return (
    <div
      key={note.id}
      className="bg-blue-50 shadow-lg border border-gray-200 p-3 m-2 cursor-pointer"
      onClick={() => onClick(note)}
    >
      <div className="flex justify-between">
        <h1 className="text-xl font-bold font-mono text-blue-400">
          {note.title}
        </h1>
        <h3 className="text-blue-900">{note.category}</h3>
      </div>

      <small>{date}</small>
    </div>
  );
};

const NotesList = ({ notes = [], search, onClick }) => {
  const filtredNotes = notes.filter(({ title }) => {
    if (search.length == 0) return true;
    return title.toLowerCase().includes(search.toLowerCase());
  });
  if (filtredNotes.length == 0) {
    return (
      <div className="text-center p-4 bg-blue-50 m-2">
        <p>No Data</p>
      </div>
    );
  }
  return (
    <div className="overflow-y-scroll">
      {filtredNotes.map((note) => (
        <SingleNote note={note} onClick={onClick} />
      ))}
    </div>
  );
};

const AddNewNote = ({ current, data, onClick }) => {
  const { addNewNote } = useNotes();

  const [title, setTitle] = React.useState(current.toEdit ? data.title : "");
  const [desc, setDesc] = React.useState(current.toEdit ? data.desc : "");
  const [category, setCategory] = React.useState(
    current.toEdit ? data.category : "General"
  );

  const handleAdd = () => {
    if (title.length == 0) {
      alert("Title can not be empty");
      return;
    }

    const newData = {
      id: new Date().getTime(),
      title,
      desc,
      category,
      createdAt: new Date(),
    };

    addNewNote(newData);

    setTitle("");
    setDesc("");
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-white flex flex-col shadow-xl p-3 rounded-lg w-96">
        <input
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none border-0 border rounded-lg border-black p-2 font-mono"
        />
        <br />
        <textarea
          value={desc}
          placeholder="Enter Desc"
          onChange={(e) => setDesc(e.target.value)}
          className="outline-none border-0 border rounded-lg border-black p-2 font-mono"
        />
        <br />
        <select
          defaultValue="General"
          onChange={(e) => setCategory(e.target.value)}
          className="outline-none border-0 border rounded-lg border-black p-2 font-mono"
        >
          <option value="General">General</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
        <br />
        <button
          onClick={handleAdd}
          className="bg-blue-400 text-white font-mono rounded p-1"
        >
          Add
        </button>
      </div>
    </div>
  );
};

/**EDIT NOTES */
const EditNote = ({ data, onClick }) => {
  const { editNotes } = useNotes();

  const [title, setTitle] = React.useState(data.title);
  const [desc, setDesc] = React.useState(data.desc);
  const [category, setCategory] = React.useState(data.category);

  const handleAdd = () => {
    if (title.length == 0) {
      alert("Title can not be empty");
      return;
    }

    const newData = {
      id: data.id,
      title,
      desc,
      category,
      createdAt: data.createdAt,
    };

    editNotes(newData);
    onClick(null);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-white flex flex-col shadow-xl p-3 rounded-lg w-96">
        <input
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none border-0 border rounded-lg border-black p-2 font-mono"
        />
        <br />
        <textarea
          value={desc}
          placeholder="Enter Desc"
          onChange={(e) => setDesc(e.target.value)}
          className="outline-none border-0 border rounded-lg border-black p-2 font-mono"
        />
        <br />
        <select
          defaultValue="General"
          onChange={(e) => setCategory(e.target.value)}
          className="outline-none border-0 border rounded-lg border-black p-2 font-mono"
        >
          <option value="General">General</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
        <br />
        <button
          onClick={handleAdd}
          className="bg-blue-400 text-white font-mono rounded p-1"
        >
          Edit
        </button>
        <button
          onClick={() => onClick("cancel")}
          className="border-blue-400 text-blue-40 font-mono rounded p-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

/**VIEW NOTES */
const ViewNote = ({ current, onClick }) => {
  const { id, title, category, desc, createdAt } = current;
  const date = new Date(createdAt).toLocaleDateString();
  const time = formatAMPM(new Date(createdAt));
  const { deleteNote } = useNotes();

  const handleDelete = () => {
    deleteNote(id);
    onClick(null);
  };

  return (
    <div className="p-4 m-4 mt-16 bg-white shadow-2xl rounded-lg">
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">{title}</h1>
        <h3 className="font-bold text-blue-400">{category}</h3>
      </div>
      <div className="py-3">
        <p className="font-mono">{desc}</p>
      </div>
      <small className="flex font-mono">
        Created At&nbsp;<p className="font-bold">{date}</p>&nbsp;on&nbsp;
        <p className="font-bold">{time}</p>
      </small>

      <div className="flex">
        <button
          className="outline-none border-0 text-blue-400"
          onClick={() => onClick("edit")}
        >
          Edit
        </button>
        &nbsp;&nbsp;
        <button
          className="outline-none border-0 text-red-400"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

/**Parent Component */
function App() {
  const [searchText, setSearchText] = React.useState("");
  const { notes } = useNotes();
  const [current, setCurrent] = React.useState(null);
  const [edit, setEdit] = React.useState(false);
  return (
    <div className="w-screen h-screen bg-blue-50">
      <head className="bg-black text-white h-1/5 flex items-center justify-center">
        <h1 className="font-mono font-extrabold text-5xl">Notes</h1>
      </head>
      <div
        onClick={() => {
          setEdit(false);
          setCurrent("new");
        }}
        className="cursor-pointer absolute right-10 shadow-2xl top-24 text-4xl font-mono bg-white text-black w-16 h-16 flex items-center justify-center rounded-full font-extrabold hover:bg-blue-500 hover:text-white"
      >
        +
      </div>

      <div className="flex h-4/5 p-2 rounded-lg shadow-lg">
        <div className="bg-white shadow flex flex-col w-96 h-full min-w-max">
          <SearchBar
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <NotesList
            notes={notes}
            search={searchText}
            onClick={(data) => {
              setEdit(false);
              setCurrent(data);
            }}
          />
        </div>
        <div className="flex-grow">
          {!current ? (
            <div className="flex justify-center items-center h-full font-bold text-xl font-mono ">
              Click to View or Add New
            </div>
          ) : edit ? (
            <EditNote
              data={current}
              onClick={(val) => {
                if (val === "cancel") {
                  setEdit(false);
                }
                setCurrent(null);
              }}
            />
          ) : current === "new" ? (
            <AddNewNote current={current} />
          ) : (
            <ViewNote
              current={current}
              onClick={(val) => {
                setEdit(true);
                if (val === null) {
                  setCurrent(null);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
