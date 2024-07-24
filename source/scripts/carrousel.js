document.addEventListener('DOMContentLoaded', () => {
    const carrousselItems = document.querySelectorAll('.carroussel a')
    const targetRight = document.querySelector('.mask-right')
    const targetLeft = document.querySelector('.mask-left')
    let widthSaved = 0
    let width = carrousselItems[0].clientWidth
    let widthLib = document.querySelector('.public-lb')

    const widthLibResize = new ResizeObserver((e) => {
        const currentWidth = e[0].borderBoxSize[0].inlineSize
        if (currentWidth > 706) {
            console.log(currentWidth)
            widthSaved = 0
            nextSlide(0 - 16)
        }
    })

    widthLibResize.observe(widthLib)
    
    const nextSlide = (width) => {
        let position = nextPrev(width)
        carrousselItems.forEach((item) => {
            item.style.cssText = `transform: translateX(${position}px);`
            item.style.transition = 'transform 0.3s'
        })
    }

    const prevSlide = (width) => {
        let position = backPrev(width)
        carrousselItems.forEach((item) => {
            item.style.cssText = `transform: translateX(${position}px);`
            item.style.transition = 'transform 0.3s'
        })
    }

    const backPrev = (width) => {
        const position = widthSaved + (width + 16)
        widthSaved = position
        if (widthSaved === ((width + 16) * 3)) {
            widthSaved = 0
        }
        return position
    }

    const nextPrev = (width) => {
        const position = widthSaved - (width + 16)
        widthSaved = position
        if (widthSaved === ((width + 16) * -3)) {
            widthSaved = 0
        }
        return position
    }

    const loop = (event) => {
        const ver = widthSaved === 0
        if (ver) {
            event.style.cssText = `transform: translateX(${0});`
            event.style.transition = 'none'
        }
    }

    targetRight.addEventListener('click', () => {
        nextSlide(width)
    })

    targetLeft.addEventListener('click', () => {
        prevSlide(width)
    })

    carrousselItems.forEach(item => {
        item.addEventListener('transitionend', (event) => {
            loop(event.target)
        })

        item.addEventListener('dragstart', function(e) {
            e.preventDefault()
        })

        item.addEventListener('mousedown', function() {
            item.addEventListener('mousemove', function() {
                item.style.border = '1px solid red'
            })
        })
    })
})