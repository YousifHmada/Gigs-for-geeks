import Job from "../entities/Job";

export default function reducer(state, action) {

	switch (action.type) {
		case "JOBS_RECIEVED":
			function onJobReceived() {
				const { total, results, page, resultsPerPage } = action.payload;
				return {
					...state,
					jobs: results.map((body) => new Job(body)),
					total,
					page,
					resultsPerPage,
				};
			}
			return onJobReceived();
		case "JOB_DELETED":
			function onJobDeleted() {
				const { jobs } = state;
				const id = action.payload;
				const index = jobs.findIndex((job) => job.id === id);
				const job = jobs[index];
				return {
					...state,
					jobs: jobs.filter((job) => job.id !== id),
					flashMessage: {
						body: `Job with title : ${job.title} was deleted.`,
						type: "success",
					},
				};
			}
			return onJobDeleted();
		case "FILTER_ADDED":
			function onFilterApplied() {
				const { field, value } = action.payload;
				let { filters } = state;
				filters[field] = value;
				if (!value) {
					delete filters[field];
				} 
				return {
					...state,
					filters
				};
			}
			return onFilterApplied();
		case "FILTER_REMOVED":
			function onFilterRemoved() {
				const field = action.payload;
				let { filters } = state;
				delete filters[field];
				return {
					...state,
					filters
				};
			}
			return onFilterRemoved();
		case "SHOW_FLASH_MESSAGE":
			return {
				...state,
				flashMessage: action.payload,
			};
		case "CLEAR_FLASH_MESSAGE":
			return { ...state, flashMessage: null };
		default:
			return state;
	}
}
