import { createStore } from "redux";
import CakeReducer from "./CakeReducer";

const cakeStore = createStore(CakeReducer);

export default cakeStore;