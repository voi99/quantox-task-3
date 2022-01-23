import { fillFeedbacks } from './Data.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)
let activeCategory = null

fillFeedbacks(activeCategory)

const categoryButtons = $$('.category-btn')

categoryButtons.forEach((btn) => {
   btn.addEventListener('click', (e) => {
      categoryButtons.forEach((categoryBtn) => {
         categoryBtn.removeAttribute('id')
      })
      e.currentTarget.id = 'active-category'
      activeCategory = e.currentTarget.dataset.id
      fillFeedbacks(activeCategory)
   })
})
