import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="h-screen bg-purple-100 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-red-500">
          Tailwind Test 🚀
        </h1>
      </section>
    </div>
  );
}
