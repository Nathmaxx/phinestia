import { toast } from "react-toastify";

export const successToastMessage = (message: string, duration = 3000) => {
	toast.success(message, {
		position: "bottom-right",
		autoClose: duration,
		closeButton: true,
		closeOnClick: true,
		pauseOnHover: true,

	});
};