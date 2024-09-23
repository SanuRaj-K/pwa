import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
function Input({ addedUsers, setAddedUsers }) {
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const data = {
    name: value,
    job: "developer",
  };
  const url = "https://reqres.in/api/users";

  const handlePost = () => {
    console.log(value);

    if (value.length < 1) {
      toast.error("enter your name");
    } else {
      const toastId = toast.loading("posting...");
      if (navigator.onLine) {
        axios
          .post(url, {
            data,
          })
          .then((res) => {
            toast.success("Success", { id: toastId });
            setAddedUsers((prev) => [...prev, value]);
            setValue("");
          })
          .catch((err) => {
            toast.error("something went wrong", { id: toastId });
            console.log(err);
          });
      } else {
        storeRequestOffline(url, data);
        toast.error("You are offline! Request stored.", { id: toastId });
      }
    }
  };
  const storeRequestOffline = async (url, requestBody) => {
    const storedRequests =
      JSON.parse(localStorage.getItem("offlineRequests")) || [];
    storedRequests.push({ url, requestBody });
    localStorage.setItem("offlineRequests", JSON.stringify(storedRequests));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span> Testing the PWA</span>
        <div style={{}}>
          <div style={{ display: "flex ", justifyItems: "center" }}>
            <label htmlFor="name">Enter your Name:</label>
            <input
              type="text"
              onChange={(e) => handleOnChange(e)}
              name=""
              value={value}
              id="name"
            />
            <div
              onClick={handlePost}
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                cursor: "pointer",
                padding: " 3px 10px",
              }}
            >
              Post
            </div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Link to={"/list"}>View Your List</Link>
        </div>
      </div>
    </div>
  );
}

export default Input;
