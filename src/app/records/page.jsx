'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [output, setOutput] = useState('');

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    // Format the date to display date and time in a desired format
    const options = { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    // Return the formatted date string
    return formattedDate;
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getrecord`); // Make GET request to backend API
        setData(response.data); // Set fetched data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // const handleClick = async () => {
  //   try {
  //     // Your logic to prepare the data for the API request
  //     const requestData = {

  //     };

  //     // Send a POST request to the API endpoint
  //     const response = await axios.post('your-api-endpoint', requestData);

  //     // Update the state with the response data
  //     setOutput(response.data);
  //     setError('');
  //   } catch (error) {
  //     // Handle any errors that occur during the API request
  //     console.error('Error fetching data:', error);
  //     setError('An error occurred. Please try again.');
  //     setOutput('');
  //   }
  // }
  return (

    <>
      <div>
        <nav className='flex flex-row  bg-slate-400'>
        <Link href="/">
        <button className='p-5 bg-slate-500 m-5 rounded-xl	border-2 self-start'>
            <h1>NEW</h1>
          
        </button>
        </Link>
          
        </nav>
        {data.map(data => (
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
              <div className="bg-blue-100 p-4 rounded-md flex-1">
                <pre className="whitespace-pre-wrap overflow-auto max-h-80 max-">
                  {data.code}
                </pre>
              </div>
              <div className='self-end py-2'>
                <div>
                  <button onClick={() => router.push(`/output/${data.id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    InDetail
                  </button>

                </div>
              </div>
            </div>
          </div>


        ))}

      </div>
    </>
  )
}

export default page