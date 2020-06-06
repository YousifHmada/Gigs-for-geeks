import React, { useReducer, createContext, useEffect } from "react";
import reducer from "./reducer";
import * as apis from "./apis";

const initialState = {
	jobs: [],
	total: 0,
	page: 1,
	resultsPerPage: 10,
	flashMessage: null,
	filters: {},
};

export const GlobalContext = createContext(initialState);

export default function GlovalProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		let canceled = false;
		let timeOutObj;
		let tryAfter = 10000;
		function getJobs() {
			apis
				.getJobs(state.page)
				.then((data) => {
					if (!canceled) {
						if (data.total === 0) {
							timeOutObj = setTimeout(getJobs, tryAfter);
						} else {
							dispatch({ type: "JOBS_RECIEVED", payload: data });
						}
					}
				})
				.catch((error) => {
					if (!canceled) {
						dispatch({
							type: "SHOW_FLASH_MESSAGE",
							payload: {
								type: "error",
								body: `Failed to fetch jobs, will try again in ${
									tryAfter / 1000
								}s`,
							},
						});
						timeOutObj = setTimeout(getJobs, tryAfter);
					}
				});
		}
		getJobs();
		return () => {
			canceled = true;
			if (timeOutObj) {
				clearTimeout(timeOutObj);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				state,
				dispatch,
				apis,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
