import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

function News() {
  const [news, setNews] = useState(null);
  const { token } = useAuth();
  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axios.get(
          "https://pscore-backend.vercel.app/news",
          {
            headers: {
              authorization: `Ahmad__${token}`,
            },
          }
        );

        console.log("Response:", response.data);
        setNews(response?.data?.news);
        //   setMessage("Playground Created");
      } catch (error) {
        console.error("error:", error);
      }
    };
    getNews();
  }, []);

  return (
    <div class="relative overflow-x-auto">
      <table class="w-[600px] m-auto mt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-green-700 dark:bg-green-800">
          <tr>
            <th scope="col" className="px-6 py-3">
              title
            </th>
            <th scope="col" className="px-6 py-3">
              desc
            </th>
            <th scope="col" className="px-6 py-3">
              date
            </th>
            <th scope="col" className="px-6 py-3">
              deleate
            </th>
          </tr>
        </thead>
        <tbody>
          {news.length > 0 &&
            news.map((item, index) => (
              <tr
                key={index}
                className="bg-green-600 border-b dark:bg-green-700 dark:border-green-500 hover:bg-green-500"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                >
                  {item.title}
                </th>
                <td className="px-6 py-4 text-white">{item.desc}</td>
                <td className="px-6 py-4 text-white">{item.date}</td>
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

export default News;
