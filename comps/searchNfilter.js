import { createContext } from "react";

let SearchContext = createContext({
    params: {
        lowerBudget: 200,
        upperBudget: 1000,
        typeOfSpace: "",
        cityOrTown: "",
    }, changeParams: () => { }
});
function Search_N_FilterContextProvider({ ctxValue, hookChangeCtxValue, children }) {
    return <>
        <SearchContext.Provider value={{ params: ctxValue, changeParams: hookChangeCtxValue }} >
            {children}
        </SearchContext.Provider>
    </>
}
export { SearchContext, Search_N_FilterContextProvider }