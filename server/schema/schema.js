const { events, members } = require("../sampleData");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} = require("graphql");

// Event Type
const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    location: { type: GraphQLString },
    startingTime: { type: GraphQLString },
    endingTime: { type: GraphQLString },
    member: {
      type: MemberType,
      resolve(parent, args) {
        return members.find((member) => member.id === parent.memberId);
      },
    },
  }),
});

// Member Type
const MemberType = new GraphQLObjectType({
  name: "Member",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    members: {
      type: new GraphQLList(MemberType),
      resolve(parent, args) {
        return members;
      },
    },
    member: {
      type: MemberType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return members.find((member) => member.id === args.id);
      },
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return events;
      },
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return events.find((event) => event.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
