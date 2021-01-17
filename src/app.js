const displayNomination = () => {
	const nominations = document.querySelector(".nominations")
	for (let i = 0; i < localStorage.length; ++i) {
		let object = JSON.parse(localStorage.getItem(localStorage.key(i)))

		const li = document.createElement("li")
		li.className = "nominee"
		li.dataset.id = object.id
		li.title = "CLick to remove"
		li.innerText = `${object.title} (${object.year})`
		nominations.appendChild(li)
	}
}

const apiUrl = "https://www.omdbapi.com/?apikey=6e5dd5a1&"

const load = () => {
	let bySearchUrl
	const searchForm = document.querySelector(".search")
	let searchValue
	searchValue = searchForm.searchValue.value.trim()
	searchValue = searchValue.toLowerCase()
	bySearchUrl = `${apiUrl}s=${searchValue}`

	return fetch(bySearchUrl)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`Status code ${res.status}`)
			}

			return res.json()
		})
		.then((results) => {
			return results.Search
		})
		.catch((err) => {
			console.warn(err)

			return null
		})
}

const init = () => {
	const searchForm = document.querySelector(".search")
	displayNomination()
	const nominations = document.querySelector(".nominations")
	const searchResult = document.querySelector(".search-result")

	searchForm.addEventListener("submit", (e) => {
		e.preventDefault()
		load().then((movies) => {
			if (!(movies && movies.length)) {
				searchResult.innerHTML = "Unable to load movies"

				return
			}
			searchResult.innerHTML = ""
			movies.forEach((movie) => {
				const title = movie.Title
				const year = movie.Year
				const id = movie.imdbID
				//movie item
				const movieItem = new MovieItem(title, year, id)

				searchResult.appendChild(movieItem.render())
			})
		})
	})

	nominations.addEventListener("click", (e) => {
		const moviesResult = document.querySelectorAll(".movie-item .btn")

		if (e.target.classList.contains("nominee")) {
			e.target.remove()
			for (let i = 0; i < localStorage.length; i++) {
				let a = localStorage.getItem(localStorage.key(i))
				a = JSON.parse(a)
				if (e.target.dataset.id === a.id) {
					localStorage.removeItem(localStorage.key(i))
				}
			}

			moviesResult.forEach((result) => {
				if (e.target.dataset.id === result.dataset.id) {
					result.classList.remove("disable")
				}
			})
		}
	})
}

window.onload = init
