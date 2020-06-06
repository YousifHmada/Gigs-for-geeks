import React, { useContext } from "react";
import "./JobsTable.css";
import { GlobalContext } from "../core/GlobalProvider";
import ReactPaginate from "react-paginate";
import noResultsGif from "./no-results.gif";
import { TextField } from "@material-ui/core";

export default function JobsTable() {
	// eslint-disable-next-line no-unused-vars
	let {
		state: { jobs, total, page, resultsPerPage, filters },
		dispatch,
		apis,
	} = useContext(GlobalContext);

	let filteredJobs = [...jobs];
	const fields = Object.keys(filters);
	for (let i = 0; i < fields.length; i++) {
		const field = fields[i];
		const value = filters[field];
		// eslint-disable-next-line react-hooks/exhaustive-deps
		filteredJobs = filteredJobs.filter(
			(job) => ~job[field].toString().indexOf(value.toString())
		);
	}

	function displayBody() {
		const trs = filteredJobs.map((job) => {
			const { id, title, link, content, isoDate } = job;
			return (
				<tr key={id}>
					<th scope="row">{id}</th>
					<td>{title}</td>
					<td>
						<a href={link}>{decodeURI(link)}</a>
					</td>
					<td>{isoDate.toLocaleTimeString()}</td>
					<td dangerouslySetInnerHTML={{ __html: content }}></td>
					<td className="right aligned">
						<span
							className="btn-close"
							onClick={() => {
								apis.deleteJob(id);
								dispatch({ type: "JOB_DELETED", payload: id });
							}}
						>
							&times;
						</span>
					</td>
				</tr>
			);
		});
		return trs;
	}
	return (
		<div className="container-fluid">
			<h3 className="font-italic">Gigs from upwork!</h3>
			<div>
				<ReactPaginate
					previousLabel={"<"}
					nextLabel={">"}
					pageCount={Math.ceil(total / resultsPerPage)}
					marginPagesDisplayed={page}
					pageRangeDisplayed={10}
					onPageChange={({ selected: index }) => {
						const page = index + 1;
						apis.getJobs(page).then((data) => {
							if (data.total === 0) {
								throw new Error();
							}
							dispatch({ type: "JOBS_RECIEVED", payload: data });
						});
					}}
					breakClassName={"page-item"}
					breakLinkClassName={"page-link"}
					containerClassName={"pagination"}
					pageClassName={"page-item"}
					pageLinkClassName={"page-link"}
					previousClassName={"page-item"}
					previousLinkClassName={"page-link"}
					nextClassName={"page-item"}
					nextLinkClassName={"page-link"}
					activeClassName={"active"}
				/>
			</div>
			<div className="table-responsive-sm text-center">
				<table className="table table-borderless">
					<thead>
						<tr>
							<th scope="col">
								<TextField
									onChange={({
										nativeEvent: {
											target: { value },
										},
									}) => {
										dispatch({
											type: "FILTER_ADDED",
											payload: { field: "id", value },
										});
									}}
									className="block"
									placeholder="id"
								/>
							</th>
							<th scope="col">
								<TextField
									onChange={({
										nativeEvent: {
											target: { value },
										},
									}) => {
										dispatch({
											type: "FILTER_ADDED",
											payload: { field: "title", value },
										});
									}}
									className="block"
									placeholder="title"
								/>
							</th>
							<th scope="col">
								<TextField
									onChange={({
										nativeEvent: {
											target: { value },
										},
									}) => {
										dispatch({
											type: "FILTER_ADDED",
											payload: { field: "link", value },
										});
									}}
									className="block"
									placeholder="link"
								/>
							</th>
							<th scope="col">
								<TextField
									onChange={({
										nativeEvent: {
											target: { value },
										},
									}) => {
										dispatch({
											type: "FILTER_ADDED",
											payload: { field: "date", value },
										});
									}}
									className="block"
									placeholder="date"
								/>
							</th>
							<th scope="col">
								<TextField
									onChange={({
										nativeEvent: {
											target: { value },
										},
									}) => {
										dispatch({
											type: "FILTER_ADDED",
											payload: { field: "content", value },
										});
									}}
									className="block"
									placeholder="content"
								/>
							</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>{displayBody()}</tbody>
				</table>
				{jobs.length > 0 ? (
					""
				) : (
					<img id="no-found-img" src={noResultsGif} alt="no-results-found" />
				)}
			</div>
			<span class="font-italic">Count : {filteredJobs.length}</span>
		</div>
	);
}
