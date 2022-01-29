import React, {useState} from 'react';
import {ApolloClient, ApolloProvider, gql, InMemoryCache, useMutation, useQuery} from "@apollo/client";
import {List} from "./component/list/List";
import {MessageField} from "./component/messageField/messageField";
import {IMessage} from "./types/Types";
import {Container} from "@mui/material";
import crock from './assest/orig-21.jpg'


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

const ADD_MESSAGE = gql`
    mutation($user:String!, $content:String!) {
        postMessage(user: $user, content: $content )
    }
`

const App = () => {
    const {data} = useQuery(GET_MESSAGE)
    const [postMessage] = useMutation(ADD_MESSAGE)
    const [message, setMessage] = useState<IMessage>({
        user: 'Andrey',
        content: ''
    })
    const onSubmit = () => {
        postMessage({variables: message}).then(() => {
            setMessage({...message, content: ''})
        })
    }
    if (data) {
        return (
            <Container sx={{background: `url(${crock}) center center no-repeat`,'background-attachment': 'fixed'}} >
                <List messages={data.messages}/>
                <MessageField
                    value={message.content}
                    onChange={(e) => setMessage({...message, content: e.target.value})}
                    submit={onSubmit}/>
            </Container>
        );
    } else {
        return (
            <div>
                Пустота
            </div>
        )
    }

};

export default () => (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)