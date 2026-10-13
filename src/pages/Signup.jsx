import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, deleteUser, signOut, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "../firebase";
import ConfigNotice from "../components/ConfigNotice";

function errorMessage(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email already has an account. Please log in.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Use a password with at least 6 characters.";
    case "permission-denied":
    case "firestore/permission-denied":
      return "Authentication account could not be saved to Firestore. Publish the simple users rule from firestore.rules, then try again.";
    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";
    default:
      return "Account could not be created. Check Firebase Authentication and Firestore setup.";
  }
}

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!firebaseConfigured || !auth || !db) {
      setError("Firebase is not configured. Check the .env file and restart the website.");
      return;
    }

    const cleanName = fullName.trim().replace(/\s+/g, " ");
    const nameParts = cleanName.split(" ").filter(Boolean);

    if (nameParts.length < 2) {
      setError("Please enter your first name and last name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must have at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setBusy(true);
    let newUser = null;

    try {
      // 1. Firebase Authentication creates and securely manages the password.
      const account = await createUserWithEmailAndPassword(auth, email.trim(), password);
      newUser = account.user;
      await updateProfile(newUser, { displayName: cleanName });

      // 2. Save only profile details in Firestore. Never save the password here.
      await setDoc(doc(db, "users", newUser.uid), {
        fullName: cleanName,
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(" "),
        email: email.trim(),
        createdAt: serverTimestamp()
      });

      await signOut(auth);
      navigate("/login", {
        replace: true,
        state: { message: "Account created successfully. Your profile was saved. Please log in." }
      });
    } catch (signupError) {
      // If profile saving fails immediately after account creation, remove the
      // just-created account so the same email can be tried after setup is fixed.
      if (newUser && signupError.code?.includes("permission-denied")) {
        try { await deleteUser(newUser); } catch { /* Show the original error below. */ }
      }
      setError(errorMessage(signupError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      <ConfigNotice />
      <section className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-9">
        <h1 className="text-3xl font-bold text-center">Create a DEV@Deakin Account</h1>
        <p className="text-center text-gray-600 mt-2 mb-8">Enter your details to register.</p>

        {error && <p className="mb-5 rounded bg-red-50 border border-red-200 text-red-800 p-3 text-sm" role="alert">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium mb-2">Full name</label>
            <input id="signup-name" type="text" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="e.g. Harsh Singla" className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium mb-2">Email</label>
            <input id="signup-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium mb-2">Password</label>
            <input id="signup-password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" minLength={6} className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="signup-confirm" className="block text-sm font-medium mb-2">Confirm password</label>
            <input id="signup-confirm" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Type the password again" minLength={6} className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" disabled={busy} className="w-full rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 font-semibold">
            {busy ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">Already have an account? <Link to="/login" className="text-blue-700 font-semibold hover:underline">Login</Link></p>
      </section>
    </main>
  );
}
