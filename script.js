document.addEventListener('DOMContentLoaded', function () {
	const screen = document.getElementById('screen')
	const buttons = document.querySelectorAll(".calculator input[type='button']")

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
					screen.value = eval(screenValue)
				}
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
})
