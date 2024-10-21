import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./RequestSlice";


const appStore = configureStore({
  reducer: {
    user: useReducer,
    feed: feedReducer,
    Connections:connectionReducer,
    requests: requestReducer 
    
  },
});

export default appStore;