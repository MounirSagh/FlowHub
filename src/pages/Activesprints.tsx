'use client'
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignOutButton,
  useSession,
} from '@clerk/clerk-react'
import React from 'react'
import SideBar from '@/components/SideBar'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { RiArrowUpDoubleFill } from 'react-icons/ri'
import { MdDensityMedium } from 'react-icons/md'
import { useSelectedProject } from '../context/selectedProject'

interface Ticket {
  id: number
  ticket_number: string
  ticket_name: string
  ticket_priority: string
  created_at: string
  due_at: string
  status: string
}

function Activesprint() {
  const { isSignedIn } = useSession()
  const { selectedProject } = useSelectedProject()
  console.log(selectedProject)
  const data: Ticket[] = [
    {
      id: 1,
      ticket_number: 'CICD-1',
      ticket_name: 'Create CI/CD Pipeline',
      ticket_priority: 'High',
      created_at: '2022-02-03',
      due_at: '2022-02-10',
      status: 'to do',
    },
    {
      id: 2,
      ticket_number: 'BUG-123',
      ticket_name: 'Fix Critical Bug',
      ticket_priority: 'Critical',
      created_at: '2022-02-01',
      due_at: '2022-02-08',
      status: 'to do',
    },
    {
      id: 3,
      ticket_number: 'FEATURE-456',
      ticket_name: 'Implement New Feature',
      ticket_priority: 'Medium',
      created_at: '2022-01-28',
      due_at: '2022-02-05',
      status: 'In progress',
    },
    {
      id: 4,
      ticket_number: 'TASK-789',
      ticket_name: 'Refactor Codebase',
      ticket_priority: 'Low',
      created_at: '2022-02-05',
      due_at: '2022-02-15',
      status: 'In progress',
    },
    {
      id: 8,
      ticket_number: 'CICD-1',
      ticket_name: 'Create CI/CD Pipeline',
      ticket_priority: 'High',
      created_at: '2022-02-03',
      due_at: '2022-02-10',
      status: 'to do',
    },
    {
      id: 9,
      ticket_number: 'BUG-123',
      ticket_name: 'Fix Critical Bug',
      ticket_priority: 'Critical',
      created_at: '2022-02-01',
      due_at: '2022-02-08',
      status: 'to do',
    },
    {
      id: 11,
      ticket_number: 'TASK-789',
      ticket_name: 'Refactor Codebase',
      ticket_priority: 'Low',
      created_at: '2022-02-05',
      due_at: '2022-02-15',
      status: 'done',
    },
    {
      id: 12,
      ticket_number: 'BUG-456',
      ticket_name: 'Investigate UI Issue',
      ticket_priority: 'High',
      created_at: '2022-02-10',
      due_at: '2022-02-20',
      status: 'done',
    },
    {
      id: 13,
      ticket_number: 'FEATURE-789',
      ticket_name: 'Enhance User Authentication',
      ticket_priority: 'Medium',
      created_at: '2022-02-15',
      due_at: '2022-02-25',
      status: 'done',
    },

    {
      id: 24,
      ticket_number: 'FEATURE-456',
      ticket_name: 'Implement New Feature',
      ticket_priority: 'Medium',
      created_at: '2022-01-28',
      due_at: '2022-02-05',
      status: 'to do',
    },
  ]
  const filterTickets = (status: string) => {
    return data.filter((ticket) => ticket.status === status)
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return <FaArrowUp color="red" />
      case 'critical':
        return <RiArrowUpDoubleFill size={24} color="red" />
      case 'medium':
        return <MdDensityMedium color="orange" size={20} />
      case 'low':
        return <FaArrowDown color="green" />
      default:
        return null
    }
  }

  const renderTicketCards = (status: string) => {
    const tickets = filterTickets(status)
    return tickets.map((ticket) => (
      <div key={ticket.id} className="p-4 border shadow-md rounded-md mb-2">
        <div className="flex items-center justify-between">
          <p className="font-bold">{ticket.ticket_number}</p>
          <p>{getPriorityIcon(ticket.ticket_priority)}</p>
        </div>
        <p className="text-sm font-light">{ticket.ticket_name}</p>
      </div>
    ))
  }

  return (
    <main>
      {isSignedIn && (
        <div className="flex h-screen">
          <SideBar />
          <div className=" w-screen overflow-y-scroll">
            <div className="p-4 border-b w-screen">
              <h1 className="text-xl font-bold mb-1">Last Sprint Name</h1>
              <p className="text-sm font-light">
                <span className="font-bold text-sm">due at: {''}</span>
                2022-05-11
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4">
              <div className="h-full border shadow-sm p-4">
                <h1 className="mb-2">To Do</h1>
                {renderTicketCards('to do')}
              </div>
              <div className="h-full border shadow-sm p-4">
                <h1 className="mb-2">In Progress</h1>
                {renderTicketCards('In progress')}
              </div>
              <div className="h-full border shadow-sm p-4">
                <h1 className="mb-2">Done</h1>
                {renderTicketCards('done')}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Activesprint
