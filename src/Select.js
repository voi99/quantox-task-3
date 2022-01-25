import { animateCSS } from './Animate.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

const customSelects = $$('.custom-select-wrapper')

const categoryOptions = $$(
   `[data-id='category-dropdown'] .custom-select-dropdown-option`
)

const statusOptions = $$(
   `[data-id='status-dropdown'] .custom-select-dropdown-option`
)

let flag = true

customSelects.forEach((customSelect) => {
   customSelect.addEventListener('click', async (e) => {
      let dropdown
      let arrow

      if (e.currentTarget.dataset.id === 'select-for-category') {
         dropdown = $(`[data-id='category-dropdown']`)
         arrow = $(`[data-id='select-for-category'] i`)
      } else {
         dropdown = $(`[data-id='status-dropdown']`)
         arrow = $(`[data-id='select-for-status'] i`)
      }

      if (flag) {
         dropdown.classList.toggle('hide')
         arrow.style.transform = `rotate(180deg)`
         await animateCSS(dropdown, 'zoomIn', '0.2s')
      } else {
         arrow.style.transform = `rotate(0deg)`
         await animateCSS(dropdown, 'zoomOut', '0.2s')
         dropdown.classList.toggle('hide')
      }
      flag = !flag
   })
})

categoryOptions.forEach((option) => {
   option.addEventListener('click', (e) => {
      categoryOptions.forEach((opt) => {
         opt.removeAttribute('id')
      })
      e.currentTarget.id = 'selected-category'
      $('.selected-category').innerHTML = e.currentTarget.textContent.trim()
   })
})

statusOptions.forEach((option) => {
   option.addEventListener('click', (e) => {
      statusOptions.forEach((opt) => {
         opt.removeAttribute('id')
      })
      e.currentTarget.id = 'selected-status'
      $('.selected-status').innerHTML = e.currentTarget.textContent.trim()
   })
})
