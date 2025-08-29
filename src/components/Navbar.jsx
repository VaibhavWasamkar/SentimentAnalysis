import { Link, NavLink, useLocation } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: 12,
  fontWeight: 600,
  color: isActive ? "#fff" : "#003366",
  background: isActive ? "#6C63FF" : "transparent",
});

export default function Navbar() {
  const location = useLocation();
  const pathNum = parseInt(location.pathname.replace("/", ""), 10);
  const isStoryActive = pathNum >= 2;

  return (
    <nav
      style={{
        background: "#cfe3ff",
        padding: "14px 16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#1a237e",
            textDecoration: "none",
          }}
        >
          Sentiment Analysis
        </Link>
        <div style={{ display: "flex", gap: 8 }}>
          <NavLink to="/1" style={linkStyle}>
            Home
          </NavLink>
          <NavLink
            to="/2"
            style={() =>
              linkStyle({ isActive: isStoryActive })
            }
          >
            Story
          </NavLink>
        </div>
      </div>
    </nav>
  );
}