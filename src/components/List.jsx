import React from "react";

function List({ addedUsers }) {
  return (
    <div>
        <h3>List</h3>
      <div>
        {addedUsers?.map((user, index) => (
          <div key={index}>{user}</div>
        ))}
      </div>
    </div>
  );
}

export default List;
