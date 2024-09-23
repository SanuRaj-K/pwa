import React from "react";

function List({ addedUsers }) {
  return (
    <div>
      <div>
        {addedUsers?.map((user, index) => (
          <div key={index}>{user}</div>
        ))}
      </div>
    </div>
  );
}

export default List;
