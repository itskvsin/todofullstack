import { useState } from "react";
import BottomWarning from "../components/BottomWarning";

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
      <div className="h-screen w-full flex flex-col justify-evenly items-center ">
      <div className="heading text-3xl">
        Register
      </div>
        <div className="w-1/4">
          <form action="#" method="post" className="flex flex-col">
            <input
              className="border-1 m-2 outline-none px-5 py-3 text-lg rounded-lg border-gray-400"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username: "
              value={username}
              onChange={(e) => {setUsername(e.target.value)}}
            />
            <input
              className="border-1 m-2 outline-none px-5 py-3 text-lg rounded-lg border-gray-400"
              type="text"
              name="email"
              id="email"
              placeholder="Enter your Email: "
              onChange={(e) => {setEmail(e.target.value)}}
            />
            <input
              className="border-1 m-2 outline-none px-5 py-3 text-lg rounded-lg border-gray-400"
              type="text"
              name="password"
              id="password"
              placeholder="Enter your Password: "
              onChange={(e) => {setPassword(e.target.value)}}
            />
            <input
              className="text-blue-600 outline-none my-2 px-5 py-3 text-lg rounded-lg cursor-pointer"
              type="file"
              name="avatar"
              id="avatar"
            />
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="border-1 bg-blue-600 text-white font-semibold text-lg px-5 cursor-pointer py-3 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(username,email,password)
                }}
              >Register</button>
            </div>
            <BottomWarning label={"Already Have An Account"} to={"/signin"} buttonText={"Sign In"}/>
          </form>
        </div>
      </div>
  );
};

export default Register;


// import React, { useState } from 'react';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files);
//   };

//   const handleUpload = () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     // Send the file to the server using fetch or axios
//     fetch('https://your-server.com/upload', {
//       method: 'POST',
//       body: formData,
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default FileUpload;   