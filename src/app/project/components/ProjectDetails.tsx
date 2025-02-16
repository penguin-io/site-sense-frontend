import type React from "react"

interface ProjectDetailsProps {
  name: string
  location: string
  activeWorksites: number
  totalWorksites: number
  parentCompany: string
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  name,
  location,
  activeWorksites,
  totalWorksites,
  parentCompany,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Project Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Name:</p>
          <p>{name}</p>
        </div>
        <div>
          <p className="font-semibold">Location:</p>
          <p>{location}</p>
        </div>
        <div>
          <p className="font-semibold">Active Worksites:</p>
          <p>
            {activeWorksites} / {totalWorksites}
          </p>
        </div>
        <div>
          <p className="font-semibold">Parent Company:</p>
          <p>{parentCompany}</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails

