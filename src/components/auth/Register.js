import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [sigupDetails, setSignDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [terms, setTerms] = useState(false);
  function handleCheckbox() {
    setTerms(!terms);
  }
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [confrimshowPass, setConfrimShowPass] = useState(false);
  function passwordChange(id) {
    var x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    if (id === "pass") setShowPass(!showPass);
    else setConfrimShowPass(!confrimshowPass);
  }
  async function onSubmit() {
    const { email, password } = sigupDetails;
    // console.log(data);
    if (terms) {
      axios
        .post("https://notes-backend-five.vercel.app/api/users/signup", {
          email: email,
          password: password,
        })
        .then((res) => {
          alert("Resigter SuccessFully");
          navigate("/");
        })
        .catch((err) => alert("Email already exist"));
    } else {
      alert("Kindly Check the terms and conditions");
    }
  }
  return (
    <div>
      <div className="formdiv">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container formtag"
          style={{ width: "400px", maxWidth: "80%", maxHeight: "70%" }}
        >
          <h6 style={{ marginTop: "10px" }}>Register</h6>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{ width: "60px", maxWidth: "40px" }}
                id="basic-addon1"
              >
                <MdEmail />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Email"
              {...register("email", {
                required: "Please Enter Your Email!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please Enter A Valid Email!",
                },
              })}
              onChange={(e) =>
                setSignDetails({ ...sigupDetails, email: e.target.value })
              }
              value={sigupDetails.email}
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.email && (
            <span className="error">* {errors.email.message}</span>
          )}

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{ width: "60px", maxWidth: "40px" }}
                id="basic-addon1"
              >
                <RiLockPasswordFill />
              </span>
            </div>
            <input
              type="password"
              id="pass"
              className="form-control"
              {...register("password", {
                required: "Please Enter Your Password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long!",
                },
              })}
              onChange={(e) =>
                setSignDetails({ ...sigupDetails, password: e.target.value })
              }
              value={sigupDetails.password}
              placeholder="Enter Password"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />

            <span
              onClick={() => passwordChange("pass")}
              className="input-group-text"
              style={{ width: "60px", maxWidth: "40px" }}
              id="basic-addon1"
            >
              {showPass ? <AiOutlineEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          {errors.password && (
            <span className="error">* {errors.password.message}</span>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{ width: "60px", maxWidth: "40px" }}
                id="basic-addon1"
              >
                <RiLockPasswordFill />
              </span>
            </div>
            <input
              type="password"
              id="confrimpass"
              className="form-control"
              placeholder="Confirm Password"
              aria-label="Email"
              {...register("confirmPassword", {
                required: "Please Confirm Your Password",
                validate: (match) => {
                  const password = getValues("password");
                  return match === password || "Passwords should match!";
                },
              })}
              onChange={(e) =>
                setSignDetails({
                  ...sigupDetails,
                  confirmPassword: e.target.value,
                })
              }
              value={sigupDetails.confirmPassword}
              aria-describedby="basic-addon1"
            />
            <span
              onClick={() => passwordChange("confrimpass")}
              className="input-group-text"
              style={{ width: "60px", maxWidth: "40px" }}
              id="basic-addon1"
            >
              {confrimshowPass ? <AiOutlineEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <span className="error">* {errors.confirmPassword.message}</span>
          )}
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              onChange={() => handleCheckbox()}
              id="customCheck1"
              required
            />
            <label class="custom-control-label" for="customCheck1">
              Agree Terms and Conditions
            </label>
          </div>
          <button type="submit" className="btn custom-btn" id="form-submit">
            Submit
          </button>
          <span className="linkform">
            <Link to="/">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Register;
