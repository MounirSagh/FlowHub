import React, { useState } from 'react'
import { SignedIn } from '@clerk/clerk-react'
import SideBar from '@/components/SideBar'
import { useSelectedProject } from '../context/selectedProject'

function Roadmap() {
  const { selectedProject } = useSelectedProject()


  return (
    <main>
      <SignedIn>      
        <div className="flex h-screen">
          <SideBar />
          <div className="w-screen p-8 overflow-y-scroll">
            {selectedProject ? (
              <div>
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

