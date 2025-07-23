import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from '@mui/material';
import { AddDishForm } from './AddDishForm';
import { Dishes } from '../Dishes';
import { Orders } from './Orders';
import { Charts } from './Charts';
import { useOrderStore } from '../../store';

export const AdminPanel = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const { getAllOrders, orders } = useOrderStore((state) => ({
    getAllOrders: state.getAllOrders,
    orders: state.orders,
  }));

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setShowForm(false);
  };

  const handleOpenDialog = () => setShowForm(true);
  const handleCloseDialog = () => setShowForm(false);

  const handleLoadOrders = useCallback(async () => {
    try {
      await getAllOrders();
    } catch (error) {
      console.error('An error while loading orders', error);
    }
  }, [getAllOrders]);

  useEffect(() => {
    handleLoadOrders();
  }, [handleLoadOrders]);

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden', bgcolor: '#f9f9f9' }}>
      <Tabs
        orientation="vertical"
        value={selectedTab}
        onChange={handleTabChange}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          overflowY: 'auto',
          width: 220,
          bgcolor: 'background.paper',
          p: 2,
        }}
      >
        <Tab label="Блюда" />
        <Tab label="Заказы" />
        <Tab label="Аналитика" />
      </Tabs>

      <Box sx={{ flexGrow: 1, p: 4, height: '100%', overflow: 'hidden' }}>
        {selectedTab === 0 && (
          <Stack
            spacing={3}
            sx={{
              height: '100%',
              overflow: 'hidden',
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                style={{ textDecoration: 'none', borderRadius: '10px' }}
                variant="outlined"
                onClick={handleOpenDialog}
              >
                Добавить блюдо
              </Button>
            </Box>

            {/* Список блюд */}
            <Dishes isMobile={false} viewMode="table" />

            {/* Модальное окно для добавления блюда */}
            <AddDishForm onClose={handleCloseDialog} open={showForm} />
          </Stack>
        )}
        {selectedTab === 1 && <Orders orders={orders} />}
        {selectedTab === 2 && <Charts orders={orders} />}
      </Box>
    </Box>
  );
};
