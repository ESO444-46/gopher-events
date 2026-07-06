import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-paper border border-line shadow-sm transition-colors group-hover:border-maroon/30">
            <span className="text-maroon font-display font-semibold text-sm">M</span>
          </div>
          <span className="font-display text-lg font-semibold text-maroon tracking-tight">
            Gopher Events
          </span>
        </Link>

        <button
          type="button"
          className="h-9 w-9 rounded-full bg-paper border border-line hover:border-maroon/30 transition-colors cursor-pointer"
          aria-label="Account menu"
        />
      </div>
    </header>
  );
};

export default NavBar;