import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainPage } from './pages/mainPage';
import { DateContextProvider } from './contexts/dateContext';
import { StoreContextProvider } from './contexts/storeContext';

const root = createRoot(document.getElementById('root')!);
root.render(
  <DateContextProvider>
    <StoreContextProvider>
      <MainPage />
    </StoreContextProvider>
  </DateContextProvider>
);
