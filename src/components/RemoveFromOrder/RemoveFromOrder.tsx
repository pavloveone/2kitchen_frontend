import { FC } from 'react';
import { Remove } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Dish } from '../../interfaces';
import { useOrderStore } from '../../store';

interface RemoveFromOrderProps {
  dish: Dish;
}

export const RemoveFromOrder: FC<RemoveFromOrderProps> = ({ dish }) => {
  const { removeFromOrder } = useOrderStore();
  return (
    <IconButton size="small" onClick={() => removeFromOrder(dish.id)}>
      <Remove fontSize="small" />
    </IconButton>
  );
};
