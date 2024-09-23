import React from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const data = {
    name: "sanu",
    job: "developer",
  };
  const url = "https://reqres.in/api/users";

  const handlePost = () => {
    const toastId = toast.loading("posting...");
    if (navigator.onLine) {
      axios
        .post(url, {
          data,
        })
        .then((res) => {
          toast.success("Success", { id: toastId });
          console.log(res.data);
        })
        .catch((err) => {
          toast.error("something went wrong", { id: toastId });
          console.log(err);
        });
    } else {
      storeRequestOffline(url, data);
      toast.error("You are offline! Request stored.", { id: toastId });
    }
  };
  const storeRequestOffline = async (url, requestBody) => {
    const storedRequests =
      JSON.parse(localStorage.getItem("offlineRequests")) || [];
    storedRequests.push({ url, requestBody });
    localStorage.setItem("offlineRequests", JSON.stringify(storedRequests));
  };

  return (
    <div className="App">
      <Toaster />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span> Testing the PWA</span>
        <div>
          <button
            style={{ display: "block", marginTop: "50px" }}
            onClick={handlePost}
          >
            Make a post
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
