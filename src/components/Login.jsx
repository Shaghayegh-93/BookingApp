import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    
  };
  return (
    <div className="my-8 mx-auto max-w-sm border border-tex300 p-4 rounded-2xl">
      <h2 className="mb-4 font-bold text-xl">Login</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="border border-tex400  p-2 rounded-lg w-full"
            type="text"
            value={email}
            onClick={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="border border-tex400  p-2 rounded-lg w-full"
            type="text"
            value={password}
            onClick={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className=" mt-8">
          <button className="w-full py-2 px-4 rounded-lg border bg-primar600 text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
