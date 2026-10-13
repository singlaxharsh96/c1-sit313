import { firebaseConfigured } from "../firebase";

export default function ConfigNotice() {
  if (firebaseConfigured) return null;

  return (
    <div className="mb-5 rounded border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900" role="status">
      <strong>Firebase setup is not finished.</strong> Copy <code>.env.example</code> to <code>.env</code>, enter your Firebase Web App configuration, and restart the Vite server.
    </div>
  );
}
