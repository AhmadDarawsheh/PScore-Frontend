import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function PlayGrounds() {
  const { type, token } = useAuth();
  const [data, setData] = useState({});
  useEffect(() => {
    const getMatches = async () => {
      try {
        const response = await axios.get(
          `https://pscore-backend.vercel.app/playground/admin`,
          {
            headers: {
              authorization: `Ahmad__${token}`,
            },
          }
        );
        if (response.data) {
          console.log(response.data);
          setData(response.data);
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
    <>
      {type == "admin" ? (
        <div class="relative overflow-x-auto">
          <table class="w-[600px] m-auto mt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-green-700 dark:bg-green-800">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  email
                </th>
                <th scope="col" className="px-6 py-3">
                  number
                </th>
                <th scope="col" className="px-6 py-3">
                  userName
                </th>

                <th scope="col" className="px-6 py-3">
                  delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-green-600 border-b dark:bg-green-700 dark:border-green-500 hover:bg-green-500"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4 text-white">{item.owner.email}</td>
                    <td className="px-6 py-4 text-white">0599975427</td>
                    <td className="px-6 py-4 text-white">
                      {item.owner.userName}
                    </td>
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
      ) : null}
    </>
  );
}

export default PlayGrounds;
