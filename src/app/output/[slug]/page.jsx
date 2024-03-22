'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link';
import dontenv from 'dotenv';
dontenv.config();

const page = ({ params }) => {

  const id = params.slug;
  const [data, setData] = useState([]);
  const [output, setOutput] = useState([]);
  const [error, setError] = useState('');
  const languageIds = {
    "c++": 54,
    "java": 91,
    "javaScript": 93,
    "python": 92
  };

  const getLanguageId = (language) => {
    return languageIds[language] || null;
  };

  useEffect(() => {
    console.log(process.env.rapid_api_key);
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:4000/output/${id}`); // Make GET request to backend API
        setData(response.data); // Set fetched data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(id);
  }, []);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    // Format the date to display date and time in a desired format
    const options = { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    // Return the formatted date string
    return formattedDate;
  };

  const options1 = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    setTimeout: 1000,
    params: {
      base64_encoded: 'true',
      fields: '*'
    },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.rapid_api_key,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: {
      language_id: getLanguageId(data.language),
      source_code: btoa(data.code),
      stdin: btoa(data.stdin)
    }
  };

  const handlesendcode = async () => {
    try {
      const response = await axios.request(options1);
      const token = response.data.token;
      console.log(token);
      handleShowOutput(token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowOutput = async (token) => {
    try {
      const options2 = {
        method: 'GET',
        url: `https://ce.judge0.com/submissions/${token}`,
        params: {
          base64_encoded: 'true',
          fields: 'stdout'

        },
        headers: {
          'X-RapidAPI-Key': process.env.rapid_api_key,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      };
      const response = await axios.request(options2);
      setOutput(atob(response.data.stdout));
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <>
      <nav className='flex flex-row  bg-slate-400'>
        <Link href="/records">
          <button className='p-5 bg-slate-500 m-5 rounded-xl	border-2 self-start'>
            <h1>BACK</h1>

          </button>
        </Link>

      </nav>
      <div className="flex items-start p-5 m-5 max-h-100" >
        {/* Left side */}
        <div className="flex flex-col mr-5 min max-h-80 justify-between w-3/12">
          <div className="mb-2">
            <span className="font-bold text-gray-700">entry ID:</span> {data.id}
          </div>
          <div className="mb-2">
            <span className="font-bold text-gray-700">Username:</span> {data.username}
          </div>
          <div className="mb-2">
            <span className="font-bold text-gray-700">Language:</span> {data.language}
          </div>
          <div className="bg-gray-100 p-4 rounded-md flex-1">
            <pre className="whitespace-pre-wrap overflow-auto max-h-20">
              {data.stdin}
            </pre>
          </div>
          <div className='justify-self-end mt-4'>
            <span className="font-bold text-gray-700">Created At:</span>
            <h6 className='italic text-xs'>{formatCreatedAt(data.createdAt)}</h6>
          </div>
        </div>

        {/* Right side */}
        <div className='flex flex-col w-9/12'>
          <div className="bg-blue-100  p-4 rounded-md flex-1">
            <pre className="whitespace-pre-wrap overflow-auto max-h-80 max-">
              {data.code}
            </pre>
          </div>
          <div className='self-end py-2'>
            <div>
              <button onClick={handlesendcode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                show output
              </button>
              
              {output && (
                <div className="mt-4">
                  <div className="bg-blue-100  p-4 rounded-md flex-1">
                    <pre className="whitespace-pre-wrap overflow-auto max-h-80 max-">
                      {output}
                    </pre>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  )

}

export default page