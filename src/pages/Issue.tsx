import React, { useState } from 'react'
import { FaFilter, FaPlusCircle } from 'react-icons/fa'
import SideBar from '@/components/SideBar'
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignOutButton,
  useSession,
} from '@clerk/clerk-react'

interface Ticket {
  id: number
  ticket_number: string
  ticket_name: string
  ticket_priority: string
  created_at: string
  due_at: string
}

function Issue() {
  const { isSignedIn } = useSession()
  const itemsPerPage = 8

  const data: Ticket[] = [
    {
      id: 1,
      ticket_number: 'CICD-1',
      ticket_name: 'Create CI/CD Pipeline',
      ticket_priority: 'High',
      created_at: '2022-02-03',
      due_at: '2022-02-10',
    },
    {
      id: 2,
      ticket_number: 'BUG-123',
      ticket_name: 'Fix Critical Bug',
      ticket_priority: 'Critical',
      created_at: '2022-02-01',
      due_at: '2022-02-08',
    },
    {
      id: 3,
      ticket_number: 'FEATURE-456',
      ticket_name: 'Implement New Feature',
      ticket_priority: 'Medium',
      created_at: '2022-01-28',
      due_at: '2022-02-05',
    },
    {
      id: 4,
      ticket_number: 'TASK-789',
      ticket_name: 'Refactor Codebase',
      ticket_priority: 'Low',
      created_at: '2022-02-05',
      due_at: '2022-02-15',
    },
    {
      id: 5,
      ticket_number: 'BUG-456',
      ticket_name: 'Investigate UI Issue',
      ticket_priority: 'High',
      created_at: '2022-02-10',
      due_at: '2022-02-20',
    },
    {
      id: 6,
      ticket_number: 'FEATURE-789',
      ticket_name: 'Enhance User Authentication',
      ticket_priority: 'Medium',
      created_at: '2022-02-15',
      due_at: '2022-02-25',
    },
    {
      id: 7,
      ticket_number: 'TASK-234',
      ticket_name: 'Update Documentation',
      ticket_priority: 'Low',
      created_at: '2022-02-20',
      due_at: '2022-03-01',
    },
    {
      id: 8,
      ticket_number: 'CICD-1',
      ticket_name: 'Create CI/CD Pipeline',
      ticket_priority: 'High',
      created_at: '2022-02-03',
      due_at: '2022-02-10',
    },
    {
      id: 9,
      ticket_number: 'BUG-123',
      ticket_name: 'Fix Critical Bug',
      ticket_priority: 'Critical',
      created_at: '2022-02-01',
      due_at: '2022-02-08',
    },
    {
      id: 10,
      ticket_number: 'FEATURE-456',
      ticket_name: 'Implement New Feature',
      ticket_priority: 'Medium',
      created_at: '2022-01-28',
      due_at: '2022-02-05',
    },
    {
      id: 11,
      ticket_number: 'TASK-789',
      ticket_name: 'Refactor Codebase',
      ticket_priority: 'Low',
      created_at: '2022-02-05',
      due_at: '2022-02-15',
    },
    {
      id: 12,
      ticket_number: 'BUG-456',
      ticket_name: 'Investigate UI Issue',
      ticket_priority: 'High',
      created_at: '2022-02-10',
      due_at: '2022-02-20',
    },
    {
      id: 13,
      ticket_number: 'FEATURE-789',
      ticket_name: 'Enhance User Authentication',
      ticket_priority: 'Medium',
      created_at: '2022-02-15',
      due_at: '2022-02-25',
    },
    {
      id: 14,
      ticket_number: 'TASK-234',
      ticket_name: 'Update Documentation',
      ticket_priority: 'Low',
      created_at: '2022-02-20',
      due_at: '2022-03-01',
    },
    {
      id: 15,
      ticket_number: 'CICD-1',
      ticket_name: 'Create CI/CD Pipeline',
      ticket_priority: 'High',
      created_at: '2022-02-03',
      due_at: '2022-02-10',
    },
    {
      id: 16,
      ticket_number: 'BUG-123',
      ticket_name: 'Fix Critical Bug',
      ticket_priority: 'Critical',
      created_at: '2022-02-01',
      due_at: '2022-02-08',
    },
    {
      id: 17,
      ticket_number: 'FEATURE-456',
      ticket_name: 'Implement New Feature',
      ticket_priority: 'Medium',
      created_at: '2022-01-28',
      due_at: '2022-02-05',
    },
    {
      id: 18,
      ticket_number: 'TASK-789',
      ticket_name: 'Refactor Codebase',
      ticket_priority: 'Low',
      created_at: '2022-02-05',
      due_at: '2022-02-15',
    },
    {
      id: 19,
      ticket_number: 'BUG-456',
      ticket_name: 'Investigate UI Issue',
      ticket_priority: 'High',
      created_at: '2022-02-10',
      due_at: '2022-02-20',
    },
    {
      id: 20,
      ticket_number: 'FEATURE-789',
      ticket_name: 'Enhance User Authentication',
      ticket_priority: 'Medium',
      created_at: '2022-02-15',
      due_at: '2022-02-25',
    },
    {
      id: 21,
      ticket_number: 'TASK-234',
      ticket_name: 'Update Documentation',
      ticket_priority: 'Low',
      created_at: '2022-02-20',
      due_at: '2022-03-01',
    },
    {
      id: 22,
      ticket_number: 'CICD-1',
      ticket_name: 'Create CI/CD Pipeline',
      ticket_priority: 'High',
      created_at: '2022-02-03',
      due_at: '2022-02-10',
    },
    {
      id: 23,
      ticket_number: 'BUG-123',
      ticket_name: 'Fix Critical Bug',
      ticket_priority: 'Critical',
      created_at: '2022-02-01',
      due_at: '2022-02-08',
    },
    {
      id: 24,
      ticket_number: 'FEATURE-456',
      ticket_name: 'Implement New Feature',
      ticket_priority: 'Medium',
      created_at: '2022-01-28',
      due_at: '2022-02-05',
    },
    {
      id: 25,
      ticket_number: 'TASK-789',
      ticket_name: 'Refactor Codebase',
      ticket_priority: 'Low',
      created_at: '2022-02-05',
      due_at: '2022-02-15',
    },
    {
      id: 26,
      ticket_number: 'BUG-456',
      ticket_name: 'Investigate UI Issue',
      ticket_priority: 'High',
      created_at: '2022-02-10',
      due_at: '2022-02-20',
    },
    {
      id: 27,
      ticket_number: 'FEATURE-789',
      ticket_name: 'Enhance User Authentication',
      ticket_priority: 'Medium',
      created_at: '2022-02-15',
      due_at: '2022-02-25',
    },
    {
      id: 28,
      ticket_number: 'TASK-234',
      ticket_name: 'Update Documentation',
      ticket_priority: 'Low',
      created_at: '2022-02-20',
      due_at: '2022-03-01',
    },
  ]
  const [searchTerm, setSearchTerm] = useState('')
  const [dueAtFilter, setDueAtFilter] = useState<string | null>(null)
  const [createdAtFilter, setCreatedAtFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null)

  const filteredData = data.filter(
    (item) =>
      item.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ticket_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const [selectedItem, setSelectedItem] = useState<Ticket | null>(null)
  const handleItemClick = (item: any) => {
    setSelectedItem(item)
  }

  return (
    <main>
      {isSignedIn && (
        <div className="flex h-screen">
          <SideBar />
          <div className="w-full overflow-y-scroll">
            <div className="p-4 border-b w-screen">
              <h1 className="text-xl font-bold mb-1">My Open Issues</h1>
            </div>
            <div className="flex items-center">
              <div className="p-4 w-1/4 border-r h-screen">
                <div className="mb-4 flex items-center justify-start gap-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 px-6 mr-2 rounded-xl"
                  />
                  <button className="text-yellow-500 hover:text-yellow-700 hover:-translate-y-1 duration-1000 shadow-lg">
                    <FaFilter size={18} />
                  </button>
                  <button className="text-green-500  hover:text-green-700 hover:-translate-y-1 duration-1000 shadow-lg">
                    <FaPlusCircle size={20} />
                  </button>
                </div>
                <div>
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      className={`cursor-pointer ${
                        selectedItem &&
                        selectedItem.id === item.id &&
                        'font-bold'
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      <p className="">{item.ticket_number}</p>
                      <p className="text-xs font-light">{item.ticket_name}</p>
                      <hr className="border-t-1 w-full my-2" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 ml-10 flex justify-center items-center bottom-10 absolute">
                  {/* Pagination Controls */}
                  {Array.from(
                    { length: Math.ceil(filteredData.length / itemsPerPage) },
                    (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 px-4 py-2  rounded ${
                          currentPage === i + 1 ? 'border' : ''
                        }`}
                      >
                        {i + 1}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="p-4 w-2/3 border-l h-screen">
                <h1>Details section</h1>
                {selectedItem && (
                  <div>
                    <p className="font-bold">{selectedItem.ticket_number}</p>
                    <p>{selectedItem.ticket_name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Issue
