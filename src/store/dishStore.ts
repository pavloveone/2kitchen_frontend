import { create } from 'zustand';
import { Dish } from '../interfaces';

interface DishesState {
  dishes: Dish[];
  isLoadingDishes: boolean;
  loadDishes: () => Promise<void>;
}

export const useDishStore = create<DishesState>((set) => ({
  dishes: [],
  isLoadingDishes: false,
  loadDishes: async () => {
    try {
      set({ isLoadingDishes: true });
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
      // Моковые данные блюд
      const dishes: Dish[] = [
        {
          id: 1,
          name: 'Паста Карбонара',
          price: 1200,
          description: 'Спагетти, бекон, сливки, яйца, пармезан',
          image:
            'https://avatars.mds.yandex.net/get-mpic/11399770/2a0000018cb0ce851aea3a8fefb7be39982f/orig',
          protein: 25,
          fat: 32,
          carbs: 45,
          calories: 568,
        },
        {
          id: 2,
          name: 'Стейк Рибай',
          price: 2400,
          description: 'Говяжий стейк с овощами гриль',
          image: 'https://yastatic.net/s3/eats-media/0b1d3e26-8332-4f70-8dab-b63cdad22f8f.jpg',
          protein: 38,
          fat: 28,
          carbs: 5,
          calories: 424,
        },
        {
          id: 3,
          name: 'Салат Цезарь',
          price: 800,
          description: 'Курица, салат айсберг, крутоны, соус цезарь',
          image:
            'https://avatars.mds.yandex.net/get-altay/13970739/2a00000192c30d725eb1517aa1ea01ad1dc8/XXXL',
          protein: 22,
          fat: 18,
          carbs: 12,
          calories: 298,
        },
        {
          id: 4,
          name: 'Пицца Маргарита',
          price: 1400,
          description: 'Томатный соус, моцарелла, базилик',
          image:
            'https://sun9-26.userapi.com/impg/JDtloy_QO2XjM0in6CcFNPbK3GNpxXEeOocQBA/pAi7NCqadtk.jpg?size=604x453&quality=96&sign=9e022a19089374b7727d08d5d45aab61&type=album',
          protein: 15,
          fat: 20,
          carbs: 65,
          calories: 500,
        },
        {
          id: 5,
          name: 'Тирамису',
          price: 600,
          description: 'Классический итальянский десерт',
          image: 'https://avatars.mds.yandex.net/get-entity_search/931219/960695604/S600xU_2x',
          protein: 8,
          fat: 22,
          carbs: 45,
          calories: 410,
        },
        {
          id: 6,
          name: 'Борщ',
          price: 750,
          description: 'Традиционный украинский суп со свеклой и говядиной',
          image: 'https://adygsalt.ru/blog/foto/borsh/3.jpg',
          protein: 12,
          fat: 15,
          carbs: 30,
          calories: 303,
        },
        {
          id: 7,
          name: 'Пельмени',
          price: 950,
          description: 'Домашние пельмени с говядиной и свининой',
          image: 'https://image.mel.fm/i/J/J3TjHMqOnK/1200.jpg',
          protein: 28,
          fat: 25,
          carbs: 40,
          calories: 497,
        },
        {
          id: 8,
          name: 'Греческий салат',
          price: 850,
          description: 'Свежие овощи, фета, оливки, оливковое масло',
          image:
            'https://avatars.mds.yandex.net/i?id=5535276c0e5812ee0be3599c6479df6a_l-9231415-images-thumbs&n=13',
          protein: 10,
          fat: 22,
          carbs: 15,
          calories: 298,
        },
        {
          id: 9,
          name: 'Шашлык из свинины',
          price: 1800,
          description: 'Нежное мясо на углях с соусом и зеленью',
          image:
            'https://avatars.mds.yandex.net/get-altay/5235198/2a0000017b7189a91b1c5ac59499b8b02959/XXXL',
          protein: 35,
          fat: 30,
          carbs: 5,
          calories: 430,
        },
        {
          id: 10,
          name: 'Чизкейк Нью-Йорк',
          price: 650,
          description: 'Классический десерт с нежным творожным кремом',
          image:
            'https://avatars.mds.yandex.net/i?id=9ceb4f20843b7d32b887b65fa9b9a730_l-8289735-images-thumbs&n=13',
          protein: 10,
          fat: 35,
          carbs: 45,
          calories: 535,
        },
      ];
      set({ dishes });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingDishes: false });
    }
  },
}));
