import React from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <Link to="/home">
        <button>Home Page</button>
      </Link>
    </div>
  );
}
