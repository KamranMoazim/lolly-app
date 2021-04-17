const { ApolloServer, gql } = require('apollo-server-lambda')
var faunadb = require("faunadb"),
  q = faunadb.query;
const axios = require("axios");

const typeDefs = gql`
  type vCard {
    c1: String!
    c2: String!
    c3: String!
    rec: String!
    sender: String!
    msg: String!
    link: String!
  }

  type Query {
    getVCard: [vCard]
  }

  type Mutation {
    addVCard(c1: String!, c2: String!, c3: String!, rec: String!, sender: String!, msg: String!, link: String!): [vCard]
  }
`

var adminClient = new faunadb.Client({
  secret: "fnAEGrWaFrACCZToqXXOmO1xxyX8k1a0xLjPOySw" //process.env.FAUNA_DB_SECRET,    
});
// fnAEGrWaFrACCZToqXXOmO1xxyX8k1a0xLjPOySw
// fnAD_7fdDxACADm8t6xyTjNTXTHFaCTppRj6smkK


const resolvers = {
  Query: {
    getVCard: async (root, arg, context) => {
      try {
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index("link"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data)

        return result.data.map(d => {
          return {
            c1: d.data.c1,
            c2: d.data.c2,
            c3: d.data.c3,
            rec: d.data.rec,
            sender: d.data.sender,
            msg: d.data.msg,
            link: d.data.link,
          }
        })
      } catch (err) {
        console.log(err)
      }
      // return [{}]
    },
  },
  Mutation: {
    addVCard: async (_, {c1, c2, c3, rec, sender, msg, link}) => {
      console.log("======================");
      console.log(c1, c2, c3, rec, sender, msg, link)
      console.log("======================");
      try {
        const result = await adminClient.query(
          q.Create(q.Collection("vCard"), {
            data: { c1, c2, c3, rec, msg, sender, link },  // : shortid.generate()
          })
        );

        // axios.post("https://api.netlify.com/build_hooks/607a9fc8c418d6e1c6677821")
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.error(error);
        // });

        return result.data.data;
      } catch (err) {
        console.log(err);
      }
      console.log(result);
      // return [{}]
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
  // https://api.netlify.com/build_hooks/607a9fc8c418d6e1c6677821