;(() => {
  const menuButton = document.querySelector('[data-collapse-toggle=mobile-menu]')
  const mobileMenu = document.querySelector('#mobile-menu')

  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden')
  })
})()
