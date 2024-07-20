document.addEventListener('DOMContentLoaded', () => {
    const menuBurguer = document.querySelector('.hamburguer-wrapper')
    const menuModal = document.querySelector('.menu-mob')

    menuBurguer.addEventListener('click', () => {
        menuBurguer.classList.toggle('hamburguer-wrapper__is-active-menu')
        menuModal.classList.toggle('menu-mob__is-active-menu')
    })
})