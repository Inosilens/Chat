import React from 'react';
import Button from '@mui/material/Button';
import {Container, TextField} from "@mui/material";

interface IMessageField {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    submit: (e: React.MouseEvent<HTMLButtonElement>) => void,
    value: string,
    label:string,
    nick?: string
}

export const TextFromField = React.memo<IMessageField>(({onChange, submit, value,label,nick}) => {
    return (
        <Container sx={{
            display:'flex',
            flexDirection: 'column'
        }}>
            <TextField label={label} minRows={10} value={value} onChange={onChange} />
            <Button disabled={!value.length} variant="contained" onClick={submit}>
                Отправить
            </Button>
        </Container>
    );
})
