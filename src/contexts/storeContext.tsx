import { defaultStore, Store } from '../model/store';
import React, { createContext, useState } from 'react';
import { loadStore, saveStore } from '../lib/loadAndSaveStore';

export type StoreContextData = {
  store: Store;
};

const defaultStoreContextData: StoreContextData = {
  store: defaultStore,
};

export type StoreContextMethods = {
  setStore: (store: Store) => unknown;
};

const defaultStoreContextMethods: StoreContextMethods = {
  setStore: () => {},
};

export type StoreContextInterface = StoreContextData & StoreContextMethods;

const defaultStoreContextInterface = {
  ...defaultStoreContextData,
  ...defaultStoreContextMethods,
};

export const StoreContext = createContext<StoreContextInterface>(
  defaultStoreContextInterface
);

export function StoreContextProvider(props: React.PropsWithChildren<{}>) {
  const [store, setStore] = useState<Store>(loadStore());

  return (
    <StoreContext.Provider
      value={{
        store,
        setStore: (store) => {
          setStore(store);
          saveStore(store);
        },
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
