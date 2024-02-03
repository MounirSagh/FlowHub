'use client'
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

function Roadmap() {
  const { isSignedIn } = useSession()
  const createTask = useMutation(api.Tasks.createTask)
  const tasksofuser = useQuery(api.Tasks.getTasksofUser)
  const alltasks = useQuery(api.Tasks.getAllTasks)

  return (
    <main>
      {isSignedIn && (
        <div className="flex h-screen">
          <SideBar />
          <div className=" w-screen p-8 overflow-y-scroll">
            <div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.target as HTMLFormElement
                  const formData = new FormData(e.currentTarget)
                  const title = formData.get('title') as string
                  await createTask({
                    title,
                  })
                  form.reset()
                }}
              >
                <label>Title</label>
                <input name="title" className="text-black"></input>
                <button>Create</button>
              </form>
              {tasksofuser?.map((task: any) => {
                return (
                  <div key={task._id} className="bg-black text-white">
                    <h1>Your TASKS</h1>
                    <h1>{task.title}</h1>
                  </div>
                )
              })}
              {alltasks?.map((task: any) => {
                return (
                  <div key={task._id} className="bg-gray-200 text-black">
                    <h1>ALL TASKS</h1>
                    <h1>{task.title}</h1>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Roadmap
