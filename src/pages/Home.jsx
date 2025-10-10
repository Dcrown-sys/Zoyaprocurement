// src/pages/Home.jsx
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import WaitlistForm from "../components/WaitlistForm";
import heroImage from "../assets/hero-placeholder.png";
import problemImage from "../assets/problem-placeholder.png";
import solutionImage from "../assets/solution-placeholder.png";
import howImage from "../assets/how-placeholder.png";
import { onMessageListener } from "../firebase"; // <-- import the listener

export default function Home() {
  useEffect(() => {
    // Listen for foreground messages
    const unsubscribe = onMessageListener()
      .then((payload) => {
        alert(
          `New notification: ${payload.notification.title} - ${payload.notification.body}`
        );
      })
      .catch((err) => console.log("failed to receive message: ", err));

    return () => unsubscribe;
  }, []);

  return (
    <div className="bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 gap-8"
      >
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 hover:text-purple-900 transition-all duration-500 glow">
            Zoya — Procurement, Made Simple
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            From trucks of sand to bags of grain — compare suppliers, get real
            prices, and order in bulk. All on Zoya.
          </p>
          <a
            href="#cta"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-all shadow-md hover:shadow-lg hover:scale-105 duration-300 glow"
          >
            Join the Waitlist
          </a>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full max-w-md rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Problem Section */}
      <section
        id="problem"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="md:w-1/2">
          <img
            src={problemImage}
            alt="Problem Illustration"
            className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-purple-700 hover:text-purple-900 transition-all duration-500 glow">
            The Problem
          </h2>
          <p className="text-gray-700">
            Buying in bulk is harder than it should be. Contractors, traders,
            and businesses often overpay because prices are hidden, middlemen
            add extra margins, and supplier choices are limited. Sourcing takes
            time, calls, and guesswork.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section
        id="solution"
        className="bg-purple-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-purple-700 hover:text-purple-900 transition-all duration-500 glow">
            The Zoya Solution
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>See live prices for building materials and agricultural produce.</li>
            <li>Compare suppliers by price and proximity.</li>
            <li>Order in bulk with confidence — granite, rice, steel, and more.</li>
            <li>Save time, cut hidden costs, and keep full control of procurement.</li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <img
            src={solutionImage}
            alt="Solution Illustration"
            className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500 hover:scale-105"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="md:w-1/2">
          <img
            src={howImage}
            alt="How it works illustration"
            className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500 hover:scale-105"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-purple-700 hover:text-purple-900 transition-all duration-500 glow">
            How It Works
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Search for what you need — sand, steel, granite, rice, wheat, grains, etc.</li>
            <li>Compare suppliers instantly by price, rating, and distance.</li>
            <li>Place your order and choose delivery or pickup.</li>
            <li>Track fulfillment and delivery to your site or warehouse.</li>
          </ol>
        </div>
      </section>

      {/* CTA / Waitlist Section */}
      <section
        id="cta"
        className="bg-purple-700 text-white py-20 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
      >
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold glow">
            Join the Zoya Waitlist
          </h2>
          <p>
            Procurement doesn’t have to be complicated. Join the Zoya waitlist today and be ready to buy smarter.
          </p>

          {/* Waitlist Form */}
          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 2025 Zoya. All rights reserved.</span>
          <div className="flex space-x-4">
            <a href="https://x.com/zoyainc/status/1964458056319955377?s=46&t=x-PJXEviGpxYzleGbCmrjA" className="hover:text-green-400 transition-colors duration-300">X</a>
            <a href="https://www.instagram.com/p/DOHDU7ADPiU/?igsh=MW13bHExcWswOXYyOQ==" className="hover:text-green-400 transition-colors duration-300">Instagram</a>
            <a href="https://www.tiktok.com/t/ZP8BE1x69/" className="hover:text-green-400 transition-colors duration-300">Tiktok</a>
            <h3>Zoyaprocurement Ventures</h3>
          </div>
        </div>
      </footer>
    </div>
  );
}
