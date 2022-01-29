const {GraphQLServer, PubSub} = require('graphql-yoga');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
var { buildSchema } = require('graphql');


const messages = []
const schema = buildSchema(`
   type Message {
        id: ID!
        user : String!
        content : String!
    }
    type Query {
        messages : [Message!]
    }
    type Mutation {
        postMessage(user:String!, content:String!): ID
    }
    type Subscription {
        messages : [Message!]
    }
`);

const subscribers = []

const onMessageUpdate = (func) => {
    subscribers.push(func)
}

const resolvers = {
    Query: {
        messages: () => messages
    },
    Mutation: {
        postMessage: (parent, {user, content}) => {
            const id = messages.length
            messages.push({id, user, content})
            subscribers.forEach((fn) => fn());
            return id
        }
    },
    Subscription: {
        messages: {
            subscribe: (parent, args, { pubsub }) => {
                const channel = Math.random().toString(36).slice(2, 15);
                onMessageUpdate(() => {
                    pubsub.publish(channel, { messages });
                });
                setTimeout(() => {
                    pubsub.publish(channel, { messages });
                }, 0);
                return pubsub.asyncIterator(channel);
            },
        },
    },
};
const port = process.env.PORT || 3001
const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start(({port}) => console.log(`server start at port ${port}`))
const app = express();
app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));