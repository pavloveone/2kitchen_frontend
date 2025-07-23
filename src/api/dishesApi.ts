import { apiClient } from './apiClient';

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
  restaurant: number;
}

export interface ModificationDish {
  name: string;
  description: string;
  price: number;
  image: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
  restaurant: number;
}

export class DishesApi extends apiClient {
  constructor() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/dishes`;
    super(baseUrl);
  }

  public getAll = async () => {
    return this.get<Dish[]>(`/1`);
  };

  public getById = async (id: number) => {
    return this.get<Dish>(`/${id}`);
  };

  public create = async (dish: ModificationDish) => {
    return this.post<void>(``, dish);
  };

  public update = async (id: number, dish: ModificationDish) => {
    return this.put<Dish>(`/${id}`, dish);
  };

  public remove = async (id: number) => {
    return this.delete<void>(`/${id}`);
  };
}
