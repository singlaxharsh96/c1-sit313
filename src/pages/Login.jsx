import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseConfigured } from "../firebase";
import ConfigNotice from "../components/ConfigNotice";

function friendlyLoginError(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Email or password is incorrect. Please try again or create a free account.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a little while and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your internet connection and try again.";
    default:
      return "Login could not be completed. Check your Firebase setup and try again.";
  }
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(location.state?.message || "");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!firebaseConfigured || !auth) {
      setError("Firebase is not configured yet. Follow the Firebase setup steps in README.md.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/", { replace: true });
    } catch (loginError) {
      setError(friendlyLoginError(loginError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      <ConfigNotice />
      <section className="max-w-xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-9">
        <div className="flex items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-600 mt-2">Sign in to your DEV@Deakin account.</p>
          </div>
          <Link to="/signup" className="border border-cyan-700 text-cyan-800 rounded px-4 py-2 text-sm hover:bg-cyan-50">Sign up</Link>
        </div>

        {success && <p className="mb-4 rounded bg-green-50 border border-green-200 text-green-800 p-3 text-sm" role="status">{success}</p>}
        {error && <p className="mb-4 rounded bg-red-50 border border-red-200 text-red-800 p-3 text-sm" role="alert">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium mb-2">Your email</label>
            <input id="login-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium mb-2">Your password</label>
            <input id="login-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" disabled={busy} className="w-full rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 font-semibold">
            {busy ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">Don't have an account? <Link to="/signup" className="text-blue-700 font-semibold hover:underline">Create a free account</Link></p>
      </section>
    </main>
  );
}
