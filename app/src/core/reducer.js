import Job from "../entities/Job";

export default function reducer(state, action) {
	switch (action.type) {
		case "JOBS_RECIEVED":
			function onJobReceived() {
				const { total, results, page } = action.payload;
				debugger;
				return {
					...state,
					jobs: results.map((body) => new Job(body)),
					total,
					page,
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
