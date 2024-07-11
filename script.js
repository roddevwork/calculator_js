document.addEventListener('DOMContentLoaded', function () {
	const screen = document.getElementById('screen')
	const buttons = document.querySelectorAll(".calculator input[type='button']")

	buttons.forEach((button) => {
		button.addEventListener('click', function () {
			const value = this.value
			if (value === '=') {
				try {
					screen.value = eval(screen.value)
				} catch {
					screen.value = 'Error'
				}
			} else if (value === 'C') {
				screen.value = ''
			} else if (value === '%') {
				try {
					screen.value = (parseFloat(screen.value) / 100).toString()
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
