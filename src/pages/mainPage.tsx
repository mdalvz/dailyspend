import React, { useContext } from 'react';
import { SetTargetModal } from '../components/setTargetModal';
import { useState } from 'react';
import { DateContext } from '../contexts/dateContext';
import { StoreContext } from '../contexts/storeContext';
import { AddExpenseModal } from '../components/addExpenseModal';
import moment from 'moment';
import { getExpensesInMonth } from '../lib/getExpensesInMonth';
import { getExpensesInDay } from '../lib/getExpensesInDay';
import { sumExpenses } from '../lib/sumExpenses';
import styled from 'styled-components';
import { getExpensesInMonthBeforeDay } from '../lib/getExpensesInMonthBeforeDay';
import { getDayTarget } from '../lib/getDayTarget';
import { Calendar } from '../components/calendar';

const Outer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;

  > *:nth-child(1) {
    font-size: 1rem;
    font-weight: 300;
  }

  > *:nth-child(2) {
    font-size: 4rem;
    font-weight: 600;

    &:hover {
      cursor: pointer;
    }
  }
`;

export function MainPage() {
  const dateContext = useContext(DateContext);
  const storeContext = useContext(StoreContext);

  const [isSetTargetModalOpen, setIsSetTargetModalOpen] =
    useState<boolean>(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState<boolean>(false);

  const expensesInMonth = getExpensesInMonth(
    storeContext.store.expenses,
    dateContext.date
  );
  const expensesInDay = getExpensesInDay(
    storeContext.store.expenses,
    dateContext.date
  );
  const expensesInMonthSum = sumExpenses(expensesInMonth);
  const expensesInDaySum = sumExpenses(expensesInDay);
  const dayTarget = getDayTarget(
    storeContext.store.expenses,
    storeContext.store.target,
    dateContext.date
  );

  return (
    <Outer>
      <Calendar />
      <Section>
        <div>Spending Goal</div>
        <div onClick={() => setIsSetTargetModalOpen(true)}>
          {storeContext.store.target}
        </div>
      </Section>
      <Section>
        <div>Spending Today</div>
        <div
          style={{ color: expensesInDaySum <= dayTarget ? 'green' : 'red' }}
          onClick={() => setIsAddExpenseModalOpen(true)}
        >
          {expensesInDaySum}
          {dayTarget > 0 ? <>&nbsp;/&nbsp;{dayTarget.toFixed(2)}</> : null}
        </div>
      </Section>
      <Section>
        <div>Spending This Month</div>
        <div
          style={{
            color:
              expensesInMonthSum <= storeContext.store.target ? 'green' : 'red',
          }}
          onClick={() => setIsAddExpenseModalOpen(true)}
        >
          {expensesInMonthSum}
        </div>
      </Section>
      <SetTargetModal
        onSubmit={(target) => {
          storeContext.setStore({
            ...storeContext.store,
            target: target,
          });
          setIsSetTargetModalOpen(false);
        }}
        onDismiss={() => setIsSetTargetModalOpen(false)}
        open={isSetTargetModalOpen}
      />
      <AddExpenseModal
        onSubmit={(amount) => {
          storeContext.setStore({
            ...storeContext.store,
            expenses: [
              ...storeContext.store.expenses,
              {
                date: moment.utc().toISOString(),
                amount,
              },
            ],
          });
          setIsAddExpenseModalOpen(false);
        }}
        onDismiss={() => setIsAddExpenseModalOpen(false)}
        open={isAddExpenseModalOpen}
      />
    </Outer>
  );
}
