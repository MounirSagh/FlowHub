'use client'
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignOutButton,
  useSession,
} from '@clerk/clerk-react'
import React, { useState, useEffect } from 'react'
import SideBar from '@/components/SideBar'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { RiArrowUpDoubleFill } from 'react-icons/ri'
import { MdDensityMedium } from 'react-icons/md'
import { useSelectedProject } from '../context/selectedProject'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

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
  const sprint = useQuery(api.Sprint.getLastSprint, {
    projectName: selectedProject ?? undefined,
  })
  const tasks = useQuery(api.Task.getTasksofUser)
  const filteredTasks = tasks?.filter((task) => task.sprintId === sprint?._id)

  const filterTicketsbystatus = (status: string) => {
    return filteredTasks?.filter((ticket) => ticket.status === status)
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
    const tickets = filterTicketsbystatus(status)
    return tickets?.map((ticket) => (
      <div key={ticket._id} className="p-4 border shadow-md rounded-md mb-2">
        <div className="flex items-center justify-between">
          <p className="font-bold">{ticket.number}</p>
          <p>{getPriorityIcon(ticket.priority)}</p>
        </div>
        <p className="text-sm font-light">{ticket.title}</p>
      </div>
    ))
  }

  return (
    <main className="h-screen">
      {isSignedIn && (
        <div className="flex">
          <SideBar currentProject={selectedProject} />
          <div className=" w-screen overflow-hidden">
            {selectedProject && sprint ? (
              <div>
                <div className="p-4 border-b w-screen">
                  <h1 className="text-xl font-bold mb-1">
                    {selectedProject} {''}
                    <span className="font-light">
                      {''} / {sprint?.name}
                    </span>
                  </h1>
                  <p className="text-sm font-light">
                    <span className="font-bold text-sm">due at: {''}</span>
                    {sprint?.due_at}
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
              </div>
            ) : (
              <div className="flex items-center text-sm p-8">
                No project has been chosen
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default Activesprint
