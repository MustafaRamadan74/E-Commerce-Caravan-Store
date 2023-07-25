import React from "react";
import notFound from "../../images/notFound.png";

export default function NotFound() {
  return (
    <div className="text-center mx-auto">
      <img src={notFound} className="w-50" alt="not found" />
    </div>
  );
}
