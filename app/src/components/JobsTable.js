import React, { useContext } from "react";
import "./JobsTable.css";
import { GlobalContext } from "../core/GlobalProvider";
import noResultsGif from "./no-results.gif";

export default function JobsTable() {
	// eslint-disable-next-line no-unused-vars
	const {
		state: { jobs, total, page },
		dispatch,
		apis,
	} = useContext(GlobalContext);

	function displayBody() {
		const trs = jobs.map((job) => {
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
			<div className="table-responsive-sm text-center">
				<table className="table table-borderless">
					<thead>
						<tr>
							<th scope="col">id</th>
							<th scope="col">title</th>
							<th scope="col">link</th>
							<th scope="col">isoDate</th>
							<th scope="col">content</th>
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
		</div>
	);
}
