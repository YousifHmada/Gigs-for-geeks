import React, { useContext, useEffect } from "react";
import "./FlashMessage.css";
import { GlobalContext } from "../core/GlobalProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FlashMessage() {
	const {
		state: { flashMessage },
		dispatch,
	} = useContext(GlobalContext);

	useEffect(() => {
		if (flashMessage) {
			const { type, body } = flashMessage;
			toast[type](body, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				draggable: true,
				progress: undefined,
			});
			const timeout = 5000;
			const timeOutObj = setTimeout(() => {
				dispatch({ type: "CLEAR_FLASH_MESSAGE" });
			}, timeout);
			return () => {
				clearTimeout(timeOutObj);
			};
		}
	}, [dispatch, flashMessage]);

	return flashMessage ? (
		<div className="text-center">
			<ToastContainer
				className="toast-container"
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable
			/>
		</div>
	) : (
		""
	);
}
