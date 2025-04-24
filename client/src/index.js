import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore.js";
import ConfiguratorStore from "./store/ConfiguratorStore.js";
import FilterStore from "./store/FilterStore.js";

export const Context = createContext();

const context = {
    user: new UserStore(),
    configurator: new ConfiguratorStore(),
    filter: new FilterStore(),
};

function AppWithProvider() {
    return (
        <Context.Provider value={context}>
            <App />
        </Context.Provider>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AppWithProvider />);
