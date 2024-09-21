import React from "react";
import "./App.css";
import axios from "axios";
import { savePostRequest } from "./indexedDb";

function App() {
  const postRequest = async () => {
    const data = { name: "myname" };
    if (navigator.onLine) {
      // Send request immediately if online
      await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      // Save request and register sync if offline
      await savePostRequest(data);

      // Register background sync
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register("sync-post-requests");
    }
  };

  // const handlePost = () => {
  //   axios
  //     .post("https://reqres.in/api/users", { name: "name", job: "job" })
  //     .then(async (res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <div className="App">
      Testing the PWA
      <button onClick={postRequest} className="btn">
        Make a Post Request
      </button>
    </div>
  );
}

export default App;
