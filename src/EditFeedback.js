import { fetchData, getSingleFeedback } from './Data.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

$('.header-back').addEventListener('click', () => {
   window.history.back()
})

const url = new URL(window.location)
const id = url.searchParams.get('id')

const fillForm = async (id) => {
   const feedback = await getSingleFeedback(id)
   $('.editing-feedback').innerHTML = `Editing '${feedback.title}'`
   $('[name=feedback-title]').value = `${feedback.title}`
   $(`[name=feedback-details]`).value = `${feedback.description}`
   const categoryOptions = $$(
      `[data-id='category-dropdown'] .custom-select-dropdown-option`
   )

   const statusOptions = $$(
      `[data-id='status-dropdown'] .custom-select-dropdown-option`
   )
   categoryOptions.forEach((option) => option.removeAttribute('id'))
   statusOptions.forEach((option) => option.removeAttribute('id'))

   $(`.custom-select-dropdown-option[data-id='${feedback.category}']`).id =
      'selected-category'
   $(`.custom-select-dropdown-option[data-id='${feedback.status}']`).id =
      'selected-status'

   $('.selected-category').innerHTML =
      feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)
   $('.selected-status').innerHTML =
      feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)
}

$('.edit-feedback-form').addEventListener('submit', async (e) => {
   e.preventDefault()
   const title = $('[name=feedback-title]').value
   const category = $('.selected-category').textContent.toLowerCase()
   const status = $('.selected-status').textContent.toLowerCase()
   const details = $('[name=feedback-details]').value

   const data = await fetchData()
   let feedback = await getSingleFeedback(id)
   feedback = { ...feedback, title, category, status, description: details }

   const index = data.productRequests.findIndex((el) => el.id === +id)

   data.productRequests[index] = feedback
   localStorage.setItem('data', JSON.stringify(data))
   window.location.replace(`./feedback-detail.html?id=${id}`)
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

$('.cancel-btn').addEventListener('click', () => history.back())

$('.delete-btn').addEventListener('click', async () => {
   const data = await fetchData()
   const index = data.productRequests.findIndex((el) => el.id === +id)
   data.productRequests.splice(index, 1)
   localStorage.setItem('data', JSON.stringify(data))
   window.location.replace('../index.html')
})

fillForm(id)
