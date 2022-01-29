import React from 'react';
import {ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery} from "@apollo/client";
import List from "./component/list/List";

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});


const GET_MESSAGE = gql`
    query { 
        messages {
        id,
        content,
        user
        }
    }
`

const App = () => {
    const {data} = useQuery(GET_MESSAGE)
    if (data) {
        return (
            <div>
                <List messages={data.messages}/>
            </div>
        );
    } else {
        return (
            <div>
                Пустота
            </div>
        )
    }

};

export default () =>
    (<ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    )