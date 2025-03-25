import { Button } from '@mui/material';
import * as styled from './Start.style';
import { NavLink } from 'react-router-dom';

export const Start = () => {
    return (
        <styled.Wrapper>
            <NavLink to="/menu">
                <Button variant="outlined">Start</Button>
            </NavLink>
        </styled.Wrapper>
    )
}