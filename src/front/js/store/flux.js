const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: []
		},
		actions: {
			login: () => {
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
				fetch("https://3001-apricot-gull-2kgbaff4.ws-eu16.gitpod.io/api/token", opts)
					.then(response => {
						if (response.status == 200) return response.json();
						else alert("There has been an error.");
					})
					.then(data => {
						console.log("This came from the backend", data);
						sessionStorage.setItem("token", data.access_token);
					})
					.catch(error => console.log("There was an error!", error));
			},
			editFetch: monkey => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + monkey.kite, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						full_name: monkey.full_name,
						email: monkey.email,
						agenda_slug: "agenda_2025",
						address: monkey.address,
						phone: monkey.phone
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

			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
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
						phone: contact.phone
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
			}
		}
	};
};
export default getState;
