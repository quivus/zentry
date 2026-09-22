import { useAuth } from '../../../hooks/useAuth'
import { useData } from '../../../hooks/useData'
import { payrollPeriod } from '../../../data/mock'
import { money } from '../../../services/format'
import type { Employee } from '../../../types'
import { StatusTag } from '../../../components/ui/StatusTag'

type PayslipPanelProps = {
  me: Employee
}

export function PayslipPanel({ me }: PayslipPanelProps) {
  const { user } = useAuth()
  const { payroll } = useData()
  const myPay = payroll.find((item) => item.employeeId === user?.employeeId)

  return (
    <section className="panel payslip">
      <header className="panel-head">
        <h2>{payrollPeriod.label}</h2>
        <p>
          {me.name} · {me.role}
        </p>
      </header>
      {myPay ? (
        <dl className="payslip-grid">
          <div>
            <dt>Gross</dt>
            <dd className="money">{money(myPay.gross)}</dd>
          </div>
          <div>
            <dt>Deductions</dt>
            <dd className="money">{money(myPay.deductions)}</dd>
          </div>
          <div>
            <dt>Net</dt>
            <dd className="money">{money(myPay.net)}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd className="payslip-status">
              <StatusTag status={myPay.status} />
            </dd>
          </div>
        </dl>
      ) : null}
    </section>
  )
}
