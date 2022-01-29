import React from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";

interface IMessageField {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    submit: (e: React.MouseEvent<HTMLButtonElement>) => void,
    value: string
}

export const MessageField = React.memo<IMessageField>(({onChange, submit, value}) => {
    return (
        <div>
            <TextField label='Your message' minRows={10} value={value} onChange={onChange} />
            <Button variant="contained" onClick={submit}>
                Отправить
            </Button>
        </div>
    );
})
