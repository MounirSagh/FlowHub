import React, { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { FaChartLine, FaRegMap, FaListUl, FaPlus } from 'react-icons/fa'
import { MdOutlineAssignment } from 'react-icons/md'
import { TbPointFilled } from 'react-icons/tb'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface NavBarProps {
  className?: string
}

const navigationItems = [
  { label: 'Roadmap', path: '/Roadmap', icon: <FaRegMap size={18} /> },
  {
    label: 'Active sprint',
    path: '/Active-Sprints',
    icon: <FaListUl size={18} />,
  },
  { label: 'Reports', path: '/Reports', icon: <FaChartLine size={18} /> },
  { label: 'Issues', path: '/Issues', icon: <MdOutlineAssignment size={22} /> },
]

const NavBarElement = ({ item, currentPath, selectedProject }: any) => {
  const isCurrent = item.path === currentPath
  const linkPath = selectedProject ? `${item.path}/${selectedProject}` : item.path;

  return (
    <Link
      to={linkPath}
      className={`${
        isCurrent ? '' : ''
      } h-14 flex flex-row justify-between ml-6 items-center rounded-lg gap-2`}
    >
      <div
        className={`${
          isCurrent && ''
        } flex items-center gap-2 transition duration-300 rounded-full`}
      >
        {item.icon}
        <p className={` ${isCurrent ? '' : ''} info`}>{item.label}</p>
      </div>
      <TbPointFilled
        className={`${
          isCurrent ? '' : 'text-transparent'
        } transition duration-300 info mr-4`}
      />
    </Link>
  )
}

const LeftSideBar: React.FC<NavBarProps> = ({ className }) => {
  const location = useLocation()
  const ProjectofUser = useQuery(api.Project.getProject)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const handleProjectChange = (selectedValue: string) => {
    setSelectedProject(selectedValue)
  }
  return (
    <div
      className={`w-[16vw] relative flex flex-col pt-4 h-screen border-r ml-6 ${className}`}
    >
      <div className="pb-4 border-b">
        <span className="flex items-center justify-start bg-transparent font-bold opacity-75 cursor-default text-sm mb-2">
          Projects
        </span>
        <Select onValueChange={handleProjectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ProjectofUser?.map((project: any) => {
                return (
                  <SelectItem
                    value={project.name}
                    key={project._id}
                    className=""
                  >
                    <h1>{project.name}</h1>
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <span className="flex items-center justify-start bg-transparent font-bold opacity-75 cursor-default text-sm">
          Planning
        </span>
        <aside className="flex flex-col w-full ">
          {navigationItems.map((item, index) => (
            <NavBarElement
              item={item}
              currentPath={location.pathname}
              key={index}
            />
          ))}
        </aside>
      </div>

      <div className="flex flex-col gap-4">
        <span className="flex items-center justify-start bg-transparent font-bold opacity-75 cursor-default mt-8 text-sm">
          Project Shortcuts
        </span>
        <h3 className="text-sm font-extralight">
          Add a link to useful information to your whole team to see
        </h3>
        <div className="flex items-center gap-2">
          <FaPlus size={18} className="font-extralight" />
          <span className="text-sm font-extralight">Add link</span>
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar
