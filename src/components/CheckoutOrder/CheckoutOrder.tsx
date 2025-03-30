import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, IconButton, List, Divider, Button } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { formatPrice } from '../../utils';
import { useOrderStore } from '../../store';
import { ItemOrder } from './ItemOrder';

export const CheckoutOrder: FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { order } = useOrderStore();

  const totalPrice = order.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Шапка с заголовком */}
      <Box sx={{ p: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              mr: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'grey.900',
              },
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Заказ № {orderId}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Внимательно проверьте состав заказа перед оплатой
        </Typography>
        <Divider />
      </Box>

      {/* Список блюд */}
      <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
        {order.map((o) => (
          <ItemOrder key={o.dish.id} order={o} />
        ))}
      </List>

      {/* Итоговая сумма и кнопка оплаты */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Итого:
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {formatPrice(totalPrice)}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          disabled={order.length === 0}
          sx={{ borderRadius: '10px' }}
        >
          Оплатить заказ
        </Button>
      </Box>
    </Box>
  );
};
