// src/components/WaitlistForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  requestFirebaseNotificationPermission,
  onMessageListener,
} from "../firebase";
import * as z from "zod";

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "buyer",
    businessName: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Listen to foreground notifications
  useEffect(() => {
    const unsubscribe = onMessageListener()
      .then((payload) => {
        alert(
          `Notification: ${payload.notification.title}\n${payload.notification.body}`
        );
      })
      .catch((err) => console.log("FCM Listener error:", err));

    return () => unsubscribe;
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Frontend validation schema
  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .refine((val) => /\.(com|net|org|edu|io)$/i.test(val), 
        "Email must end with a valid domain like .com, .net, .org, .edu, .io"
      ),
    phone: z.string().optional(),
    role: z.enum(["buyer", "vendor"]),
    businessName: z.string().optional(),
    category: z.string().optional(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Validate form before sending
      formSchema.parse(formData);

      const endpoint =
        formData.role === "vendor"
          ? "https://zoya-backend.onrender.com/vendors/signup"
          : "https://zoya-backend.onrender.com/waitlist/signup";

      const payload =
        formData.role === "vendor"
          ? {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              businessName: formData.businessName,
              category: formData.category,
            }
          : {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
            };

      const response = await axios.post(endpoint, payload);

      if (response.data.ok || response.data.message) {
        setMessage(
          "Thanks — you’re on the Zoya waitlist. We’ll send next steps soon."
        );

        // Request FCM token and send to backend
        if (response.data.userId) {
          const token = await requestFirebaseNotificationPermission();
          if (token) {
            await axios.post("https://zoya-backend.onrender.com/notifications/register", {
              userId: response.data.userId,
              token,
            });
          }
        }

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          role: "buyer",
          businessName: "",
          category: "",
        });
      } else {
        setMessage("Oops! Something went wrong.");
      }
    } catch (err) {
      if (err.name === "ZodError") {
        const messages =
          err.errors?.map((e) => e.message).join(", ") ||
          "Invalid input. Please check your entries.";
        setMessage(messages);
      } else {
        console.error("Signup error:", err);
        setMessage("Error signing up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-purple-200">
      <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
        Join the Zoya Waitlist
      </h2>

      {/* Role Selector */}
      <div className="flex justify-center mb-4 space-x-4">
        <button
          type="button"
          onClick={() => setFormData({ ...formData, role: "buyer" })}
          className={`px-4 py-2 rounded-md font-medium transition ${
            formData.role === "buyer"
              ? "bg-purple-700 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          User / Buyer
        </button>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, role: "vendor" })}
          className={`px-4 py-2 rounded-md font-medium transition ${
            formData.role === "vendor"
              ? "bg-purple-700 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Vendor
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 placeholder-gray-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 placeholder-gray-400"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 placeholder-gray-400"
        />

        {/* Vendor fields */}
        {formData.role === "vendor" && (
          <>
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 placeholder-gray-400"
            />
            <input
              type="text"
              name="category"
              placeholder="Business Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 placeholder-gray-400"
            />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
        >
          {loading ? "Submitting..." : "Join Waitlist"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-purple-700 font-medium">{message}</p>
      )}
    </div>
  );
}
