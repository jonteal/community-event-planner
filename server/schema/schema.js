const Event = require("../models/Event");
const Member = require("../models/Member");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
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
        return Member.findById(parent.memberId);
      },
    },
    status: { type: GraphQLString },
  }),
});

// Member Type
const MemberType = new GraphQLObjectType({
  name: "Member",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
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
        return Member.find();
      },
    },
    member: {
      type: MemberType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Member.findById(args.id);
      },
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return Event.find();
      },
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Event.findById(args.id);
      },
    },
  },
});

// MUTATIONS
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // ADD A MEMBER
    addMember: {
      type: MemberType,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const member = new Member({
          username: args.username,
          email: args.email,
          phone: args.phone,
        });

        return member.save();
      },
    },

    // DELETE A MEMBER
    deleteMember: {
      type: MemberType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Event.find({ memberId: args.id }).then((events) => {
          events.forEach((event) => {
            event.deleteOne();
          });
        });

        return Member.findByIdAndRemove(args.id);
      },
    },

    // ADD AN EVENT
    addEvent: {
      type: EventType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        location: { type: GraphQLNonNull(GraphQLString) },
        startingTime: { type: GraphQLNonNull(GraphQLString) },
        endingTime: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "Happening Now" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        memberId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const event = new Event({
          name: args.name,
          description: args.description,
          status: args.status,
          memberId: args.memberId,
          startingTime: args.startingTime,
          endingTime: args.endingTime,
          location: args.location,
        });

        return event.save();
      },
    },
    // Delete an event
    deleteEvent: {
      type: EventType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Event.findByIdAndRemove(args.id);
      },
    },
    // Update an event
    updateEvent: {
      type: EventType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        location: { type: GraphQLString },
        startingTime: { type: GraphQLString },
        endingTime: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "EventStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "Happening Now" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Event.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              location: args.location,
              startingTime: args.startingTime,
              endingTime: args.endingTime,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
