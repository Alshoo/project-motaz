

const Base_Url = "https://exam.hatfpfp.com/api";


export async function UserLogin( username, password ) {
	const res = await fetch(`${Base_Url}/login`, {
		method: "POST",
		headers: {
			"Accept": "application/json",
		},
		body: JSON.stringify({
			"email": username,
			"password": password,
		}),
	});
	const data = await res.json();
	return data;
}