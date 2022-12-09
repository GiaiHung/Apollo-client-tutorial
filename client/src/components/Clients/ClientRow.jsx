import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { BsPencil } from 'react-icons/bs'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../../mutations/clientMutations'
import { GET_CLIENTS } from '../../queries/clientQueries'
import { GET_PROJECTS } from '../../queries/projectQueries'

function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS })
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter((client) => client.id !== deleteClient.id) },
    //   })
    // },
  })
  return (
    <tr className="align-middle">
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td className="d-flex align-items-center gap-2">
        <button className="btn btn-danger" onClick={deleteClient}>
          <FaTrash />
        </button>
        <button className="btn btn-success">
          <BsPencil />
        </button>
      </td>
    </tr>
  )
}

export default ClientRow
