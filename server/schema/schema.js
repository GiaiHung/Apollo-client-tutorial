const Project = require('../models/Project')
const Client = require('../models/Client')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql')

// Project type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    clientID: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId)
      },
    },
  }),
})

// Client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
})

// Root
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    // Client query
    clients: {
      type: GraphQLList(ClientType),
      resolve() {
        return Client.find()
      },
    },
    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Client.findById(args.id)
      },
    },
    // Project query
    projects: {
      type: GraphQLList(ProjectType),
      resolve() {
        return Project.find()
      },
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Project.findById(args.id)
      },
    },
  },
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        return await Client.create({
          name: args.name,
          email: args.email,
          phone: args.phone,
        })
      },
    },
    // Delete client
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        await Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => project.remove())
        })
        return await Client.findByIdAndDelete(args.id)
      },
    },
    // Add project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
            defaultValue: 'Not Started',
          }),
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        return await Project.create({
          name: args.name,
          status: args.status,
          description: args.description,
          clientId: args.clientId,
        })
      },
    },
    // Delete project
    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        return await Project.findByIdAndDelete(args.id)
      },
    },
    // Update project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
        description: { type: GraphQLString },
        name: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
        clientId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return await Project.findByIdAndUpdate(args.id, {
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        })
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
