import { Link } from 'react-router-dom'
import { Logo } from '../ui/Logo'
import { ThemeToggle } from '../ui/ThemeToggle'

type NavbarProps = {
  variant?: 'marketing' | 'plain'
}

export function Navbar({ variant = 'marketing' }: NavbarProps) {
  return (
    <header className="nav">
      <Link to="/" className="nav-brand">
        <Logo />
      </Link>
      {variant === 'marketing' ? (
        <nav className="nav-links" aria-label="Primary">
          <a href="#product">Product</a>
          <a href="#platform">Platform</a>
          <a href="#roster">People</a>
        </nav>
      ) : null}
      <div className="nav-actions">
        <ThemeToggle />
      </div>
    </header>
  )
}
