import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { HeaderMenu } from './HeaderMenu';
import { useViewModeStore } from '../../store';
import { Dishes } from '../Dishes';
import { Cart } from '../Cart';

export const Menu: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const { viewMode } = useViewModeStore();

  const handleCheckout = () => {
    const orderId = Math.floor(Math.random() * 1000000);

    navigate(`/order/${orderId}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: 'background.default',
        '& ::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '& ::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.grey[400],
          borderRadius: '3px',
        },
        '& ::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.grey[500],
        },
        '& ::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
      }}
    >
      {/* Шапка меню */}
      <HeaderMenu />

      {/* Основное содержимое */}
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        {/* Список блюд */}
        <Dishes viewMode={viewMode} isMobile={isMobile} />
        {/* Корзина */}
        <Cart isMobile={isMobile} onCheckout={handleCheckout} />
      </Box>
    </Box>
  );
};
