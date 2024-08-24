import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

function Matches() {
  const { token } = useAuth();
  const [matches, setMatches] = useState([]);
  const [plname, setPlname] = useState("");

  useEffect(() => {
    const getMatches = async () => {
      try {
        const response = await axios.get(
          `https://pscore-backend.vercel.app/match/getemptymatchbyowner`,
          {
            headers: {
              authorization: `Ahmad__${token}`,
            },
          }
        );
        if (response.data) {
          setMatches(response.data.match || []); // Ensure matches is always an array
          setPlname(response.data.plname || ""); // Set plname or default to an empty string
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
  }, [token]);

  return (
    <div className="relative overflow-x-auto">
      <p className="text-center">{plname}</p>
      <table className="w-[600px] m-auto mt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-green-700 dark:bg-green-800">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
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
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {matches.length > 0 ? (
            matches
              .slice()
              .reverse()
              .map((match, index) => (
                <tr
                  key={index}
                  className="bg-green-600 border-b dark:bg-green-700 dark:border-green-500 hover:bg-green-500"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                  >
                    {match.date}
                  </th>
                  <td className="px-6 py-4 text-white">{match.startTime}</td>
                  <td className="px-6 py-4 text-white">{match.endTime}</td>
                  <td className="px-6 py-4 text-white">{match.status}</td>
                  <td className="px-6 py-4">
                    <button className="bg-red-600 text-white hover:text-red-600 hover:bg-white border border-red-500 transition-all">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-white">
                No matches found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Matches;
