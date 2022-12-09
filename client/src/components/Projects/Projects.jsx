import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_PROJECTS } from '../../queries/projectQueries'
import Loading from '../Helper/Loading'
import ProjectCard from './ProjectCard'

function Projects() {
  const { data, loading, error } = useQuery(GET_PROJECTS)
  if (loading) return <Loading />
  if (error) return <p>{error.message}</p>
  return (
    <>
      {!loading && !error && (
        <div className="row">
          {data.projects.length > 0 ? (
            data.projects.slice(0,4).map((project) => <ProjectCard key={project.id} project={project}/>)
          ) : (
            <p>No projects</p>
          )}
        </div>
      )}
    </>
  )
}

export default Projects
