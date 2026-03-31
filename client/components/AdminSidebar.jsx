"use client";

import { useRouter } from "next/navigation";

export default function AdminSidebar({ section, setSection }) {
  const router = useRouter();

  const menu = [
    { key: "agents", label: "Agents" },
    { key: "ads", label: "Ads" },
    { key: "analytics", label: "Analytics" }
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="sidebar">

      <div>
        <h5 className="title">Admin Panel</h5>

        <div className="menu">
          {menu.map(item => (
            <div
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`menu-item ${section === item.key ? "active" : ""}`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 LOGOUT BUTTON (BOTTOM FIXED) */}
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      <style jsx>{`
        .sidebar {
          background: #1e1e2f;
          color: white;
          padding: 15px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between; /* 🔥 main fix */
        }

        .title {
          margin-bottom: 10px;
        }

        .menu {
          display: flex;
          gap: 10px;
          overflow-x: auto;
        }

        .menu-item {
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 6px;
          white-space: nowrap;
          transition: 0.2s;
        }

        .menu-item:hover {
          background: #2c2c3f;
        }

        .menu-item.active {
          background: #343a40;
        }

        .logout-btn {
          margin-top: 20px;
          padding: 10px;
          border: none;
          border-radius: 6px;
          background: #dc3545;
          color: white;
          cursor: pointer;
          width: 100%;
        }

        .logout-btn:hover {
          background: #bb2d3b;
        }

        /* ✅ DESKTOP */
        @media (min-width: 768px) {
          .sidebar {
            width: 220px;
            height: 100vh;
            position: sticky;
            top: 0;
            flex-shrink: 0;
          }

          .menu {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}