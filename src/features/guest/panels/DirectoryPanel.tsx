import { DirectoryTable } from '../../../components/ui/DirectoryTable'
import { useAuth } from '../../../hooks/useAuth'
import { useData } from '../../../hooks/useData'

export function DirectoryPanel() {
  const { user } = useAuth()
  const { employees } = useData()
  return (
    <DirectoryTable
      title="Company directory"
      hint="Read-only"
      people={employees}
      youId={user?.employeeId}
    />
  )
}
