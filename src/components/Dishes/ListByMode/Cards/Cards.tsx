import { FC } from 'react';
import { Dish } from '../../../../interfaces';
import { Box } from '@mui/material';
import { Item } from './Item';

interface CardsProps {
  dishes: Dish[];
  isMobile: boolean;
}

export const Cards: FC<CardsProps> = ({ dishes, isMobile }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: 2,
        p: 1,
      }}
    >
      {dishes.map((dish) => (
        <Item key={dish.id} dish={dish} />
      ))}
    </Box>
  );
};
