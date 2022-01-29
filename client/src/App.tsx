import React, {FC, useEffect} from 'react';

interface IProps {
    id: number,
    name: string
}


export const App: FC = ({}: IProps) => {
    useEffect(() => {

    }, [])
    return (
        <div>
            NOW WORK
        </div>
    );
};

