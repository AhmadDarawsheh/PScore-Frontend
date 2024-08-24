import axios from "axios";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useState } from "react";

export default function Reservations() {
  const { token } = useAuth();
  const [matches, setMaches] = useState([]);
  const [plname, setPlname] = useState();
  useEffect(() => {
    const getMatches = async () => {
      try {
        const response = await axios.get(
          `https://pscore-backend.vercel.app/match/getemptymatchbyownerpending`,
          {
            headers: {
              authorization: `Ahmad__${token}`,
            },
          }
        );
        if (response.data) {
          setMaches(response.data?.matchDetails || []);
          setPlname(response.data?.plname);
          console.log(response.data);
        } else {
          console.log("Table data not available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors
      }
    };

    getMatches();
  }, []);
  return (
    <div class="relative overflow-x-auto">
      <p className="text-center">{plname}</p>
      <table class="w-[600px] m-auto mt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-green-700 dark:bg-green-800">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Manager
            </th>
            <th scope="col" className="px-6 py-3">
              number
            </th>
            <th scope="col" className="px-6 py-3">
              Start Time
            </th>
            <th scope="col" className="px-6 py-3">
              End Time
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              delete
            </th>
          </tr>
        </thead>
        <tbody>
          {matches.length > 0 &&
            matches
              .slice()
              .reverse()
              .map((item, index) => (
                <tr
                  key={index}
                  className="bg-green-600 border-b dark:bg-green-700 dark:border-green-500 hover:bg-green-500"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                  >
                    {item.match.date}
                  </th>
                  <td className="px-6 py-4 text-white">
                    {item.managerProfile.userName}
                  </td>
                  <td className="px-6 py-4 text-white">
                    {item.managerProfile.number}
                  </td>
                  <td className="px-6 py-4 text-white">
                    {item.match.startTime}
                  </td>
                  <td className="px-6 py-4 text-white">{item.match.endTime}</td>
                  <td className="px-6 py-4 text-white">{item.match.status}</td>

                  <td className="px-6 py-4">
                    <button className="bg-red-600 text-white hover:text-red-600 hover:bg-white border border-red-500 transition-all">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
