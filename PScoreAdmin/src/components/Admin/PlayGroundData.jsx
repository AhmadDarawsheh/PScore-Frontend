import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import axios from "axios";

function PlayGroundData() {
  const { token } = useAuth();
  const addPlayGround = async () => {
    try {
      const response = await axios.get(
        "https://pscore-backend.vercel.app/playground",
        {
          headers: {
            authorization: `Ahmad__${token}`,
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("error:", error);
    }
  };
  useEffect(() => {
    addPlayGround();
    console.log(token);
  }, []);

  return <div>PlayGroundData</div>;
}

export default PlayGroundData;
