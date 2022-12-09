import React from 'react'
import { Link } from 'react-router-dom'

function ProjectCard({project}) {
  return (
    <div className="col-md-6 mt-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{project.name}</h5>
            <Link to={`/projects/${project.id}`}><button className="btn btn-dark">View</button></Link>
          </div>
          <p className='small'>
            Status: <strong>{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard