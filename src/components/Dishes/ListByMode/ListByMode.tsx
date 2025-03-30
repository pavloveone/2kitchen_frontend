import { FC } from 'react';
import { ViewMode } from '../../../store';
import { Dish } from '../../../interfaces';
import { Typography } from '@mui/material';
import { Cards } from './Cards';
import { List } from './List';
import { Loader } from '../../Loader';

interface ListByModeProps {
  viewMode: ViewMode;
  isMobile: boolean;
  dishes: Dish[];
  isLoading: boolean;
}

export const ListByMode: FC<ListByModeProps> = ({ viewMode, isMobile, dishes, isLoading }) => {
  if (isLoading) return <Loader />;

  return (
    <>
      {viewMode === 'list' ? (
        <List dishes={dishes} />
      ) : (
        <Cards isMobile={isMobile} dishes={dishes} />
      )}
      {dishes.length === 0 && !isLoading && (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            textAlign: 'center',
            mt: 4,
          }}
        >
          Блюда не найдены
        </Typography>
      )}
    </>
  );
};
