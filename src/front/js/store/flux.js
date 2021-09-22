const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contacts: [],
			token: null,
			message: ""
			// note: ""
		},
		actions: {
			saveTokenFromSessionStorage: () => {
				const token = sessionStorage.getItem("token");
				if (token && token != "" && token != undefined) {
					setStore({ token: token });
				}
			},
			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: null });
			},
			login: async (username, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: username,
						password: password
					})
				};
				try {
					const resp = await fetch("https://3001-apricot-gull-2kgbaff4.ws-eu16.gitpod.io/api/token", opts);
					if (resp.status !== 200) {
						alert("There has been an error.");
						return false;
					}
					const data = await resp.json();
					console.log("This came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;
				} catch (error) {
					console.error("There has been an error while loging in.");
				}
			},
			editFetch: person => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + person.id, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						full_name: person.full_name,
						email: person.email,
						agenda_slug: "agenda_2025",
						address: person.address,
						phone: person.phone,
						note: person.note
					})
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						getActions().getFetch();
						// confirm return of data here
					})
					.catch(err => console.log("There was a following error: " + err));
			},

			greetUser: () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				};

				fetch("https://3001-apricot-gull-2kgbaff4.ws-eu16.gitpod.io/api/greet", opts)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(err => console.log("There has been an error loading message from backend", err));
			},

			deleteFetch: id => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "DELETE"
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						getActions().getFetch();
						// confirm return of data here
					})
					.catch(err => console.log("There was a following error: " + err));
			},

			getFetch: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/agenda_2025")
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => setStore({ contacts: data }))
					.catch(err => console.log("There was a following error: " + err));
			},

			postFetch: contact => {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						full_name: contact.name,
						email: contact.email,
						agenda_slug: "agenda_2025",
						address: contact.address,
						phone: contact.phone,
						note: contact.note
					})
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						getActions().getFetch();
						console.log("This is the POST fetch data ", data);
						// confirm return of data here
					})
					.catch(err => console.log("There was a following error: " + err));
			}
		}
	};
};
export default getState;
