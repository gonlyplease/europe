import { useState } from "react";
import "./App.css";
import MapChart from "./components/MapChart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <MapChart />
    </div>
  );
}

export default App;
