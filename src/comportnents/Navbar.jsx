
let Navbar = () => { 
    return <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: '#fff' }}>
        <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>SHOPNAME</div>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0 }}>
            <li>Home</li>
            <li>Cart</li>
            <li>Username</li>
          </ul>
        </nav>
      </header>
}
export default Navbar;