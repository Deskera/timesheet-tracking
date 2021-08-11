import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      <HashLoader speedMultiplier="1" color="#9cdaf8" className="bg-info" loading={loading} size={100} />
    </div>
  );
}

export default Loader;