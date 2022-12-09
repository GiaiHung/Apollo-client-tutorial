import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECT, GET_PROJECTS } from '../queries/projectQueries'
import Loading from '../components/Helper/Loading'
import ClientInfo from '../components/Clients/ClientInfo'
import { FaTrash } from 'react-icons/fa'
import { BsPencil } from 'react-icons/bs'
import { DELETE_PROJECT } from '../mutations/projectMutations'
import EditProjectForm from '../components/Projects/EditProjectForm'

function Project() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { id },
  })
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  })
  const [isEdit, setIsEdit] = useState(false)
  if (loading) return <Loading />
  if (error) return <p>{error.message}</p>
  const { project } = data

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <ClientInfo client={project.client} />
          <div className="d-flex align-items-center justify-content-end mt-4 gap-2">
            <button
              className="btn btn-info fw-semibold d-flex align-items-center gap-1"
              onClick={() => setIsEdit(!isEdit)}
            >
              <BsPencil />
              <span>Edit project</span>
            </button>
            <button
              className="btn btn-danger fw-semibold d-flex align-items-center gap-1"
              onClick={deleteProject}
            >
              <FaTrash />
              <span>Delete project</span>
            </button>
          </div>
          {isEdit && <EditProjectForm project={project} setIsEdit={setIsEdit} />}
        </div>
      )}
    </>
  )
}

export default Project
