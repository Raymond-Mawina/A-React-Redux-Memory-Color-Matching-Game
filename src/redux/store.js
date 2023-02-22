import { createStore } from "redux";
import { cardReducer } from "./features/board/reducer.js";

const store = createStore(cardReducer);
export default store;
