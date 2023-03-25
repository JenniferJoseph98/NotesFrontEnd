import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddNotes from "./components/AddNotes";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Details from "./components/Details";
import Home from "./components/Home";
import Protected from "./components/Protected";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/view"
          element={
            <Protected>
              <Details />
            </Protected>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add"
          element={
            <Protected>
              <AddNotes />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
