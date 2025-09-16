import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({});
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [vendorSearch, setVendorSearch] = useState("");

  const token = localStorage.getItem("adminToken");

  // -------------------- FETCH FUNCTIONS --------------------
  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://zoya-backend.onrender.com/admin/analytics",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.ok) setAnalytics(res.data.analytics);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://zoya-backend.onrender.com/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.ok) {
        setUsers(res.data.users);
        setFilteredUsers(res.data.users);
      }
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchVendors = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://zoya-backend.onrender.com/admin/vendors",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.ok) {
        setVendors(res.data.vendors);
        setFilteredVendors(res.data.vendors);
      }
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  // -------------------- USE EFFECTS --------------------
  useEffect(() => {
    fetchAnalytics();
    fetchUsers();
    fetchVendors();
  }, [fetchAnalytics, fetchUsers, fetchVendors]);

  useEffect(() => {
    const filtered = users.filter(
      (u) =>
        u.full_name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [userSearch, users]);

  useEffect(() => {
    const filtered = vendors.filter(
      (v) =>
        v.name.toLowerCase().includes(vendorSearch.toLowerCase()) ||
        v.email.toLowerCase().includes(vendorSearch.toLowerCase())
    );
    setFilteredVendors(filtered);
  }, [vendorSearch, vendors]);

  // -------------------- NOTIFY --------------------
  const handleNotifyUsers = async () => {
    try {
      await axios.post(
        "https://zoya-backend.onrender.com/admin/notify/users",
        { title, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Users notified successfully!");
      setTitle("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to notify users");
    }
  };

  const handleNotifyVendors = async () => {
    try {
      await axios.post(
        "https://zoya-backend.onrender.com/admin/notify/vendors",
        { title, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Vendors notified successfully!");
      setTitle("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to notify vendors");
    }
  };

  // -------------------- RENDER --------------------
  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white p-6">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-4xl font-bold text-purple-400 tracking-wide">
          Zoya Admin Dashboard
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search Users..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
          />
          <input
            type="text"
            placeholder="Search Vendors..."
            value={vendorSearch}
            onChange={(e) => setVendorSearch(e.target.value)}
            className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
          />
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
            className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg shadow-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Analytics */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Total Users",
              value: analytics.totalUsers || 0,
              color: "from-purple-600 to-purple-400",
            },
            {
              label: "Total Vendors",
              value: analytics.totalVendors || 0,
              color: "from-green-500 to-green-400",
            },
            {
              label: "Waitlist Signups",
              value: analytics.waitlistSignups || 0,
              color: "from-purple-500 to-purple-300",
            },
          ].map((card) => (
            <div
              key={card.label}
              className={`bg-gradient-to-r ${card.color} p-6 rounded-xl shadow-2xl hover:scale-105 transition transform`}
            >
              <p className="text-gray-200 font-semibold">{card.label}</p>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Users */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-purple-400">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              <p className="text-lg font-bold text-green-400">{u.full_name}</p>
              <p className="text-gray-300">{u.email}</p>
              <p className="text-gray-400 text-sm">Status: {u.status}</p>
              {u.phone && <p className="text-gray-400 text-sm">Phone: {u.phone}</p>}
              <p className="text-gray-500 text-xs">
                Joined: {new Date(u.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vendors */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-purple-400">Vendors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((v) => (
            <div
              key={v.id}
              className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              <p className="text-lg font-bold text-green-400">{v.name}</p>
              <p className="text-gray-300">{v.businessName}</p>
              <p className="text-gray-300">{v.email}</p>
              {v.phone && <p className="text-gray-400 text-sm">Phone: {v.phone}</p>}
              <p className="text-gray-500 text-xs">
                Joined: {new Date(v.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 text-purple-400">
          Send Notifications / Emails
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 px-4 py-2 rounded-lg bg-transparent border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-transparent border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
        />

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleNotifyUsers}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300"
          >
            Notify Users
          </button>
          <button
            onClick={handleNotifyVendors}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300"
          >
            Notify Vendors
          </button>
        </div>
      </section>
    </div>
  );
}
