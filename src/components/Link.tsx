import React, { useState } from 'react'
import { SignedOut, SignedIn } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import SideBar from '@/components/Bars.tsx/SideBar'
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useNavigate } from 'react-router-dom'

interface Link {
  title: string
  link: string
  [key: string]: string
}

export default function Link() {
  const { selectedProject } = useSelectedProject()
  const [links, setLinks] = useState<Link[]>([{ title: '', link: '' }])
  const navigate = useNavigate()

  const createLink = useMutation(api.Link.createLink)

  const handleAddLink = () => {
    setLinks([...links, { title: '', link: '' }])
  }

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...links]
    updatedLinks[index][field] = value
    setLinks(updatedLinks)
  }

  const handleSubmit = () => {
    if (selectedProject) {
      links.forEach((link) => {
        createLink({
          title: link.title,
          link: link.link,
          projectName: selectedProject,
        })
      })

      setLinks([{ title: '', link: '' }])

      navigate('/Active-Sprints')
    }
  }

  return (
    <main className="flex items-center justify-center mt-20">
      <SignedIn>
        <div className="flex">
          <div className="p-8">
            <Card className="w-[800px]">
              <CardHeader>
                <CardTitle>Add Link</CardTitle>
                <CardDescription>Add a Link for your project.</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                >
                  <div className="flex flex-col items-start gap-4">
                    <Accordion type="single" collapsible>
                      {links.map((link, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-4 w-[500px]"
                        >
                          <AccordionItem
                            key={index}
                            value={`item-${index + 1}`}
                          >
                            <AccordionTrigger>
                              Link {index + 1}
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 w-[500px] ml-4">
                              <div className="flex items-center gap-20">
                                <div className="flex flex-col space-y-1.5 w-[200px]">
                                  <Label htmlFor="taskNumber">Link Title</Label>
                                  <Input
                                    id="linktitle"
                                    placeholder="Enter Link Title"
                                    value={link.title}
                                    onChange={(e) =>
                                      handleLinkChange(
                                        index,
                                        'title',
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex flex-col space-y-1.5 w-[200px]">
                                  <Label htmlFor="taskTitle">Link</Label>
                                  <Input
                                    id="linklink"
                                    placeholder="Enter Link"
                                    value={link.link}
                                    onChange={(e) =>
                                      handleLinkChange(
                                        index,
                                        'link',
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
                      onClick={handleAddLink}
                    >
                      Add Link
                    </Label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </SignedIn>
    </main>
  )
}
