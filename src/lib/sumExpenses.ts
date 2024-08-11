import { Expense } from '../model/expense';

export function sumExpenses(expenses: Expense[]): number {
  let sum = 0;
  for (const expense of expenses) {
    sum += expense.amount;
  }
  return sum;
}
