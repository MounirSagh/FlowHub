import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Label } from '@radix-ui/react-label'
import { useSelectedProject } from '../context/selectedProject'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { MdDensityMedium } from 'react-icons/md'
import { RiArrowUpDoubleFill } from 'react-icons/ri'

export default function TableDemo() {
  const { selectedProject } = useSelectedProject()
  const lasttentasks = useQuery(api.Analytics.getLastTenTasks, {
    projectName: selectedProject ?? undefined,
  })

  // Function to get priority color based on priority level
  const getPriority = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return (
          <RiArrowUpDoubleFill
            size={40}
            className="flex items-center justify-center text-red-500"
          />
        )
      case 'high':
        return (
          <FaArrowUp
            size={25}
            className="flex items-center justify-center text-red-500 ml-1.5 "
          />
        )
      case 'medium':
        return (
          <MdDensityMedium
            size={25}
            className="flex items-center justify-center text-yellow-500 ml-1.5"
          />
        )
      case 'low':
        return (
          <FaArrowDown
            size={25}
            className="flex items-center justify-center text-green-500 ml-1.5"
          />
        )
      default:
        return ''
    }
  }

  return (
    <div>
      <Label className="font-semibold text-lg">Recent Tasks</Label>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lasttentasks?.map((task) => (
            <TableRow key={task._id}>
              <TableCell className="font-medium">{task.number}</TableCell>
              <TableCell>{task.type}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <h1>{getPriority(task.priority)}</h1>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
