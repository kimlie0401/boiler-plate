import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_action/user_action";
import { withRouter } from "react-router-dom";
function RegisterPage(props) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const { email, name, password, confirmPassword } = inputs;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert("Password and Confirm Password should be same!");
    }

    let body = {
      email,
      password,
      name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChangeHandler}
        />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChangeHandler}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChangeHandler}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeHandler}
        />

        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
