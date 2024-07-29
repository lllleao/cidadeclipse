const animationStore = () => {
    const heightSome = document.querySelector('.store')
    
    const purchaseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heightSome.classList.add('store-is-active')
            } else {
                heightSome.classList.remove('store-is-active')
            }
        })
    })

    purchaseObserver.observe(heightSome)
}

export default animationStore
