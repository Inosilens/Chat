import React, {FC} from 'react';
import {IMessage} from "../../types/types";
import {Container, Grid} from "@mui/material";

interface IMessageProps extends IMessage {
    nick: string
}

const Message: FC<IMessageProps> = ({content, user, nick}) => {
    return (
        <Grid alignSelf={ user === nick ? 'end' : 'start'} item
              sx={{color: user === nick ? 'primary.main' : 'secondary.main'}}>
            {user} :
            <Container sx={
                {
                    border: 1,
                    minHeight: 50,
                    width: 400,
                    borderColor: user === nick ? 'primary.main' : 'secondary.main',
                    boxShadow: 3
                }}>
                {content}
            </Container>
        </Grid>
    );
};

export default Message;