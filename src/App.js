import React, { useEffect, useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import List from "./components/List";
import Input from "./components/Input";
function App() {
  if (navigator.serviceWorker.controller) {
  const userConfirmed = window.confirm('A new version of the app is available. Would you like to refresh?');
  if (userConfirmed) {
    window.location.reload();
  }
}

  const [addedUsers, setAddedUsers] = useState([]);
  const sendStoredRequests = async () => {
    const storedRequests =
      JSON.parse(localStorage.getItem("offlineRequests")) || [];
    if (storedRequests.length === 0) {
      return;
    }
    const toastIdForStoredRequests = toast.loading("sending stored requestes");

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
    if(navigator.onLine){
      sendStoredRequests()
    }
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
