import { Expense } from '../model/expense';
import moment from 'moment';
import { getExpensesInRange } from './getExpensesInRange';

export function getExpensesInMonth(
  expenses: Expense[],
  date: moment.Moment
): Expense[] {
  return getExpensesInRange(
    expenses,
    moment(date).startOf('month'),
    moment(date).endOf('month')
  );
}
