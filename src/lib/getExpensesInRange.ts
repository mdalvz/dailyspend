import { Expense } from '../model/expense';
import moment from 'moment';

export function getExpensesInRange(
  expenses: Expense[],
  start: moment.Moment,
  end: moment.Moment
): Expense[] {
  return expenses.filter((expense) => {
    const yes = moment.utc(expense.date).isBetween(start, end, 'second', '[]');
    console.log({
      start,
      end,
      expense,
      yes,
    });
    return yes;
  });
}
