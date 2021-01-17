const updateNomination = (title, id, year) => {
	const nominations = document.querySelector(".nominations")
	const movies = document.querySelectorAll(".nominee")
	const li = document.createElement("li")
	li.className = "nominee"
	li.dataset.id = id
	li.innerText = `${title} (${year})`
	li.title = "CLick to remove"
	nominations.appendChild(li)
	Array.from(movies).find((movie) => {
		if (movie.dataset.id === id) {
			movie.remove()
		}
	})
}

class MovieItem {
	constructor(title, year, id) {
		this.title = title
		this.year = year
		this.id = id
	}

	render() {
		const li = document.createElement("li")
		const button = document.createElement("button")
		button.innerText = "Nominate"
		button.className = "btn"
		const movies = document.querySelectorAll(".nominee")

		button.addEventListener("click", (e) => {
			const movieObject = {
				title: this.title,
				id: this.id,
				year: this.year,
			}
			if (localStorage.length < 5) {
				localStorage.setItem(this.id, JSON.stringify(movieObject))
				updateNomination(this.title, this.id, this.year)
				button.className = "btn disable"
			} else {
				alert("Can only add 5 movies")
			}
		})

		li.innerText = `${this.title} (${this.year})`
		li.className = "movie-item"
		button.dataset.id = this.id

		Array.from(movies).find((movie) => {
			if (movie.dataset.id === button.dataset.id) {
				button.className = "btn disable"
			}
		})
		li.appendChild(button)
		return li
	}
}
