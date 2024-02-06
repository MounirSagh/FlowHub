import React from 'react'
import { ModeToggle } from './mode-toggle'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
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
        </div>
      </div>
    </div>
  )
}

export default NavBar
