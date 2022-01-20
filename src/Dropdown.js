import { animateCSS } from './Animate.js'

const $ = (e) => document.querySelector(e)

const customSelect = $('.custom-select-wrapper')
const dropdown = $('.custom-select-dropdown')
const arrow = $('.arrow-sorting i')
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
