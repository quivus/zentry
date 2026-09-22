import { useData } from '../../../hooks/useData'
import { dateFmt } from '../../../services/format'
import { StatusTag } from '../../../components/ui/StatusTag'

export function BookingsPanel() {
  const { employees, bookings } = useData()

  function personName(id: string) {
    return employees.find((item) => item.id === id)?.name ?? 'Unknown'
  }

  return (
    <section className="panel">
      <header className="panel-head">
        <h2>Workplace bookings</h2>
        <p>{bookings.length} records</p>
      </header>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Room</th>
              <th>When</th>
              <th>Host</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.room}</td>
                <td>
                  {dateFmt(item.date)} · {item.start}–{item.end}
                </td>
                <td>{personName(item.hostId)}</td>
                <td>
                  <StatusTag status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
