const Navbar = ({ children }) => {
  return (
    <header>
      <nav className="bg-background sticky inset-x-0 top-0 z-10 flex items-center justify-between p-4">
        <div className="flex items-center gap-2">{children}</div>

        <div className="flex items-center gap-2"></div>
      </nav>
    </header>
  );
};
export default Navbar;
