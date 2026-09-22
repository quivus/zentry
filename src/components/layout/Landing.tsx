import { Link } from 'react-router-dom'
import { employees } from '../../data/mock'
import { Logo } from '../ui/Logo'
import { Navbar } from './Navbar'

const cities = [
  'Manila',
  'Cebu',
  'Madrid',
  'Barcelona',
  'Tokyo',
  'Osaka',
  'Seoul',
  'Busan',
  'Moscow',
  'Lyon',
  'Milan',
  'São Paulo',
]

export function Landing() {
  return (
    <div className="page landing">
      <Navbar />
      <main>
        <section className="hero">
          <p className="kicker">Operations platform</p>
          <h1 className="hero-mark">
            <Logo size="lg" />
          </h1>
          <p className="hero-line">HR · Payroll · Booking</p>
          <p className="lede">
            Welcome to one workspace for your people, payroll, time off, and meeting rooms.
            Employees can manage everyday requests while HR keeps company operations clear and organized.
          </p>
          <div className="hero-actions">
            <a href="#product" className="btn btn-ghost btn-lg">
              View the modules
            </a>
            <Link to="/login" className="btn btn-solid btn-lg">
              Sign In
            </Link>
          </div>
        </section>

        <section className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...cities, ...cities].map((city, index) => (
              <span key={`${city}-${index}`}>{city}</span>
            ))}
          </div>
        </section>

        <section id="product" className="section">
          <div className="section-head">
            <p className="kicker">Product</p>
            <h2>Three modules. One record of truth.</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <span>01</span>
              <h3>HR</h3>
              <p>
                International headcount, roles, and leave in a single directory —
                from Manila and Madrid to Tokyo, Seoul, and Moscow.
              </p>
            </article>
            <article className="feature-card">
              <span>02</span>
              <h3>Payroll</h3>
              <p>
                Monthly runs, deductions, and payslips sit beside the employee
                record. Finance does not wait on a second export.
              </p>
            </article>
            <article className="feature-card">
              <span>03</span>
              <h3>Booking</h3>
              <p>
                Rooms and studios across hubs. Guests reserve space; HR sees
                occupancy, hosts, and pending requests in the same console.
              </p>
            </article>
          </div>
        </section>

        <section id="platform" className="section split">
          <div>
            <p className="kicker">Platform</p>
            <h2>Built for companies that span time zones.</h2>
            <p className="lede">
              Zentry is a mock operating picture of a global firm: HR signs in
              to the console, everyone else uses the guest portal. Light and
              night modes stay strictly black and white.
            </p>
            <ul className="plain-list">
              <li>HR console for people, pay, rooms, and approvals</li>
              <li>Guest portal for bookings, payslips, and time off</li>
              <li>Fixed international roster — no generated filler names</li>
            </ul>
          </div>
          <aside className="stat-stack">
            <div>
              <strong>18</strong>
              <span>People on the ledger</span>
            </div>
            <div>
              <strong>8</strong>
              <span>Countries represented</span>
            </div>
            <div>
              <strong>13</strong>
              <span>Bookable rooms</span>
            </div>
          </aside>
        </section>

        <section id="roster" className="section">
          <div className="section-head">
            <p className="kicker">People</p>
            <h2>A fixed international roster.</h2>
          </div>
          <div className="roster">
            {employees.slice(0, 8).map((person) => (
              <article key={person.id} className="roster-card">
                <p className="roster-meta">
                  {person.city} · {person.country}
                </p>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <Logo size="sm" />
        <p>HR, payroll, and booking. Mock environment for demonstration.</p>
        <p className="site-credit">RAJIEMAE VILLA 2026</p>
      </footer>
    </div>
  )
}
