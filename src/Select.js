import { animateCSS } from './Animate.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

const customSelect = $('.custom-select')
const dropdown = $('.custom-select-dropdown')
const arrow = $('.arrow-sorting i')
const categoryOptions = $$('.custom-select-dropdown-option')
let flag = true

customSelect.addEventListener('click', async (e) => {
   if (flag) {
      dropdown.classList.toggle('hide')
      arrow.style.transform = `rotate(180deg)`
      await animateCSS(dropdown, 'zoomIn', '0.5s')
   } else {
      arrow.style.transform = `rotate(0deg)`
      await animateCSS(dropdown, 'zoomOut', '1s')
      dropdown.classList.toggle('hide')
   }
   flag = !flag
})

categoryOptions.forEach((option) => {
   option.addEventListener('click', (e) => {
      categoryOptions.forEach((opt) => {
         opt.removeAttribute('id')
      })
      e.currentTarget.id = 'selected-category'
      $('.selected-category').innerHTML = e.currentTarget.textContent
   })
})
