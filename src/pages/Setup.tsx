import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MdCancel } from 'react-icons/md'
import { api } from '../../convex/_generated/api'
import { useMutation } from 'convex/react'
import { Id } from '../../convex/_generated/dataModel'
import { useNavigate } from 'react-router-dom'

// interface Users {
//   id: number
//   name: string
// }

export function Setup() {

    // const data: Users[] = [
    //   {
    //     id: 1,
    //     name: 'Mounir Saghfary',
    //   },
    //   {
    //     id: 2,
    //     name: 'Ahmed Sabiri',
    //   },
    //   {
    //     id: 3,
    //     name: 'Kamal El Aouni',
    //   },
    //   {
    //     id: 4,
    //     name: 'Malak Zitouni',
    //   },
    //   {
    //     id: 5,
    //     name: 'Youssra Hanaf',
    //   },
    //   {
    //     id: 6,
    //     name: 'Mouad Chahid',
    //   },
    // ]

    // const [inviteInput, setInviteInput] = useState('')
    // const [selectedUsers, setSelectedUsers] = useState<Users[]>([])
    // const [filteredData, setFilteredData] = useState<Users[]>([])

    // const handleInviteInputChange = (value: string) => {
    //   setInviteInput(value)
    //   // Filter data based on user input
    //   const filteredUsers = data.filter((user) =>
    //     user.name.toLowerCase().includes(value.toLowerCase())
    //   )
    //   setFilteredData(filteredUsers)
    // }

    // const handleUserSelect = (user: Users) => {
    //   // Add the selected user to the list
    //   setSelectedUsers((prevUsers) => [...prevUsers, user])
    //   // Clear the input and filtered data
    //   setInviteInput('')
    //   setFilteredData([])
    // }

    // const handleUserRemove = (user: Users) => {
    //   // Remove the selected user from the list
    //   setSelectedUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id))
    // }


  const [organizationName, setOrganizationName] = useState('')
  const [projectName, setProjectName] = useState('')
  const navigate = useNavigate()

  const createOrganization = useMutation(api.Organization.createOrganization)
  const createProject = useMutation(api.Project.createProject)

  const handleSubmit = async () => {
    try {
      console.log('Submit button clicked')
      createOrganization({
        name: organizationName,
      }).then((id) => {
        createProject({
          name: projectName,
          organizationId: id,
        })
      })
      navigate('/Roadmap')
    } catch (error) {
      console.error('Error during submission:', error)
    }
  }

  return (
    <main className="h-full overflow-hidden mt-40">
      <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
        <Card className="w-[500px] ">
          <CardHeader>
            <CardTitle>Create Organization</CardTitle>
            <CardDescription>
              Empowering your team with seamless collaboration and productivity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="organizationName">Name</Label>
                  <Input
                    id="organizationName"
                    placeholder="Name of your organization"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="projectName">New Project</Label>
                  <Input
                    id="projectName"
                    placeholder="Name of your project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                 {/* <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="inviteInput">Invite Team Members</Label>
                  <Input
                    id="inviteInput"
                    placeholder="Enter Name of your team member"
                    value={inviteInput}
                    onChange={(e) => handleInviteInputChange(e.target.value)}
                  />
                  {filteredData.map((user) => (
                    <div key={user.id} onClick={() => handleUserSelect(user)}>
                      {user.name}
                    </div>
                  ))}
                </div>

                <div className="flex space-x-1.5 ">
                  {selectedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="border p-2 flex gap-1 items-center"
                      onClick={() => handleUserRemove(user)}
                    >
                      {user.name} <MdCancel className="mt-1" size={20} />
                    </div>
                  ))}
                </div> */}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmit}>Create</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
