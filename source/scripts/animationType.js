setTimeout(() => {
    const element = document.querySelector('.hero__description__subtitle')
    const text = 'uma cooperativa de artistas emergentes'
    element.innerHTML = ''
    let count = 0

    const interval = setInterval(() => {
        element.classList.add('hero__description__subtitle--visible')
        element.innerHTML += text[count]
        count++
        
        if (count === text.length) {
            clearInterval(interval)
        }
    }, 90)

}, 3000)
