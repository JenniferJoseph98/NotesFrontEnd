import { useLocation } from "react-router-dom";
import Header from "./Header";
import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineSubtitles } from "react-icons/md";
function Details() {
  const location = useLocation();
  const navigate = useNavigate();

  const fullData = location.state;
  const [data, setData] = useState({
    title: fullData.title,
    description: fullData.description,
  });
  function deleteNote() {
    axios
      .delete(
        `https://notes-backend-five.vercel.app/api/notes/delete/${fullData._id}`
      )
      .then((res) => {
        alert("Deleted");
        navigate("/home");
      })
      .catch((error) => alert("Unable to deleted"));
  }
  function updateNote() {
    axios
      .put(
        `https://notes-backend-five.vercel.app/api/notes/update/${fullData._id}`,
        {
          title: data.title,
          description: data.description,
        }
      )
      .then((res) => {
        alert("Updated");
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
          onClick={() => updateNote()}
          type="button"
          class="btn btn-secondary btn-lg btn-block"
        >
          Update
        </button>
        <button
          onClick={() => deleteNote()}
          type="button"
          class="btn btn-secondary btn-lg btn-block"
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default Details;
