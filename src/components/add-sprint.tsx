import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { SignedOut, SignedIn } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import SideBar from '@/components/SideBar'
import { useSelectedProject } from '../context/selectedProject'
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
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface Task {
  title: string
  description: string
  priority: string
  number: string
  type: string
  [key: string]: string
}

function addsprint() {
  const { selectedProject } = useSelectedProject()
  const [sprintName, setSprintName] = useState('')
  const [sprintDate, setSprintDate] = useState<Date | null>(null)
  const [tasks, setTasks] = useState<Task[]>([
    { title: '', description: '', priority: '', number: '', type: '' },
  ])

  const createSprint = useMutation(api.Sprint.createSprint)
  const createTask = useMutation(api.Task.createTask)

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { title: '', description: '', priority: '', number: '', type: '' },
    ])
  }

  const handleTaskChange = (index: number, field: string, value: string) => {
    const updatedTasks = [...tasks]
    updatedTasks[index][field] = value
    setTasks(updatedTasks)
  }

  const handleSubmit = () => {
    if (selectedProject !== null) {
      createSprint({
        name: sprintName,
        due_at: sprintDate?.toString() || '',
        projectName: selectedProject,
      }).then((id) => {
        tasks.forEach((task) => {
          createTask({
            title: task.title,
            description: task.description,
            priority: task.priority,
            sprintId: id,
            status: 'to do',
            number: task.number,
            type: task.type,
          })
        })
      })

      setSprintName('')
      setSprintDate(null)
      setTasks([
        { title: '', description: '', priority: '', number: '', type: '' },
      ])
    }
  }

  return (
    <main>
      <SignedIn>
        {/* if selected project is null or empty string then display a simple div with text choose project */}
        <div className="flex h-screen">
          <SideBar />
          <div className="w-screen p-8 overflow-y-scroll">
            {selectedProject ? (
              <Card className="w-[800px] ">
                <CardHeader>
                  <CardTitle>Create Sprint</CardTitle>
                  <CardDescription>
                    Create a sprint for your project.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmit()
                    }}
                  >
                    <div className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-20">
                        <div className="flex flex-col space-y-1.5 w-[200px]">
                          <Label htmlFor="sprintName">Sprint Name</Label>
                          <Input
                            id="sprintName"
                            placeholder="Name of your sprint"
                            value={sprintName}
                            onChange={(e) => setSprintName(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="sprintDate">Sprint Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-[200px] justify-start text-left font-normal',
                                  !sprintDate && 'text-muted-foreground'
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {sprintDate ? (
                                  format(sprintDate, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={sprintDate}
                                onSelect={setSprintDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <Accordion type="single" collapsible>
                        {tasks.map((task, index) => (
                          <div
                            key={index}
                            className="flex flex-col gap-4 w-[500px]"
                          >
                            <AccordionItem key={index} value={`item-${index + 1}`}>
                              <AccordionTrigger>
                                Task {index + 1}
                              </AccordionTrigger>
                              <AccordionContent  className="flex flex-col gap-4 w-[500px]">
                                <div className="flex items-center gap-20">
                                  <div className="flex flex-col space-y-1.5 w-[200px]">
                                    <Label htmlFor="Task">Task Number</Label>
                                    <Input
                                      id="Task"
                                      placeholder="Number of your Task"
                                      value={task.number}
                                      onChange={(e) =>
                                        handleTaskChange(
                                          index,
                                          'number',
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1.5 w-[200px]">
                                    <Label htmlFor="Task">Task Title</Label>
                                    <Input
                                      id="Task"
                                      placeholder="Title of your Task"
                                      value={task.title}
                                      onChange={(e) =>
                                        handleTaskChange(
                                          index,
                                          'tilte',
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center gap-20">
                                  <div className="flex flex-col space-y-1.5 w-[200px]">
                                    <Label htmlFor="Task">Task Type</Label>
                                    <Input
                                      id="Task"
                                      placeholder="Type of your Task"
                                      value={task.type}
                                      onChange={(e) =>
                                        handleTaskChange(
                                          index,
                                          'type',
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>

                                  <div className="flex flex-col space-y-1.5 w-[200px]">
                                    <Label htmlFor="Task">
                                      Task Description
                                    </Label>
                                    <Input
                                      id="Task"
                                      placeholder="Description of your Task"
                                      value={task.description}
                                      onChange={(e) =>
                                        handleTaskChange(
                                          index,
                                          'description',
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="flex items-center gap-20">
                                  <div className="flex flex-col space-y-1.5 w-[200px]">
                                    <Label htmlFor="Task">
                                      Task Description
                                    </Label>
                                    <Input
                                      id="Task"
                                      placeholder="Description of your Task"
                                      value={task.description}
                                      onChange={(e) =>
                                        handleTaskChange(
                                          index,
                                          'description',
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-1.5 w-[200px]">
                                    <Label htmlFor="Task">Task Priority</Label>
                                    <Input
                                      id="Task"
                                      placeholder="Priority of your Task"
                                      value={task.priority}
                                      onChange={(e) =>
                                        handleTaskChange(
                                          index,
                                          'priority',
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </div>
                        ))}
                      </Accordion>

                      <Label
                        className="flex flex-col space-y-1.5 border p-2 rounded-md"
                        onClick={handleAddTask}
                      >
                        Add Task
                      </Label>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create</Button>
                </CardFooter>
              </Card>
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

export default addsprint
