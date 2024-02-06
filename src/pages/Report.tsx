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


function Report() {
  const { isSignedIn } = useSession()
  const { selectedProject } = useSelectedProject()
  console.log(selectedProject)
  return (
    <main>
      {isSignedIn && (
        <div className="flex h-screen">
          <SideBar />
          <div className=" w-screen p-8 overflow-y-scroll">
            <div>
             
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Report
