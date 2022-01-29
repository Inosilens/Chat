import React from 'react';
import {IMessage} from "../../types/types";
import Message from "../message/Message";
import {Grid} from "@mui/material";

interface IListProps {
    messages: IMessage[],
    nick: string,
}


export const List = React.memo<IListProps>(({messages, nick}) => {
    return (
        <Grid container direction={"column"} spacing={2}>
            {messages && (
                messages.map(item =>
                    <Message nick={nick}
                             key={item.id}
                             id={item.id}
                             content={item.content}
                             user={item.user}/>
                ))
            }
        </Grid>
    );
});


