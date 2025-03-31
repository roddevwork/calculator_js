document.addEventListener('DOMContentLoaded', function () {
	const screen = document.querySelector('.display input[type="text"]')
	const buttons = document.querySelectorAll(".calculator input[type='button']")
	let history = []

	// Función para manejar las entradas
	function handleInput(value) {
		if (value === '=') {
			if (screen.value.trim() === '') {
				return // No hacer nada si no hay datos en la pantalla
			}
			try {
				const screenValue = screen.value

				// Manejo de porcentajes
				const regex = /(\d+)%(\d+)/
				if (regex.test(screenValue)) {
					const matches = screenValue.match(regex)
					const percentage = parseFloat(matches[1])
					const number = parseFloat(matches[2])
					screen.value = ((percentage / 100) * number).toString()
				} else if (screenValue.includes('%')) {
					screen.value = (
						parseFloat(screenValue.replace('%', '')) / 100
					).toString()
				} else {
					screen.value = parseFloat(eval(screenValue)).toFixed(5) // Evaluar la expresión matemática
				}

				// Agregar al historial y actualizar la vista
				if (history.length > 4) {
					history.shift() // Eliminar la entrada más antigua
				}
				history.push(`${screenValue} = ${screen.value}`)
				updateHistoryDisplay()
			} catch (error) {
				screen.value = 'Error'
			}
		} else if (value === 'C' || value === 'c') {
			screen.value = ''
		} else if (value === '%') {
			screen.value += '%'
		} else if (value === '←') {
			screen.value = screen.value.slice(0, -1)
		} else {
			screen.value += value
		}
	}

	// Función para actualizar la vista del historial
	function updateHistoryDisplay() {
		const historyList = document.getElementById('history-list')
		historyList.innerHTML = '' // Limpiar el historial actual

		// Recorrer el array history y agregar cada entrada a la lista
		history.forEach((entry) => {
			const listItem = document.createElement('li')
			listItem.textContent = entry
			historyList.appendChild(listItem)
		})
	}

	// Añadir event listener para botones de la calculadora
	buttons.forEach((button) => {
		button.addEventListener('click', function () {
			handleInput(this.value)
		})
	})

	// Añadir event listener para el teclado
	document.addEventListener('keydown', function (event) {
		const key = event.key
		const validKeys = '0123456789+-*/%=Cc'
		if (validKeys.includes(key)) {
			handleInput(key)
		} else if (key === 'Enter') {
			handleInput('=')
		} else if (key === 'Backspace') {
			handleInput('←')
		}
	})

	// Event listener para mostrar/ocultar historial
	document
		.getElementById('toggle-history')
		.addEventListener('click', function () {
			document.getElementById('history-container').classList.toggle('hidden')
		})
})
