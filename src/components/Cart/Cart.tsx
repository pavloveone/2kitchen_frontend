import { FC, useMemo } from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { formatPrice } from '../../utils';
import { useOrderStore } from '../../store';
import { CartOrder } from './CartOrder';

interface CartProps {
  isMobile: boolean;
  onCheckout: () => void;
}

export const Cart: FC<CartProps> = ({ isMobile, onCheckout }) => {
  const theme = useTheme();
  const { order } = useOrderStore();

  const total = useMemo(
    () => order.reduce((sum, item) => sum + item.dish.price * item.quantity, 0),
    [order],
  );

  if (!total) return null;
  if (isMobile) {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          bgcolor: 'background.paper',
          boxShadow: 3,
          zIndex: 1000,
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          size="large"
          disabled={order.length === 0}
          sx={{ mt: 'auto', borderRadius: '10px' }}
          onClick={onCheckout}
          startIcon={<ShoppingCart />}
        >
          Оформить ({formatPrice(total)})
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 350,
        p: 2,
        bgcolor: 'background.paper',
        overflowY: 'auto',
        borderLeft: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <ShoppingCart sx={{ mr: 1 }} />
        <Typography variant="h6">Ваш заказ</Typography>
      </Box>

      {order.length === 0 ? (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4, flexGrow: 1 }}>
          Корзина пуста
        </Typography>
      ) : (
        <>
          <CartOrder />

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1">Итого:</Typography>
            <Typography variant="subtitle1">{formatPrice(total)}</Typography>
          </Box>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            disabled={order.length === 0}
            sx={{ mt: 'auto', borderRadius: '10px' }}
            onClick={onCheckout}
          >
            Оформить
          </Button>
        </>
      )}
    </Box>
  );
};
