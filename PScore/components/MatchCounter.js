import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
const MatchCounter = ({
  start,
  end,
  counterDate,
  setCounterTime,
  counterTime,
}) => {
  //   const date1 = "2024-06-25";

  const matchStartTime = dayjs(`${counterDate}T${start}:00`);
  const matchEndTime = dayjs(`${counterDate}T${end}:00`);
  const [counter, setCounter] = useState(0);
  const countermax = matchEndTime.diff(matchStartTime, "second");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      if (now.isAfter(matchStartTime) && now.isBefore(matchEndTime)) {
        const diffInSeconds = now.diff(matchStartTime, "second");
        setCounter(diffInSeconds);
      } else {
        setCounter(0); // Match hasn't started or has already ended
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [matchStartTime, matchEndTime]);

  const formatCounter = (counter) => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  useEffect(() => {
    setCounterTime(formatCounter(counter));
  }, [counter]);

  return <Text>{counterTime}</Text>;
  //   Max Counter: {formatCounter(countermax)}
};

export default MatchCounter;
