import { DirectoryTable } from '../../../components/ui/DirectoryTable'
import { useData } from '../../../hooks/useData'

export function PeoplePanel() {
  const { employees } = useData()
  return <DirectoryTable title="Directory" people={employees} />
}
