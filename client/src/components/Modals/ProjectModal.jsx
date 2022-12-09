import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { ADD_PROJECT } from '../../mutations/projectMutations'
import { GET_CLIENTS } from '../../queries/clientQueries'
import { GET_PROJECTS } from '../../queries/projectQueries'

function ProjectModal() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('new')
  const [clientID, setClientID] = useState('')

  const { data, loading } = useQuery(GET_CLIENTS)

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientID },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS })
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      })
    },
  })

  const handleNewProject = (e) => {
    e.preventDefault()

    if (!name || !description || !status || !clientID) return alert('Please enter all information')
    addProject()

    setName('')
    setDescription('')
    setStatus('new')
    setClientID('')
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-flex gap-2 align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#projectModal"
        onClick={() => setStatus('new')}
      >
        <AiOutlineFundProjectionScreen className="icon" />
        <span>Add project</span>
      </button>
      <div
        className="modal fade"
        id="projectModal"
        tabIndex="-1"
        aria-labelledby="projectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="projectModalLabel">
                Create new project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleNewProject}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <input
                    type="text"
                    placeholder="Enter description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Status</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="new">Not Started</option>
                    <option value="progess">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Client</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setClientID(e.target.value)}
                  >
                    <option defaultValue>Select client</option>
                    {!loading &&
                      data.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  className="btn btn-secondary bnt-outline"
                  type="submit"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectModal
