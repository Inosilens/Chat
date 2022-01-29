import React from 'react';
import {IMessage} from "../../types/Types";
import Message from "../message/Message";
import {Grid} from "@mui/material";

interface IListProps {
    messages: IMessage[]
}


export const List = React.memo<IListProps>(({messages})=> {
    return (
        <Grid container direction={"column"} spacing={2}>
            {messages && (
                messages.map(item =>
                    <Message key={item.id} id={item.id} content={item.content} user={item.user}/>
                ))
            }
        </Grid>
    );
});


