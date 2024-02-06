import React, { PropsWithChildren, createContext, useContext, useState } from 'react'

interface SelectedProjectContextProps {
  selectedProject: string | null
  setSelectedProject: React.Dispatch<React.SetStateAction<string | null>>
}

const SelectedProjectContext = createContext<
  SelectedProjectContextProps | undefined
>(undefined)

export const SelectedProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }: PropsWithChildren) => {
    const [selectedProject, setSelectedProject] = useState<string | null>(null)
  
    return (
      <SelectedProjectContext.Provider
        value={{ selectedProject, setSelectedProject }}
      >
        {children}
      </SelectedProjectContext.Provider>
    )
}
  
export const useSelectedProject = () => {
  const context = useContext(SelectedProjectContext)
  if (!context) {
    throw new Error(
      'useSelectedProject must be used within a SelectedProjectProvider'
    )
  }
  return context
}
