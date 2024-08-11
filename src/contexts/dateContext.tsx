import moment from 'moment';
import React, { createContext, useRef, useState } from 'react';
import useInterval from 'use-interval';

export type DateContextData = {
  date: moment.Moment;
};

const defaultDateContextData: DateContextData = {
  date: moment.unix(0),
};

export type DateContextInterface = DateContextData;

const defaultDateContextInterface: DateContextInterface = {
  ...defaultDateContextData,
};

export const DateContext = createContext<DateContextInterface>(
  defaultDateContextInterface
);

export function DateContextProvider(props: React.PropsWithChildren<{}>) {
  const [_forceUpdate, setForceUpdate] = useState<number>(0);
  const dateRef = useRef<moment.Moment>(moment());

  useInterval(() => {
    const currentDate = moment();
    if (!dateRef.current.isSame(currentDate, 'day')) {
      dateRef.current = currentDate;
      setForceUpdate(new Date().getTime());
    }
  }, 1000);

  return (
    <DateContext.Provider
      value={{
        date: dateRef.current,
      }}
    >
      {props.children}
    </DateContext.Provider>
  );
}
