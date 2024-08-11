import { Expense } from '../model/expense';
import moment from 'moment';
import { getExpensesInRange } from './getExpensesInRange';

export function getExpensesInDay(
  expenses: Expense[],
  date: moment.Moment
): Expense[] {
  return getExpensesInRange(
    expenses,
    moment(date).startOf('day'),
    moment(date).endOf('day')
  );
}
