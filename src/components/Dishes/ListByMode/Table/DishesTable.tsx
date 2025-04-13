import React, { useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material';
import { Dish } from '../../../../api';

type DishesTableProps = {
  dishes: Dish[];
};

export const DishesTable: React.FC<DishesTableProps> = ({ dishes }) => {
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  const handleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.length === dishes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(dishes.map((dish) => dish.id));
    }
  }, [selectedIds, dishes]);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '100%' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedIds.length === dishes.length}
                indeterminate={selectedIds.length > 0 && selectedIds.length < dishes.length}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell align="right">Цена (₽)</TableCell>
            <TableCell align="right">Белки</TableCell>
            <TableCell align="right">Жиры</TableCell>
            <TableCell align="right">Углеводы</TableCell>
            <TableCell align="right">Калории</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dishes.map((dish) => (
            <TableRow key={dish.id} hover selected={selectedIds.includes(dish.id)}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedIds.includes(dish.id)}
                  onChange={() => handleSelect(dish.id)}
                />
              </TableCell>
              <TableCell>{dish.name}</TableCell>
              <TableCell>{dish.description}</TableCell>
              <TableCell align="right">{dish.price.toFixed(2)}</TableCell>
              <TableCell align="right">{dish.protein}</TableCell>
              <TableCell align="right">{dish.fat}</TableCell>
              <TableCell align="right">{dish.carbs}</TableCell>
              <TableCell align="right">{dish.calories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
