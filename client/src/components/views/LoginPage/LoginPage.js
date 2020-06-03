import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_action/user_action";

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ email: "", password: "" });
  // const [password, setPassword] = useState('')
  const { email, password } = inputs;
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {
      email,
      password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
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
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChangeHandler}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
