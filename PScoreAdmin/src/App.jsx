import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p className="bg-orange-500 text-green-500 w-[200px] h-[200px]">
        hello world
      </p>
    </>
  );
}

export default App;
