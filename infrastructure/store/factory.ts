import { configureStore } from "@reduxjs/toolkit";
import config from "./config";

const createStore = (cfg = config) =>
    configureStore(cfg);

export default createStore;
