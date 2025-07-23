import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CreateOrder, Dish, Order, OrderItem, OrdersApi } from '../api';

interface OrderState {
  order: OrderItem[];
  orders: Order[];
  isLoadingOrders: boolean;
  isLoadingOrder: boolean;
  addToOrder: (dish: Dish) => Promise<void>;
  removeFromOrder: (dishId: number) => Promise<void>;
  createOrder: (data: CreateOrder) => Promise<void>;
  getAllOrders: () => Promise<Order[]>;
}

const ordersApi = new OrdersApi();

export const useOrderStore = create<OrderState>()(
  immer((set, get) => ({
    order: [],
    orders: [],
    isLoadingOrders: false,
    isLoadingOrder: false,
    createOrder: async (data) => {
      set({ isLoadingOrder: true });
      try {
        await ordersApi.create(data);
      } catch (error) {
        throw error;
      } finally {
        set({ isLoadingOrder: false });
      }
    },
    getAllOrders: async () => {
      set({ isLoadingOrders: true });
      try {
        const { data } = await ordersApi.getAll();
        set({ orders: data });
        return data;
      } catch (error) {
        throw error;
      } finally {
        set({ isLoadingOrders: false });
      }
    },
    addToOrder: async (dish) => {
      const { order } = get();
      set({ isLoadingOrder: true });
      try {
        const existing = order.find((item) => item.dish.id === dish.id);
        const updatedOrder = existing
          ? order.map((item) =>
              item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
            )
          : [...order, { dish, quantity: 1 }];
        set({ order: updatedOrder });
      } catch (error) {
        throw error;
      } finally {
        set({ isLoadingOrder: false });
      }
    },
    removeFromOrder: async (dishId) => {
      const { order } = get();
      set({ isLoadingOrder: true });
      try {
        const updatedOrder = order.reduce((acc, item) => {
          if (item.dish.id !== dishId) return [...acc, item];
          return item.quantity > 1 ? [...acc, { ...item, quantity: item.quantity - 1 }] : acc;
        }, [] as OrderItem[]);
        set({ order: updatedOrder });
      } catch (error) {
        throw error;
      } finally {
        set({ isLoadingOrder: false });
      }
    },
  })),
);
