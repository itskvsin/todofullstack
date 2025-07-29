import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen w-full flex flex-col justify-center gap-12 items-center ">
      <div className="heading text-3xl">Login</div>
      <div className="w-1/4">
        <form action="#" method="post" className="flex flex-col">
          <input
            className="border-1 m-2 outline-none px-5 py-3 text-lg rounded border-gray-400"
            type="text"
            name="email"
            id="email"
            placeholder="Enter your Email: "
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="border-1 m-2 outline-none px-5 py-3 text-lg rounded border-gray-400"
            type="text"
            name="password"
            id="password"
            placeholder="Enter your Password: "
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="border-1 mt-6 bg-blue-600 text-black font-semibold text-lg px-5 cursor-pointer py-3 rounded"
              onClick={(e) => {
                e.preventDefault();
                console.log(email, password);
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
