import { animateCSS } from './Animate.js'
import { fillFeedbacks } from './Data.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

const customSelect = $('.custom-select-wrapper')
const dropdown = $('.custom-select-dropdown')
const arrow = $('.arrow-sorting i')
const sortingOptions = $$('.custom-select-dropdown-option')
let activeCategory = null
let sorting = ''
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

sortingOptions.forEach((option) => {
   option.addEventListener('click', (e) => {
      sorting = e.currentTarget.dataset.id
      activeCategory = $('#active-category').dataset.id
      sortingOptions.forEach((opt) => {
         opt.removeAttribute('id')
      })
      e.currentTarget.id = 'active-sorting'
      $('.selected-sorting').innerHTML = e.currentTarget.textContent
      fillFeedbacks(activeCategory, sorting)
   })
})
