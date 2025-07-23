import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { Order, OrderItem } from '../../../api';
import { formatPrice } from '../../../utils';

type ChartsProps = {
  orders: Order[];
};

// Пастельная палитра
const COLORS = ['#A0C4FF', '#BDB2FF', '#FFC6FF', '#FFD6A5', '#FDFFB6'];

export const Charts: React.FC<ChartsProps> = ({ orders }) => {
  const ordersByDate = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((order) => {
      const date = new Date(order.order_time).toISOString().split('T')[0];
      map[date] = (map[date] || 0) + 1;
    });
    return Object.entries(map).map(([date, count]) => ({ date, count }));
  }, [orders]);

  const statusDistribution = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((order) => {
      map[order.status] = (map[order.status] || 0) + 1;
    });
    return Object.entries(map).map(([status, value]) => ({ name: status, value }));
  }, [orders]);

  const revenueByDate = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((order) => {
      const date = new Date(order.order_time).toISOString().split('T')[0];
      let total = 0;
      try {
        const items = JSON.parse(order.items);
        for (const item of items) {
          total += item.dish.price * item.quantity;
        }
      } catch {
        total = 0;
      }
      map[date] = (map[date] || 0) + total;
    });
    return Object.entries(map).map(([date, revenue]) => ({ date, revenue }));
  }, [orders]);

  const topDishes = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((order) => {
      try {
        const items = JSON.parse(order.items);
        items.forEach((item: OrderItem) => {
          const name = item.dish.name;
          map[name] = (map[name] || 0) + item.quantity;
        });
      } catch {}
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [orders]);

  const avgReceiptByDate = useMemo(() => {
    const map: Record<string, { total: number; count: number }> = {};
    orders.forEach((order) => {
      const date = new Date(order.order_time).toISOString().split('T')[0];
      let total = 0;
      try {
        const items = JSON.parse(order.items);
        for (const item of items) {
          total += item.dish.price * item.quantity;
        }
      } catch {
        total = 0;
      }
      if (!map[date]) map[date] = { total: 0, count: 0 };
      map[date].total += total;
      map[date].count += 1;
    });
    return Object.entries(map).map(([date, { total, count }]) => ({
      date,
      avg: +(total / count).toFixed(2),
    }));
  }, [orders]);

  return (
    <Box p={2} sx={{ height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Аналитика заказов
      </Typography>
      <Box sx={{ height: '100%', overflow: 'auto' }}>
        {/* Количество заказов по дням */}
        <ChartCard title="Количество заказов по дням">
          <LineChart data={ordersByDate}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="count" stroke="#5B8DEF" strokeWidth={1.8} dot={false} />
          </LineChart>
        </ChartCard>

        {/* Статусы заказов */}
        <ChartCard title="Статусы заказов">
          <PieChart>
            <Pie
              data={statusDistribution}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              stroke="none"
            >
              {statusDistribution.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>

        {/* Выручка по дням */}
        <ChartCard title="Выручка по дням">
          <BarChart data={revenueByDate}>
            <CartesianGrid strokeDasharray="2 2" stroke="#ccc" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={formatPrice} />
            <Bar dataKey="revenue" fill="#A0C4FF" barSize={30} />
          </BarChart>
        </ChartCard>

        {/* Топ-5 популярных блюд */}
        <ChartCard title="Топ-5 популярных блюд">
          <BarChart data={topDishes}>
            <CartesianGrid strokeDasharray="2 2" stroke="#ccc" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#BDB2FF" barSize={30} />
          </BarChart>
        </ChartCard>

        {/* Средний чек */}
        <ChartCard title="Средний чек по дням">
          <LineChart data={avgReceiptByDate}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={formatPrice} />
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="avg" stroke="#FFB703" strokeWidth={1.8} dot={{ r: 3 }} />
          </LineChart>
        </ChartCard>
      </Box>
    </Box>
  );
};

// Вспомогательный компонент для карточки графика
const ChartCard: React.FC<{ title: string; children: React.ReactElement }> = ({
  title,
  children,
}) => (
  <Box mb={4}>
    <Paper sx={{ p: 2, height: 300 }}>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        {children}
      </ResponsiveContainer>
    </Paper>
  </Box>
);
