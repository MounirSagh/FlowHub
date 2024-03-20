import React, { useState } from 'react'
import {
  FaArrowDown,
  FaArrowUp,
  FaFilter,
  FaPencilAlt,
  FaRegComment,
} from 'react-icons/fa'
import SideBar from '@/components/Bars.tsx/SideBar'
import { useSession } from '@clerk/clerk-react'
import { Input } from '@/components/ui/input'
import { useSelectedProject } from '../context/selectedProject'
import { api } from '../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { MdDensityMedium } from 'react-icons/md'
import { RiArrowUpDoubleFill } from 'react-icons/ri'

interface Task {
  id: number
  title: string
  description: string
  priority: string
  sprintId: string
  status: string
  number: string
}

function Issue() {
  const { isSignedIn } = useSession()
  const { selectedProject } = useSelectedProject()
  const sprint = useQuery(api.Sprint.getLastSprint, {
    projectName: selectedProject ?? undefined,
  })
  const tasksofuser = useQuery(api.Task.getTasksofProject, {
    projectName: selectedProject ?? undefined,
  })

  const itemsPerPage = 8

  const [searchTerm, setSearchTerm] = useState('')
  const filteredData = tasksofuser?.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.number.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const [selectedItem, setSelectedItem] = useState<Task | null>(null)
  const handleItemClick = (item: Task) => {
    setSelectedItem(item)
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

  return (
    <main className="h-screen">
      {isSignedIn && (
        <div className="flex">
          <SideBar currentProject={selectedProject} />
          <div className="w-full overflow-hidden">
            {selectedProject ? (
              <div>
                <div className="p-4 border-b w-screen">
                  <h1 className="text-xl font-bold mb-1">My Open Issues</h1>
                </div>
                <div className="flex">
                  <div className="p-4 w-1/4 border-r">
                    <div className="mb-4 flex items-center justify-start gap-2">
                      <Input
                        type="email"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button className="hover:text-yellow-500 hover:-translate-y-1 duration-1000 shadow-lg ml-2">
                        <FaFilter size={18} />
                      </button>
                    </div>
                    <div>
                      {currentItems?.map((item: any) => (
                        <div
                          key={item.id}
                          className="cursor-pointer"
                          onClick={() => handleItemClick(item)}
                        >
                          <p className="">{item.number}</p>
                          <p className="text-xs font-light">{item.title}</p>
                          <hr className="border-t-1 w-full my-2" />
                        </div>
                      ))}
                    </div>
                    <div className=" ml-24 bottom-5 absolute">
                      {Array.from(
                        {
                          length: Math.ceil(
                            (filteredData?.length || 0) / itemsPerPage
                          ),
                        },
                        (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`mx-1 px-4 py-2 rounded ${
                              currentPage === i + 1 ? 'border' : ''
                            }`}
                          >
                            {i + 1}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  <div className="p-4 w-2/3 border-l mb-52">
                    {selectedItem && (
                      <div>
                        <div>
                          <p className="text-blue-500">{selectedItem.number}</p>
                          <p className="font-bold text-2xl">
                            {selectedItem.title}
                          </p>
                        </div>
                        <div className="flex items-center justify-start gap-2 mt-4">
                          <button className="flex items-center gap-2 px-4 py-1 border rounded-md hover:-translate-y-1 duration-1000 shadow-sm">
                            <FaPencilAlt /> Edit
                          </button>
                          <button className="flex items-center gap-2 px-4 py-1 border rounded-md hover:-translate-y-1 duration-1000 shadow-sm">
                            <FaRegComment /> Comment
                          </button>
                          <button className="px-4 py-1 border rounded-md hover:-translate-y-1 duration-1000 shadow-sm">
                            Assign
                          </button>
                          <button className="px-4 py-1 border rounded-md hover:-translate-y-1 duration-1000 shadow-sm">
                            In progress
                          </button>
                          <button className="px-4 py-1 border rounded-md hover:-translate-y-1 duration-1000 shadow-sm">
                            Done
                          </button>
                        </div>
                        <div className="flex items-start mt-2">
                          <div className="w-1/2">
                            <h1 className="text-lg font-semibold mb-2 mt-4">
                              Details
                            </h1>
                            <div className="flex flex-col gap-2 ml-4">
                              <div className="flex items-center gap-24">
                                <h1 className="text- font-light w-24">Type:</h1>
                                <h1 className="text-sm font-semibold">
                                  Coding
                                </h1>
                              </div>
                              <div className="flex items-center gap-24">
                                <h1 className="text- font-light w-24">
                                  Status:
                                </h1>
                                <h1 className="text-sm font-semibold bg-blue-500 text-white px-3 py-0.5 rounded-md">
                                  {selectedItem.status}
                                </h1>
                              </div>
                              <div className="flex items-center gap-24">
                                <h1 className="text- font-light w-24">
                                  Priority:
                                </h1>
                                <h1 className="flex items-center gap-2 text-sm font-semibold">
                                  {getPriorityIcon(selectedItem.priority)}{' '}
                                  {selectedItem.priority}
                                </h1>
                              </div>
                              <div className="flex items-center gap-24">
                                <h1 className="text- font-light w-24">
                                  Resolution:
                                </h1>
                                <h1 className="text-sm font-semibold">
                                  Unresolved
                                </h1>
                              </div>
                              <div className="flex items-center gap-24">
                                <h1 className="text- font-light w-24">
                                  Labels:
                                </h1>
                                <h1 className="text-sm font-semibold">None</h1>
                              </div>
                            </div>
                          </div>

                          <div className="w-1/2">
                            <h1 className="text-lg font-semibold mb-2 mt-4">
                              People
                            </h1>
                            <div className="flex flex-col gap-2 ml-4">
                              <div className="flex items-start gap-24 mb-2">
                                <h1 className="text- font-light w-24">
                                  Assignee:
                                </h1>
                                <div className="flex flex-col gap-2">
                                  <h1 className="text-sm font-semibold">
                                    Freindly Robot
                                  </h1>
                                  <h1 className="text-sm font-semibold text-blue-500">
                                    Assign to me
                                  </h1>
                                </div>
                              </div>
                              <div className="flex items-center gap-24">
                                <h1 className="text- font-light w-24">
                                  Reporter:
                                </h1>
                                <h1 className="text-sm font-semibold">
                                  John Smith
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start mt-2">
                          <div className="w-1/2">
                            <h1 className="text-lg font-semibold mb-2 mt-4">
                              Description
                            </h1>
                            <div className="flex flex-col gap-2 ml-4">
                              <h1 className="text-sm font-light w-80">
                                {selectedItem.description}
                              </h1>
                            </div>
                          </div>

                          <div className="w-1/2">
                            <h1 className="text-lg font-semibold mb-4 mt-4">
                              Dates
                            </h1>
                            <div className="ml-4">
                              <div className="flex items-start gap-24 mb-2">
                                <h1 className="text- font-light w-24">
                                  Created at:
                                </h1>
                                <h1 className="text-sm font-semibold">
                                  07 February 2024
                                </h1>
                              </div>
                              <div className="flex items-start gap-24 mb-2">
                                <h1 className="text- font-light w-24">
                                  Updated at:
                                </h1>
                                <h1 className="text-sm font-semibold">
                                  14 February 2024
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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

export default Issue
