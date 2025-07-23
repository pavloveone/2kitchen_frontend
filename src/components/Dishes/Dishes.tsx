import { FC, useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { useDishStore, ViewMode } from '../../store';
import { ListByMode } from './ListByMode';

interface DishesProps {
  isMobile: boolean;
  viewMode: ViewMode;
}

export const Dishes: FC<DishesProps> = ({ isMobile, viewMode }) => {
  const { loadDishes, dishes, isLoadingDishes } = useDishStore();

  const handleLoadDishes = useCallback(async () => {
    try {
      await loadDishes();
    } catch (error) {
      console.error('An error while loading dishes', error);
    }
  }, [loadDishes]);

  useEffect(() => {
    handleLoadDishes();
  }, [handleLoadDishes]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: isMobile ? 1 : 2,
        position: 'relative',
        minHeight: 200,
      }}
    >
      <ListByMode
        viewMode={viewMode}
        isLoading={isLoadingDishes}
        isMobile={isMobile}
        dishes={dishes}
      />
    </Box>
  );
};
