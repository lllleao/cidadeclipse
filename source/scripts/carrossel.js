document.addEventListener('DOMContentLoaded', () => {
    const carrousselItems = document.querySelectorAll('.carroussel a')
    const widthLib = document.querySelector('.public-lb')
    let elementWidth = carrousselItems[0].clientWidth

    const widthLibResize = new ResizeObserver((e) => {
        elementWidth = carrousselItems[0].clientWidth
        const currentWidth = e[0].borderBoxSize[0].inlineSize
        if (currentWidth > 706) {
            carrousselItems.forEach(item => {
                item.style.cssText = `transform: none;`


                
            })
        } else {
            carrousselItems.forEach((item, index) => {
                item.addEventListener('touchstart', function (event) {
                    touchMoves(event, index)
                })
            })
        }
    })

    widthLibResize.observe(widthLib)
    const state = {
        startPoint: 0,
        positionSaved: 0,
        currentPoint: 0,
        moviment: 0,
        indexCurrent: 0,
        positionSavedBefore: 0,
        positionSavedAfter: 0,
        positionSavedTotal: 0,
    }
    let test

    carrousselItems.forEach(item => {
        item.addEventListener('transitionend', (e) => {
            loop(e, test)
        })
    })

    const loop = (e, test) => {
            if (test) {
                e.currentTarget.style.cssText = `transform: translateX(${0}px);`
                e.currentTarget.style.transition = 'none'

                state.startPoint = 0
                state.positionSaved = 0
                state.currentPoint = 0
                state.moviment = 0
                state.indexCurrent = 0
                state.positionSavedBefore = 0
                state.positionSavedAfter = 0
                state.positionSavedTota = 0
            }
    }

    const setTranslate = (position) => {
        
        carrousselItems.forEach(item => {
            item.style.cssText = `transform: translateX(${position}px);`
            item.style.transition = `transform 0.3s`
        })
        state.positionSaved = position
    }

    function touchMoves(e, index) {
        const element = e.currentTarget
        state.indexCurrent = index
        state.startPoint = e.targetTouches[0].clientX
        state.currentPoint = state.startPoint - state.positionSaved
        state.positionSavedBefore = state.positionSaved
        console.log(state.indexCurrent)

        element.removeEventListener('touchend', onMouseUp)
        element.addEventListener('touchmove', onMouseMove)
    }

    function onMouseMove(e) {
        state.moviment = e.targetTouches[0].clientX - state.currentPoint
        state.positionSaved = state.moviment
        carrousselItems.forEach(item => {
            item.style.cssText = `transform: translateX(${state.moviment}px);`
            item.addEventListener('touchend', onMouseUp)
        })
    }


    function onMouseUp() {
        state.positionSavedAfter = state.moviment
        state.positionSavedTotal = state.positionSavedAfter - state.positionSavedBefore

        if (state.positionSavedTotal < -100) {
            const position = (state.indexCurrent - 4) * (elementWidth + 16)
            setTranslate(-position)

        } else if (state.positionSavedTotal > 100) {
            const position = (state.indexCurrent - 6) * (elementWidth + 16)

            setTranslate(-position)

        } else {
            const position = (state.indexCurrent - 5) * (elementWidth + 16)
            setTranslate(-position)
        }
        test = state.positionSaved === -((elementWidth + 16) * 4) || state.positionSaved === ((elementWidth + 16) * 4)
    }
})