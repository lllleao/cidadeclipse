document.addEventListener('DOMContentLoaded', () => {
    const carrousselItems = document.querySelectorAll('.carroussel a')
    // const carrousselContainer = document.querySelectorAll('.carroussel')
    // const targetRight = document.querySelector('.mask-right')
    // const targetLeft = document.querySelector('.mask-left')
    // let widthSaved = 0
    // let width = carrousselItems[0].clientWidth
    // let widthLib = document.querySelector('.public-lb')

    // const widthLibResize = new ResizeObserver((e) => {
    //     const currentWidth = e[0].borderBoxSize[0].inlineSize
    //     if (currentWidth > 706) {
    //         widthSaved = 0
    //         nextSlide(0 - 16)
    //     }
    // })

    // widthLibResize.observe(widthLib)

    // const nextSlide = (width) => {
    //     let position = nextPrev(width)
    //     carrousselItems.forEach((item) => {
    //         item.style.cssText = `transform: translateX(${position}px);`
    //         item.style.transition = 'transform 0.3s'
    //     })
    // }

    // const prevSlide = (width) => {
    //     let position = backPrev(width)
    //     carrousselItems.forEach((item) => {
    //         item.style.cssText = `transform: translateX(${position}px);`
    //         item.style.transition = 'transform 0.3s'
    //     })
    // }

    // const backPrev = (width) => {
    //     const position = widthSaved + (width + 16)
    //     widthSaved = position
    //     if (widthSaved === ((width + 16) * 3)) {
    //         widthSaved = 0
    //     }
    //     return position
    // }

    // const nextPrev = (width) => {
    //     const position = widthSaved - (width + 16)
    //     widthSaved = position
    //     if (widthSaved === ((width + 16) * -3)) {
    //         widthSaved = 0
    //     }
    //     return position
    // }

    // const loop = (event) => {
    //     const ver = widthSaved === 0
    //     if (ver) {
    //         event.style.cssText = `transform: translateX(${0});`
    //         event.style.transition = 'none'
    //     }
    // }

    // targetRight.addEventListener('click', () => {
    //     nextSlide(width)
    // })

    // targetLeft.addEventListener('click', () => {
    //     prevSlide(width)
    // })

    // Arrastar slide
    const state = {
        startPoint: 0,
        positionSaved: 0,
        currentPoint: 0,
        moviment: 0,
        indexCurrent: 0,
        widthSaved: 0,
        c1: 0,
        c2: 0,
        total: []
    }

    function touchMoves(e, index) {
        const element = e.currentTarget
        state.indexCurrent = index
        state.startPoint = e.targetTouches[0].clientX
        state.currentPoint = state.startPoint - state.positionSaved
        state.c1 = state.positionSaved
        element.addEventListener('touchmove', onMouseMove)
    }

    function onMouseMove(e) {
        const element = e.currentTarget
        // console.log(state.controll, 'depois c')
        state.moviment = e.targetTouches[0].clientX - state.currentPoint
        state.c2 = state.moviment
        state.positionSaved = state.moviment
        carrousselItems.forEach(item => {
            item.style.cssText = `transform: translateX(${state.moviment}px);`
        })
    }


    function onMouseUp(e) {
        const element = e.currentTarget
        const elementWidth = element.clientWidth
        state.total = state.c2 - state.c1
        console.log(state.total, 'total')

        if (state.total < -50) {
            console.log('entrou next')
            const position = (state.indexCurrent - 3) * (elementWidth + 16)
            carrousselItems.forEach(item => {
                item.style.cssText = `transform: translateX(${-position}px);`
                item.style.transition = `transform 0.3s`
            })
            state.positionSaved = -position
            state.widthSaved = position
        } else if (state.total > 50) {
            console.log('entrou back')
            const position = (state.indexCurrent - 5) * (elementWidth + 16)
            carrousselItems.forEach(item => {
                item.style.cssText = `transform: translateX(${-position}px);`
                item.style.transition = `transform 0.3s`
            })
            state.positionSaved = -position
            console.log(state.positionSaved, 'PS')
            state.widthSaved = position
        } else {
            console.log('entrou noMove')
            const position = 0
            carrousselItems.forEach(item => {
                item.style.cssText = `transform: translateX(${-position}px);`
                item.style.transition = `transform 0.3s`
            })
            state.positionSaved = -position
            state.widthSaved = position
        }
    }

    carrousselItems.forEach((item, index) => {
        item.addEventListener('transitionend', (event) => {
            loop(event.target)
        })

        item.addEventListener('touchstart', function (event) {
            touchMoves(event, index)
        })
        item.addEventListener('touchend', onMouseUp)

        item.addEventListener('click', (e) => {
            e.preventDefault()
        })
    })
})