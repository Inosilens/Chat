import React, {FC} from 'react';
import {IMessage} from "../../types/Types";
import {Container, Grid} from "@mui/material";



const Message:FC<IMessage> = ({content,user,id}) => {
    return (
        <Grid alignSelf={user==='Andrey'?'end':'start'} item sx={{ color: 'primary.main'}}>
            {user} :
            <Container sx={
                {   border: 1 ,
                    minHeight:50,
                    width:400,
                    borderColor: 'primary.main' ,
                    boxShadow: 3
                }}>
                 {content}
            </Container>
        </Grid>
    );
};

export default Message;