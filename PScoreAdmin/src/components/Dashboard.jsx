import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return <Link to={"/reservations"}>go to reservations</Link>;
}
