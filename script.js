document.addEventListener('DOMContentLoaded', function () {
	const screen = document.getElementById('screen')
	const buttons = document.querySelectorAll(".calculator input[type='button']")

	buttons.forEach((button) => {
		button.addEventListener('click', function () {
			const value = this.value
			if (value === '=') {
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
				} catch {
					screen.value = 'Error'
				}
			} else if (value === 'C') {
				screen.value = ''
			} else if (value === '%') {
				try {
					screen.value += '%'
				} catch {
					screen.value = 'Error'
				}
			} else if (value === '←') {
				screen.value = screen.value.slice(0, -1)
			} else {
				screen.value += value
			}
		})
	})
})
