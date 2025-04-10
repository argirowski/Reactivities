import { createContext } from "react";
import counterStore from "./counterStore";
import { uiStore } from "./uiStore";
import { activityStore } from "./activityStore";

interface Store {
  counterStore: counterStore;
  uiStore: uiStore;
  activityStore: activityStore;
}

export const store: Store = {
  counterStore: new counterStore(),
  uiStore: new uiStore(),
  activityStore: new activityStore(),
};
export const StoreContext = createContext(store);
