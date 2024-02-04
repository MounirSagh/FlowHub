import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignOutButton,
  useSession,
} from '@clerk/clerk-react'
import { useMutation, useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../convex/_generated/api'
import SideBar from '@/components/SideBar'
import landing from '../../public/images/landing.png'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const { isSignedIn } = useSession()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/Setup')
  }

  return (
    <main className="h-full overflow-hidden">
      <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
        <div className="flex flex-col items-center justify-center w-1/3 ml-10 z-10">
          <h1 className="text-6xl font-extrabold mb-4 text-center">
            Teamwork to find Solution. Welcome to{' '}
            <span className="underline">FlowHub</span>.
          </h1>

          <p className="text-3xl mb-8 text-center ">
            Empowering your team with seamless collaboration and productivity.
          </p>

          <button className="flex space-x-4">
            {isSignedIn ? (
              <div
                onClick={handleClick}
                className="bg-black py-2 px-10 rounded-lg text-white hover:bg-gray-700 duration-1000 hover:-translate-y-1"
              >
                Get Started
              </div>
            ) : (
              <div className="bg-black py-2 px-10 rounded-lg text-white hover:bg-gray-700 duration-1000 hover:-translate-y-1">
                <SignInButton />
              </div>
            )}
          </button>
        </div>
        <div className="flex justify-end w-2/3 z-0">
          <img
            src={landing}
            height={700}
            width={920}
            alt="Description of the image"
          />
        </div>

        <div className="circlePosition w-[590px] h-[400px] bg-[#eb26fd] rounded-[100%] absolute z-1 top-[70%] left-[25%] translate-x-[-50%] translate-y-[-50%] blur-[90px]"></div>
        <div className="circlePosition w-[400px] h-[300px] bg-[#a78bfa] rounded-[100%] absolute z-1 top-[90%] left-[100%] translate-x-[-50%] translate-y-[-50%] blur-[90px]"></div>
        <div className="circlePosition w-[400px] h-[300px] bg-[#93c5fd] rounded-[100%] absolute z-1 top-[100%] left-[0%] translate-x-[-50%] translate-y-[-50%] blur-[90px]"></div>
        <div className="circlePosition w-[300px] h-[200px] bg-[#6366f1] rounded-[100%] absolute z-1 top-[40%] left-[40%] translate-x-[-50%] translate-y-[-50%] blur-[90px]"></div>
        {/* Add more balls with different colors or adjust positions as needed */}
      </div>
    </main>
  )
}

export default Landing
