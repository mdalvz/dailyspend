import { Expense } from './expense';

export interface Store {
  target: number;
  expenses: Expense[];
}

export const defaultStore: Store = {
  target: 1000,
  expenses: [],
};
