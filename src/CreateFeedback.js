const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

$('.header-back').addEventListener('click', () => {
   window.location.href = `../index.html`
})

$('.add-feedback-form').addEventListener('submit', (e) => {
   e.preventDefault()
   const title = $(`[name='feedback-title']`).value
   const category = $('#selected-category').dataset.id
   const details = $(`[name='feedback-details']`).value
   console.log({ title, category, details })
})

$('.cancel-btn').addEventListener('click', () => {
   $(`[name='feedback-title']`).value = ''
   $(`[name='feedback-details']`).value = ''
})
