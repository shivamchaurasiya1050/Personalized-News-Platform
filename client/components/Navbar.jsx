"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "@/services/api";

export default function Navbar({ tab, setTab }) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // 🔥 dropdown state

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }

    setLoading(false);
  }, []);

  const fetchUser = async (token) => {
    try {
      const res = await API.get("auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res.data.data;

      const dynamicTabs = [
        { key: "personalized", label: "For You" },
        ...(user.preferences || []).map((p) => ({
          key: p,
          label: p.charAt(0).toUpperCase() + p.slice(1),
        })),
        { key: "saved", label: "Saved" },
      ];

      setTabs(dynamicTabs);
    } catch (error) {
      console.log("User fetch error");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setTabs([]);
    router.push("/login");
  };

  if (loading) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      {/* Logo */}
      <span
        className="navbar-brand fw-bold"
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      >
        NewsBite
      </span>

      {/* Tabs */}
      {token && (
        <>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              {tabs.map((t) => (
                <li className="nav-item" key={t.key}>
                  <button
                    className={`nav-link btn btn-link ${
                      tab === t.key
                        ? "active text-warning fw-bold"
                        : "text-white"
                    }`}
                    onClick={() => setTab(t.key)}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* 🔥 Right Side Dropdown */}
      <div className="ms-auto position-relative">
        {token ? (
          <>
            {/* Profile Button */}
            <button
              className="btn btn-light"
              onClick={() => setOpen(!open)}
            >
              👤 Profile
            </button>

            {/* Dropdown */}
            {open && (
              <div
                className="dropdown-menu show"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "45px",
                  minWidth: "150px",
                }}
              >
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setOpen(false);
                    router.push("/preferences"); // 🔥 navigate
                  }}
                >
                  ⚙️ Preferences
                </button>

                <button
                  className="dropdown-item text-danger"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            className="btn btn-success"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}