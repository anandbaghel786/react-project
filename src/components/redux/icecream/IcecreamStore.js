import { createStore } from "redux";
import IcecreamReducer from "./IcecreamReducer";

const icecreamStore = createStore(IcecreamReducer);

export default icecreamStore;