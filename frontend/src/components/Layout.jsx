import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          Lab Management
        </Link>
        <nav>
          <NavLink to="/" end>
            Nalozi
          </NavLink>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
