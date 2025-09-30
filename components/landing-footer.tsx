import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-white/30 backdrop-blur-sm border-t border-white/50 py-12">
      <div className="container mx-auto px-4">
        <div className="border-t border-white/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Deck Planning V2. All rights reserved.
            <br />
            Author:{" "}
            <a
              href="https://github.com/Longvu1982"
              target="_blank"
              className="font-bold itatic bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600"
            >
              Kris Nguyen
            </a>
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="https://github.com/Longvu1982"
              target="_blank"
              className="text-slate-600 hover:text-purple-600 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
