import { Expense } from '../model/expense';
import moment from 'moment';
import { getDayTarget } from './getDayTarget';
import { sumExpenses } from './sumExpenses';
import { getExpensesInDay } from './getExpensesInDay';

export interface CalendarSummary {
  days: ({
    day: number;
    target: number;
    expenses: number | null;
  } | null)[];
}

export function getCalendarSummary(
  expenses: Expense[],
  target: number,
  date: moment.Moment
): CalendarSummary {
  const firstDay = moment(date).startOf('month');
  let currentDay = moment(firstDay);
  const calendarSummary: CalendarSummary = {
    days: [],
  };
  for (let i = 0; i < firstDay.weekday(); ++i) {
    calendarSummary.days.push(null);
  }
  while (
    currentDay.isSame(firstDay, 'month') &&
    !currentDay.isAfter(date, 'day')
  ) {
    const entryDay = currentDay.date();
    const entryTarget = getDayTarget(expenses, target, currentDay);
    const entryExpenses = sumExpenses(getExpensesInDay(expenses, currentDay));
    calendarSummary.days.push({
      day: entryDay,
      target: entryTarget,
      expenses: entryExpenses,
    });
    currentDay = currentDay.add(1, 'day');
  }
  while (currentDay.isSame(firstDay, 'month')) {
    const entryDay = currentDay.date();
    const entryTarget = getDayTarget(expenses, target, currentDay);
    calendarSummary.days.push({
      day: entryDay,
      target: entryTarget,
      expenses: null,
    });
    currentDay = currentDay.add(1, 'day');
  }
  while (calendarSummary.days.length < 42) {
    calendarSummary.days.push(null);
  }
  return calendarSummary;
}
