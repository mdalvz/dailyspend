import { defaultStore, Store } from '../model/store';

const storeKey = 'store';

export function loadStore(): Store {
  const raw = localStorage.getItem(storeKey);
  if (raw === null) {
    return defaultStore;
  }
  return JSON.parse(raw) as Store;
}

export function saveStore(store: Store) {
  localStorage.setItem(storeKey, JSON.stringify(store));
}
