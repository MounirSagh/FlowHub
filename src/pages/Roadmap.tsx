import React, { useState } from 'react'
import { SignedIn } from '@clerk/clerk-react'
import SideBar from '@/components/SideBar'
import { useSelectedProject } from '../context/selectedProject'
import Sprint from '@/components/Sprint'

function Roadmap() {
  const { selectedProject } = useSelectedProject()
  console.log(selectedProject)

  return (
    <main className="h-screen">
      <SignedIn>
        <div className="flex">
          <SideBar currentProject={selectedProject} />
          <div className="w-screen p-8 overflow-hidden">
            {selectedProject ? (
              <div>
                <Sprint />
              </div>
            ) : (
              <div className="flex items-center text-sm">
                No project has been chosen
              </div>
            )}
          </div>
        </div>
      </SignedIn>
    </main>
  )
}

export default Roadmap
