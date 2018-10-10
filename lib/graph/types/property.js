import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Property',
  description: 'A property',
  fields: () => ({
    address: {
      type: GraphQLString,
      description: 'the address of the property',
      resolve: ({ address }) => address,
    },
    id: {
      type: GraphQLString,
      description: 'the unique id of the property',
      resolve: ({ id }) => id,
    },
    location: {
      type: new GraphQLObjectType({
        name: 'Location',
        description: 'Property location',
        fields: () => ({
          lat: {
            type: GraphQLString,
            description: 'latitude of property',
            resolve: ({ lat }) => lat,
          },
          lng: {
            type: GraphQLString,
            description: 'longitude of property',
            resolve: ({ lng }) => lng,
          },
        }),
      }),
    },
  }),
});
