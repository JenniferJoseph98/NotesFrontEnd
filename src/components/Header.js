import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaFileExport } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

function Header() {
  const [data, setData] = useState([]);

  const generatePDF = () => {
    let val = data;
    let pdfcontent = "";
    for (let i = 0; i < data.length; i++) {
      pdfcontent += JSON.stringify(val[i]);
    }
    const doc = new jsPDF();
    console.log(pdfcontent);
    const splitText = doc.splitTextToSize(pdfcontent, 180);
    doc.text(splitText, 15, 15);
    doc.save("document.pdf");
  };

  const email = localStorage.getItem("email");

  function deleteAll() {
    axios
      .delete(`http://localhost:8000/api/notes/deleteall/${email}`)
      .then((res) => {
        alert("Deleted All");
        alert("Refresh and see");
        navigate("/home");
      })
      .catch((error) => console.log(error));
  }
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://notes-backend-five.vercel.app/api/notes/${email}`)
      .then((res) => setData(res.data.notes))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ fontSize: "1.3rem" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <button
                onClick={() => navigate("/home")}
                type="button"
                className="btn btn-info"
              >
                <AiFillHome /> Home
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                onClick={() => navigate("/add")}
                className="btn btn-info"
              >
                <IoMdAddCircle /> Add Notes
              </button>
            </li>
            <li onClick={() => deleteAll()} className="nav-item">
              <button type="button" className="btn btn-info">
                <RiDeleteBinFill />
                Delete All
              </button>
            </li>
            <li className="nav-item" onClick={generatePDF}>
              <button type="button" className="btn btn-info">
                <FaFileExport /> Export
              </button>
            </li>
          </ul>
          <span className="navbar-text">
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              type="button"
              className="btn btn-info"
            >
              Logout
            </button>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Header;
