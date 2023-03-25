import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./home.css";
import { FcSearch } from "react-icons/fc";
import { GiTimeBomb } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState({
    title: "",
    description: "",
    date: "",
  });
  function ClearAll() {
    console.log("Cleared");
    setFlag(false);
    setSearch("");
    setSearchData({ ...searchData, title: "", description: "", date: "" });
    console.log();
  }
  useEffect(() => {
    axios
      .get(`https://notes-backend-five.vercel.app/api/notes/${email}`)
      .then((res) => setData(res.data.notes))
      .catch((error) => console.log(error));
  }, [flag, search, searchData, email]);
  function searchList() {
    if (search.length !== 0) {
      setFlag(true);
      const searchDetails = data.filter((e) => {
        return e.title.includes(search);
      });
      console.log(searchDetails);
      if (searchDetails.length !== 0) {
        setSearchData({
          ...searchData,
          title: searchDetails[0].title,
          description: searchDetails[0].description,
          date: searchDetails[0].date,
        });
      }
      setSearch("");
    } else {
      alert("Kindy enter something");
    }
  }
  return (
    <>
      {" "}
      <Header />
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          className="input-group mb-3"
          style={{ marginTop: "15px", width: "100%", height: "35px" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="search"
            aria-label="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            aria-describedby="basic-addon2"
          />
          <div onClick={() => searchList()} className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              <FcSearch />
            </span>
          </div>
        </div>
      </div>
      {!flag ? (
        <>
          <div className="datadiv">
            {data.map((details) => {
              return (
                <div
                  className="detailsdivtag"
                  onClick={() => {
                    navigate("/view", { state: details });
                  }}
                >
                  <p>
                    <span>
                      <GiTimeBomb />{" "}
                    </span>
                    {details.date}
                  </p>
                  <h3>{details.title}</h3>
                  <div>{details.description}</div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <button
            style={{ marginTop: "10px" }}
            type="button"
            onClick={() => ClearAll()}
            className="btn btn-info"
          >
            Clear
          </button>
          <div className="datadiv">
            <div className="detailsdivtag">
              <p>
                <span>
                  <GiTimeBomb />{" "}
                </span>
                {searchData.date}
              </p>
              <h3>{searchData.title}</h3>
              <div>{searchData.description}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
