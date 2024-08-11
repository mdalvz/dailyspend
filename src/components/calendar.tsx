import React, { useContext } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../contexts/storeContext';
import { DateContext } from '../contexts/dateContext';
import { getCalendarSummary } from '../lib/getCalendarSummary';

const Outer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: min-content repeat(6, 1fr);
  border: 1px solid gray;
`;

const HeaderCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  border: 1px solid gray;

  > *:nth-child(1) {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const BodyCell = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
  border: 1px solid gray;
  min-width: 2rem;

  > *:nth-child(1) {
    font-size: 0.8rem;
    font-weight: 300;
  }

  > *:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > *:nth-child(1) {
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;

export function Calendar() {
  const dateContext = useContext(DateContext);
  const storeContext = useContext(StoreContext);
  const calendarSummary = getCalendarSummary(
    storeContext.store.expenses,
    storeContext.store.target,
    dateContext.date
  );
  return (
    <Outer>
      {[...'SMTWTFS'].map((day) => (
        <HeaderCell>
          <div>{day}</div>
        </HeaderCell>
      ))}
      {calendarSummary.days.map((day) => (
        <BodyCell>
          {day !== null ? (
            <>
              <div>{day.day}</div>
              {day.expenses !== null ? (
                <div
                  style={{ color: day.expenses > day.target ? 'red' : 'green' }}
                >
                  {day.expenses}
                </div>
              ) : null}
            </>
          ) : null}
        </BodyCell>
      ))}
    </Outer>
  );
}
