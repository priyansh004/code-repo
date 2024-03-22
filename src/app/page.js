"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import dotenv from "dotenv";
import axios from "axios";
// Configure dotenv to load .env file
dotenv.config();

const Home = () => {
  const [username, setUsername] = useState("");
  const [stdin, setStdin] = useState("");
  const [language, setSelectedLanguage] = useState("");
  const [code, setCode] = useState("");

  // const handleLanguageChange = (event) => {
  //   set1SelectedLanguage(event.target.value);
  // };

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  };
  const handleLanChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const handleSTDChange = (event) => {
    setStdin(event.target.value);
  };
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };
  const erase = () => {
    setUsername("");
      setSelectedLanguage("");
      setStdin("");
      setCode("");}
  const Submithandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4000/addrecord`, {
        username,
        language,
        stdin,
        code,
      });
      e.target.reset(); // Reset the form

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <nav className="flex flex-row justify-end bg-slate-400	">
        <Link href="/records">
          <button className="p-5 bg-slate-500 m-5 rounded-xl	border-2 ">
            <h1>RECORDS</h1>
          </button>
        </Link>
      </nav>
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={Submithandler}
          className="flex flex-col items-start justify-center"
        >
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className="border-2 border-gray-300 rounded-md p-2 m-2 w-80 focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out hover:border-blue-500 hover:shadow-lg"
              type="text"
              id="username"
              value={username}
              onChange={handleUserChange}
            />
          </div>
          <div className="flex flex-row items-center">
            <h2 className="">Language:</h2>
            <select
              className=" my-2 mx-3 border-2 border-gray-300 rounded-md p-2  w-80 focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out hover:border-blue-500 hover:shadow-lg"
              value={language}
              onChange={handleLanChange}
            >
              <option value="c++">C++</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
            {language && (
              <div>
                <h3>You have selected: {language}</h3>
              </div>
            )}
          </div>
          {/* <div>
            <label htmlFor="language">Language:</label>
            <select
              id="language"
              className='border-2 border-gray-300 rounded-md p-2 my-2 mx-3 w-30 focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out hover:border-blue-500 hover:shadow-lg'
              value={Language} // Set the value of select element to selectedLanguage
              onChange={handleLanguageChange}>
              <option value="c++">C++</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
            {selectedLanguage && (
              <div>
                <h3>You have selected: {selectedLanguage}</h3>
              </div>
            )}
          </div> */}
          <div className="flex flex-row items-center">
            <label htmlFor="stdin mr-2.5">STDIN:</label>
            <textarea
              className=" my-2 mx-10 border-2 border-gray-300 rounded-md p-2  w-80 focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out hover:border-blue-500 hover:shadow-lg"
              style={{ width: "300px", height: "100px", resize: "vertical" }}
              placeholder="enter input:"
              value={stdin}
              onChange={handleSTDChange}
            ></textarea>
            
          </div>
          <div className="flex flex-row ">
            <label className="py-4">code input:</label>
            <textarea
              className="border-2 border-gray-300 rounded-md p-2 my-2 mx-2 w-80 focus:outline-none focus:border-blue-500 transition duration-500 ease-in-out hover:border-blue-500 hover:shadow-lg"
              style={{ width: "700px", height: "300px", resize: "vertical" }}
              placeholder="write your code here..."
              value={code}
              onChange={handleCodeChange}
            ></textarea>
          </div>

          <button
           onClick={erase}
            type="submit"
            className="p-10 self-end	bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
