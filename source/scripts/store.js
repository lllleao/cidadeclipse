document.addEventListener('DOMContentLoaded', () => {
    const heightSome = document.querySelector('.store')
    const cardStore = document.querySelector('.purchase .card_container__book')
    
    const purchaseObserver = new IntersectionObserver((entries) => {
        // console.log(entries)

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry.isIntersecting)
                heightSome.classList.add('store-is-active')
            } else {
                console.log(entry.isIntersecting)

                heightSome.classList.remove('store-is-active')
            }
        })
    })

    purchaseObserver.observe(heightSome)
})