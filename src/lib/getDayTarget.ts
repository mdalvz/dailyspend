import { Expense } from '../model/expense';
import moment from 'moment';
import { getExpensesInMonthBeforeDay } from './getExpensesInMonthBeforeDay';
import { sumExpenses } from './sumExpenses';

export function getDayTarget(
  expenses: Expense[],
  target: number,
  date: moment.Moment
): number {
  const expensesInMonthBeforeDay = getExpensesInMonthBeforeDay(expenses, date);
  const expensesInMonthBeforeDaySum = sumExpenses(expensesInMonthBeforeDay);
  const daysLeftInMonth = moment(date).endOf('month').diff(date, 'day') + 1;
  return (target - expensesInMonthBeforeDaySum) / daysLeftInMonth;
}
