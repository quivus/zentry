import { useData } from '../../../hooks/useData'
import { payrollPeriod } from '../../../data/mock'
import { dateFmt, money } from '../../../services/format'
import { StatusTag } from '../../../components/ui/StatusTag'

export function PayrollPanel() {
  const { employees, payroll } = useData()

  return (
    <section className="panel">
      <header className="panel-head">
        <h2>{payrollPeriod.label}</h2>
        <p>Pay date {dateFmt(payrollPeriod.payDate)}</p>
      </header>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payroll.map((row) => {
              const person = employees.find((item) => item.id === row.employeeId)
              if (!person) return null
              return (
                <tr key={row.employeeId}>
                  <td>
                    {person.name}
                    <span className="cell-sub">{person.country}</span>
                  </td>
                  <td className="money">{money(row.gross)}</td>
                  <td className="money">{money(row.deductions)}</td>
                  <td className="money">{money(row.net)}</td>
                  <td>
                    <StatusTag status={row.status} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
