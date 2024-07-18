document.addEventListener('DOMContentLoaded', () => {
    const carrousselContainer = document.querySelector('.carroussel')
    const carrousselItems = document.querySelectorAll('.carroussel a')
    const targetRight = document.querySelector('.mask-right')
    const targetLeft = document.querySelector('.mask-left')
    let state = {
        transition: 1,
        count: 0
    }
    
    targetRight.addEventListener('click', () => {
        console.log(state.transition)
        carrousselItems.forEach(item => {
            item.style.cssText = `transform: translateX(-${state.transition}%);`
            item.style.transition = 'transform 0.3s'
        })
        
        state.transition += 104
        state.count++
        console.log(state.count)
        state.count = state.count === 4 ? 1 : state.count
    })
    carrousselItems.forEach(item => {
        item.addEventListener('transitionend', () => {
            // console.log(state.count)
            if (state.count === 3) {
                state.count = 3
                item.style.cssText = `transform: translateX(109%);`
                item.style.transition = 'none'
                state.transition = 1
            }
        })
    })

})