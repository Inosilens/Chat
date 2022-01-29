import React, {useEffect, useState} from 'react';
import {ApolloClient, ApolloProvider, gql, InMemoryCache, useMutation, useSubscription} from "@apollo/client";
import {List} from "./component/list/List";
import {IMessage} from "./types/types";
import {Container} from "@mui/material";
import crock from './assest/orig-21.jpg'
import {WebSocketLink} from "@apollo/client/link/ws";
import {TextFromField} from "./component/TextFromField/TextFromField";
import Button from "@mui/material/Button";


const link = new WebSocketLink({
    uri: "ws://localhost:4000/",
    options: {
        reconnect: true,
    },
});

const client = new ApolloClient({
    link,
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});


const GET_MESSAGE = gql`
    subscription{
        messages{
        content,
        id,
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
    const {data} = useSubscription(GET_MESSAGE)
    const [postMessage] = useMutation(ADD_MESSAGE)
    const [nickName, setNickName] = useState<string>('')
    const [login, setLogin] = useState<boolean>(false)
    const [message, setMessage] = useState<IMessage>({
        user: nickName,
        content: ''
    })
    const onSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        postMessage({variables: message}).then(() => {
            setMessage({...message, content: ''})
            window.scrollBy(0, document.documentElement.clientHeight)
        })

    }
    const auth = () => {
        localStorage.setItem('nickname', nickName)
        setLogin(true)
    }
    const logout = () => {
        localStorage.removeItem('nickname')
        setLogin(false)
    }

    useEffect(() => {
        let userName = localStorage.getItem('nickname')
        if (userName) {
            setLogin(true)
            setNickName(userName)
        } else {
            setLogin(false)
        }
    }, [login])


    return (
        <>
            {data && login && (
                <>
                    <Button onClick={logout}>Logout</Button>
                    <Container sx={{
                        background: `url(${crock}) center center no-repeat`,
                        backgroundAttachment: 'fixed',
                    }}>
                        <List
                            nick={nickName}
                            messages={data.messages}/>
                        <TextFromField
                            label={'Enter message'}
                            value={message.content}
                            onChange={(e) => setMessage({ user : nickName , content: e.target.value})}
                            submit={onSubmit}/>
                    </Container>
                </>
            )}
            {!login && (
                <Container sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TextFromField
                        label={'Your name'}
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                        submit={auth}/>
                </Container>
            )}
        </>
    );
};

export default () => (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)