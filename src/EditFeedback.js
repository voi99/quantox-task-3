import { getSingleFeedback } from './Data.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

$('.header-back').addEventListener('click', () => {
   window.location.href = `../index.html`
})

const url = new URL(window.location)
const id = url.searchParams.get('id')

const fillForm = async (id) => {
   const feedback = await getSingleFeedback(id)
   $('.editing-feedback').innerHTML = `Editing '${feedback.title}'`
   $('[name=feedback-title]').value = `${feedback.title}`
   $(`[name=feedback-details]`).value = `${feedback.description}`
}

fillForm(id)
