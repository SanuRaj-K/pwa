import React, { useEffect, useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import List from "./components/List";
import Input from "./components/Input";
function App() {
  const [addedUsers, setAddedUsers] = useState([]);
  const sendStoredRequests = async () => {
    const toastIdForStoredRequests = toast.loading("sending stored requestes");
    const storedRequests =
      JSON.parse(localStorage.getItem("offlineRequests")) || [];
    for (const req of storedRequests) {
      const data = req.requestBody;

      try {
        await axios.post(req.url, data);
        toast.success("Request sent successfully!", {
          id: toastIdForStoredRequests,
        });
        setAddedUsers((prev) => [...prev, data]);
      } catch (error) {
        toast.error("Failed to send request.", {
          id: toastIdForStoredRequests,
        });
      }
    }

    localStorage.removeItem("offlineRequests");
  };
  useEffect(() => {
    const handleOnline = () => {
      sendStoredRequests();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // window.addEventListener("online", sendStoredRequests);

  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <Input setAddedUsers={setAddedUsers} addedUsers={addedUsers} />
          }
        />
        <Route path="/list" element={<List addedUsers={addedUsers} />} />
      </Routes>
    </div>
  );
}

export default App;
