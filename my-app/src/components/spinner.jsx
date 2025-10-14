import React from "react";

const spinner = () => {
  return (
    <div>
      <div class="d-flex justify-content-center spinner">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default spinner;
