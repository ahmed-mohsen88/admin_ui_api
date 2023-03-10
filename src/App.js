import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  const [profiles, setprofiles] = useState([]);

  const getData = async () => {
    const resp = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    setprofiles(resp.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home profiles={profiles} />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
