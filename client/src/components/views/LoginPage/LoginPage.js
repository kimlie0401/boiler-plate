import React, { useState } from "react";

const LoginPage = () => {
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
