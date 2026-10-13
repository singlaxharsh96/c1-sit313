import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Read the current login status directly; no Context API is needed.
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  async function handleSignOut() {
    if (!auth) return;
    try {
      await signOut(auth);
      navigate("/login");
    } catch {
      window.alert("Sign out did not complete. Please try again.");
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    window.alert("Search will be implemented in a future task.");
  }

  return (
    <header className="bg-white border-b border-gray-300 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <Link to="/" className="font-extrabold text-xl text-gray-900 whitespace-nowrap" aria-label="DEV at Deakin home">
          DEV@Deakin
        </Link>

        <form onSubmit={handleSearch} className="flex flex-1 min-w-0">
          <label htmlFor="site-search" className="sr-only">Search</label>
          <input
            id="site-search"
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button type="submit" className="border border-l-0 border-gray-300 rounded-r px-3 text-sm text-gray-600 hover:bg-gray-100">
            Search
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <button
            type="button"
            onClick={() => navigate("/post")}
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-4 py-2 text-sm"
          >
            Post
          </button>
          {user ? (
            <>
              <span className="hidden lg:inline text-sm text-gray-600 max-w-36 truncate" title={user.email || "Signed in"}>
                {user.displayName || user.email}
              </span>
              <button onClick={handleSignOut} className="bg-gray-900 text-white rounded px-4 py-2 text-sm hover:bg-gray-700">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-4 py-2 text-sm">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
