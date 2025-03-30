import { FC } from 'react';
import { List as MList } from '@mui/material';
import { Dish } from '../../../../interfaces';
import { Item } from './Item';

interface ListProps {
  dishes: Dish[];
}

export const List: FC<ListProps> = ({ dishes }) => (
  <MList sx={{ width: '100%' }}>
    {dishes.map((dish) => (
      <Item key={dish?.id} dish={dish} />
    ))}
  </MList>
);
