import { create } from 'zustand';
import { Dish, OrderItem } from '../interfaces';

interface OrderState {
  order: OrderItem[];
  isLoadingOrder: boolean;
  addToOrder: (dish: Dish) => Promise<void>;
  removeFromOrder: (dishId: number) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  order: [],
  isLoadingOrder: false,
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
}));
