import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { EDIT_PROJECT } from '../../mutations/projectMutations'
import { GET_PROJECT } from '../../queries/projectQueries'

function EditProjectForm({ project, setIsEdit }) {
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case 'Not Started':
        return 'new'
      case 'In Progress':
        return 'progress'
      case 'Completed':
        return 'completed'
      default:
        throw new Error(`Unknown status: ${project.status}`)
    }
  })

  const [editProject] = useMutation(EDIT_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  })

  const onEditProject = (e) => {
    e.preventDefault()
    if (!name || !description || !status) return alert('Please enter all information')
    editProject(name, description, status)
    setIsEdit(false)
  }

  return (
    <div className="mt-4">
      <h2>Update Project Details</h2>
      <form onSubmit={onEditProject}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            className="form-control"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            defaultValue={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default EditProjectForm
