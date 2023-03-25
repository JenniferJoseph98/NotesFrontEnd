import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineSubtitles } from "react-icons/md";
function AddNotes() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  function saveNote() {
    axios
      .post("https://notes-backend-five.vercel.app/api/notes/", {
        title: data.title,
        description: data.description,
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        alert("Saved");
        navigate("/home");
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: "25px" }}>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              <MdOutlineSubtitles />
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Enter Title"
            aria-label="Title"
            aria-describedby="basic-addon1"
          />
        </div>
        <div class="input-group mb-3" style={{ width: "100%" }}>
          <textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            style={{ width: "100%", height: "350px" }}
          ></textarea>
        </div>
        <button
          onClick={() => saveNote()}
          type="button"
          class="btn btn-secondary btn-lg btn-block"
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddNotes;
