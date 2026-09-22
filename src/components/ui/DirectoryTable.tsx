import { useMemo, useState } from 'react'
import type { Employee } from '../../types'
import { dateFmt } from '../../services/format'
import { StatusTag } from './StatusTag'

type DirectoryTableProps = {
  title: string
  hint?: string
  people: Employee[]
  youId?: string
}

export function DirectoryTable({ title, hint, people, youId }: DirectoryTableProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return people
    return people.filter((person) =>
      `${person.name} ${person.role} ${person.city} ${person.country} ${person.department}`
        .toLowerCase()
        .includes(needle),
    )
  }, [people, query])

  return (
    <section className="panel">
      <header className="panel-head">
        <div>
          <h2>{title}</h2>
          {hint ? <p>{hint}</p> : null}
        </div>
        <input
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search people, city, department"
        />
      </header>
      <div className="table-wrap directory">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Location</th>
              <th>Status</th>
              <th>Start</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="muted">
                  No people match that search.
                </td>
              </tr>
            ) : (
              filtered.map((person) => (
                <tr key={person.id}>
                  <td>
                    <div className="person-cell">
                      <strong>
                        {person.name}
                        {person.id === youId ? <span className="you-mark">You</span> : null}
                      </strong>
                      <span className="cell-sub">{person.department}</span>
                    </div>
                  </td>
                  <td>{person.role}</td>
                  <td>
                    {person.city}, {person.country}
                  </td>
                  <td className="status-cell">
                    <StatusTag status={person.status} />
                  </td>
                  <td>{dateFmt(person.startDate)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
