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
import { useSelectedProject } from '../context/selectedProject'
import { api } from '../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { FaClipboardList, FaTasks, FaCheckCircle } from 'react-icons/fa'
import Table from '@/components/table'

function Report() {
  const { isSignedIn } = useSession()
  const { selectedProject } = useSelectedProject()
  console.log('HHHHHHHHHHHHHHH', selectedProject)
  const sprintnum = useQuery(api.Analytics.getSprintsByProject, {
    projectName: selectedProject ?? undefined,
  })
  const taskcompeletionrate = useQuery(
    api.Analytics.getTaskCompletionRateByProject,
    {
      projectName: selectedProject ?? undefined,
    }
  )
  const tasknum = useQuery(api.Analytics.getTasksByProject, {
    projectName: selectedProject ?? undefined,
  })
  const lastsprints = useQuery(api.Analytics.getLastFiveSprints, {
    projectName: selectedProject ?? undefined,
  })

  const distributionbytype = useQuery(
    api.Analytics.getTasksByTypeDistribution,
    {
      projectName: selectedProject ?? undefined,
    }
  )
  const distributionbypriority = useQuery(
    api.Analytics.getTasksByPriorityDistribution,
    {
      projectName: selectedProject ?? undefined,
    }
  )

  console.log('AAAAAAAAAAAAAAA', sprintnum)
  console.log('BBBBBBBBBBBBBBB', taskcompeletionrate)
  console.log('CCCCCCCCCCCCCCC', tasknum)
  console.log('EEEEEEEEEEEEEEE', distributionbypriority)
  console.log('FFFFFFFFFFFFFFF', distributionbytype)

  return (
    <main className="h-screen">
      {isSignedIn && (
        <div className="flex">
          <SideBar currentProject={selectedProject} />
          <div className=" w-screen p-8 overflow-y-scroll">
            {selectedProject ? (
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3 flex flex-col gap-4 w-full h-full">
                  {/* CARDS */}
                  <div className="row-span-1 grid grid-cols-3 gap-4">
                    <div className="grid grid-rows-3 p-4 shadow-lg rounded-lg border">
                      <FaClipboardList
                        size={40}
                        className="text-green-500 bg-green-200 p-2 rounded-lg"
                      />
                      <h1 className="text-3xl font-semibold text-green-500">
                        {sprintnum}+
                      </h1>
                      <h1 className="text-sm text-gray-500">
                        Total Number of Sprints
                      </h1>
                    </div>
                    <div className="grid grid-rows-3 p-4 shadow-lg rounded-lg border">
                      <FaTasks
                        size={37}
                        className="text-blue-500 bg-blue-200 p-2 rounded-lg"
                      />
                      <h1 className="text-3xl font-semibold text-blue-500">
                        {tasknum}+
                      </h1>
                      <h1 className="text-sm text-gray-500">
                        Total Number of Tasks
                      </h1>
                    </div>
                    <div className="grid grid-rows-3 p-4 shadow-lg rounded-lg border">
                      <FaCheckCircle
                        size={40}
                        className="text-yellow-500 bg-yellow-200 p-2 rounded-lg"
                      />
                      <h1 className="text-3xl font-semibold text-yellow-500">
                        {taskcompeletionrate} %
                      </h1>
                      <h1 className="text-sm text-gray-500">
                        Task Completion Rate
                      </h1>
                    </div>
                  </div>
                  {/* CHART */}
                  <div className="row-span-1">
                    <div className="h-[400px] rounded-lg border p-4 shadow-lg">
                      Chart 1
                    </div>
                  </div>
                  {/* TABLE */}
                  <div className="row-span-1 p-4 shadow-lg rounded-lg border">
                    <Table />
                  </div>
                </div>
                <div className="col-span-2 grid grid-rows-2 gap-4">
                  <div className="p-4 rounded-lg border shadow-lg">CHART2</div>
                  <div className="p-4 rounded-lg border shadow-lg">CHART3</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center text-sm">
                No project has been chosen
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default Report
