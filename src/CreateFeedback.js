import { addNewFeedback, fetchData } from './Data.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

$('.header-back').addEventListener('click', () => {
   window.location.href = `../index.html`
})

$('.add-feedback-form').addEventListener('submit', async (e) => {
   e.preventDefault()
   const title = $(`[name='feedback-title']`).value
   const category = $('#selected-category').dataset.id
   const details = $(`[name='feedback-details']`).value
   const { productRequests } = await fetchData()
   console.log(productRequests)
   let latestId = productRequests[productRequests.length - 1].id
   const newFeedback = {
      id: ++latestId,
      title,
      category,
      upvotes: 0,
      status: 'suggestion',
      description: details,
   }
   addNewFeedback(newFeedback)
   window.location.href = '../index.html'
})

$('input').addEventListener('blur', (e) => {
   if (e.currentTarget.value.length <= 0) {
      $(`span[data-id=${e.currentTarget.dataset.id}`).classList.remove('hide')
      e.currentTarget.classList.add('error-input')
   } else {
      $(`span[data-id=${e.currentTarget.dataset.id}`).classList.add('hide')
      e.currentTarget.classList.remove('error-input')
   }
})

$('textarea').addEventListener('blur', (e) => {
   if (e.currentTarget.value.length <= 0) {
      $(`span[data-id=${e.currentTarget.dataset.id}`).classList.remove('hide')
      e.currentTarget.classList.add('error-input')
   } else {
      $(`span[data-id=${e.currentTarget.dataset.id}`).classList.add('hide')
      e.currentTarget.classList.remove('error-input')
   }
})

$('.cancel-btn').addEventListener('click', () => {
   window.location.href = '../index.html'
})
