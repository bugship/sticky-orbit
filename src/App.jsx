/**
 * App root — wraps the notes board in NoteContext so all children share note state.
 */
import NotesProvider from "./context/NoteContext";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <div id="app">
      <NotesProvider>
        <NotesPage />
      </NotesProvider>
    </div>
  );
}

export default App;
