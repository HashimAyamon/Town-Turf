import React from "react";

function Header1(props) {
  const turferclick = () => {
    if (props.cred.tokenid !== "" && props.cred.type === "Admin") {
      props.setview("Homepage");
    } else if (props.cred.tokenid !== "" && props.cred.type === "User") {
      props.setview("Homepage");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <nav
      style={{
        backgroundColor: "rgba(38, 141, 28, 0.85)",
        padding: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div>
          <a
            onClick={turferclick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              padding: "0.5rem 0",
            }}
          >
            <img
              src="/logo.jpeg"
              alt="Logo"
              style={{ height: "90px", width: "250px" }}
            />
          </a>
        </div>

        {props.cred.tokenid !== "" && (
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              margin: 0,
              padding: 0,
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "white",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              Welcome, {props.cred.userid}
            </li>

            <br />
            <br />
            <li>
              <a
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 16l4-4-4-4" />
                    <path d="M7 12h14" />
                    <path d="M3 4v16a2 2 0 0 0 2 2h4" />
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header1;
