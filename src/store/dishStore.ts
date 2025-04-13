import { create } from 'zustand';
import { Dish, DishesApi, ModificationDish } from '../api';

interface DishesState {
  dishes: Dish[];
  isLoadingDishes: boolean;
  loadDishes: () => Promise<void>;
  addDish: (data: ModificationDish) => Promise<void>;
}

const dishesApi = new DishesApi();

export const useDishStore = create<DishesState>((set, get) => ({
  dishes: [],
  isLoadingDishes: false,
  loadDishes: async () => {
    try {
      set({ isLoadingDishes: true });
      const { data } = await dishesApi.getAll();
      set({ dishes: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingDishes: false });
    }
  },
  addDish: async (data) => {
    const { loadDishes } = get();
    set({ isLoadingDishes: true });

    try {
      await dishesApi.create(data);
      await loadDishes();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingDishes: false });
    }
  },
}));
