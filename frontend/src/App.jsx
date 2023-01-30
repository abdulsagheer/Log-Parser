import React, { useState } from "react";

const App = () => {
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);

	const handleFileUpload = async (e) => {
		setLoading(true);
		const file = e.target.files[0];
		try {
			const res = await fetch("http://localhost:5000/parse-logs", {
				method: "POST",
				body: file,
			});
			const json = await res.json();
			setResponse(json);
			setLoading(false);
		} catch (err) {
			setError(err);
			setLoading(false);
		}
	};

	const downloadResponse = () => {
		const json = JSON.stringify(response);
		const blob = new Blob([json], { type: "application/json" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "response.json";
		document.body.appendChild(link);
		link.click();
		link.remove();
	};

	return (
		<div>
			{error && <div>An error occurred: {error.message}</div>}
			<input type="file" onChange={handleFileUpload} />
			{loading && <div>Loading...</div>}
			{response && (
				<button onClick={downloadResponse}>Download JSON response</button>
			)}
		</div>
	);
};

export default App;
