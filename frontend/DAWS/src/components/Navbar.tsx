import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GlassToggle from "./Glasstoggle";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("daws_token");
    localStorage.removeItem("daws_user");
    window.location.href = "/login"; // force redirect
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/requirements", label: "Requirements" },
    { to: "/planner", label: "Planner" },
    { to: "/docs", label: "Docs" },
    { to: "/assistant", label: "Dev Assistant" },
  ];

  return (
    <nav
      className="
        backdrop-blur-md border-b
        bg-[color-mix(in_oklab,var(--bg),transparent 15%)]
        text-[var(--text)]
        border-[color-mix(in_oklab,var(--text),transparent 80%)]
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Logo / Brand */}
            <button
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-[var(--text)]"
            >
              DAWS
            </button>

            {/* NAV LINKS */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              {links.map((l) => {
                const active = location.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`
                      px-3 py-2 relative
                      ${
                        active
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-[#8441A4] to-[#FF5894]"
                          : "text-[color:var(--text)/70]"
                      }
                      hover:text-transparent hover:bg-clip-text 
                      hover:bg-gradient-to-r hover:from-[#8441A4] hover:to-[#FF5894]
                      transition
                    `}
                  >
                    {l.label}

                    {/* Active underline gradient */}
                    {/* {active && (
                      <span
                        className="
                        absolute left-0 right-0 -bottom-1 h-[2px] 
                        bg-gradient-to-r from-[#8441A4] to-[#FF5894] rounded-full
                      "
                      ></span>
                    )} */}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Toggle */}
            <GlassToggle />

            {/* Gradient Button */}
            <div className="hidden sm:flex items-center gap-4">
              <button
                className="
                  px-4 py-2 rounded-md font-semibold text-white 
                  bg-gradient-to-r from-[#8441A4] to-[#FF5894]
                  hover:opacity-90 transition
                "
              >
                Get Started
              </button>
              {/*  Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md font-semibold 
              bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
