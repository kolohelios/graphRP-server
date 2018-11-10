import { find as _find } from 'lodash'

const typeDefs = `
  extend type Query {
    part(id: Int!): Part
  }

  type Part {
    id: Int!
    name: String
    whereUsed: [Part]
    bom: [Part]
  }
`

const parts = [
  {
    id: 3,
    name: 'part #3',
    whereUsed: [4, 5],
    bom: [],
  },
  {
    id: 4,
    name: 'part #4 (assy)',
    whereUsed: [],
    bom: [3, 5],
  },
  {
    id: 5,
    name: 'part #5 (assy)',
    whereUsed: [4],
    bom: [3, 6, 7]
  },
  {
    id: 6,
    name: 'part #6',
    whereUsed: [5],
    bom: [],
  },
  {
    id: 7,
    name: 'part #7',
    whereUsed: [5],
    bom: [8],
  },
  {
    id: 8,
    name: 'part #8',
    whereUsed: [7],
    bom: []
  },
]

const resolvers = {
  Query: {
    part: (obj, args, context, info) => {
      return _find(parts, (part) => part.id === args.id)
    },
  },
  Part: {
    whereUsed: (root) => {
      return root.whereUsed.map((id) => {
        return _find(parts, (part) => part.id === id)
      })
    },
    bom: (root) => {
      return root.bom.map((id) => {
        return _find(parts, (part) => part.id === id)
      })
    }
  }
}

export { typeDefs, resolvers }
