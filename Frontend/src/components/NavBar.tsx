import React from 'react'
import { ModeToggle } from './mode-toggle'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react'

function NavBar() {
  return (
    <div className="border-b">
      <div className="h-16 container flex justify-between items-center">
        <div className="text-xl font-serif">FlowHub</div>
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton />
            <ModeToggle />
          </SignedIn>

          <SignedOut>
            <div className="bg-black py-2 px-6 rounded-lg text-white hover:bg-gray-700 duration-1000 hover:-translate-y-1">
              <SignInButton />
            </div>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}

export default NavBar
