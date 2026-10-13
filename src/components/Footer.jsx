import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-cyan-700 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-9 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-bold mb-3">Explore</h2>
          <Link to="/" className="block hover:underline">Home</Link>
          <a href="#articles" className="block hover:underline">Articles</a>
          <a href="#tutorials" className="block hover:underline">Tutorials</a>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-3">Support</h2>
          <p>FAQs</p>
          <p>Help</p>
          <a href="mailto:help@example.com" className="hover:underline">Contact Us</a>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-3">Stay Connected</h2>
          <div className="flex gap-3">
            <a className="rounded bg-white/15 px-3 py-2 hover:bg-white/25" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
            <a className="rounded bg-white/15 px-3 py-2 hover:bg-white/25" href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="border-t border-cyan-500 text-center px-4 py-5">
        <p className="font-bold">DEV@Deakin 2026</p>
        <p className="text-sm mt-2">Privacy Policy &nbsp; | &nbsp; Terms &nbsp; | &nbsp; Code of Conduct</p>
      </div>
    </footer>
  );
}
