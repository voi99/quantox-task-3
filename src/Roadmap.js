import { fetchData, feedbackHTMLBuilder } from './Data.js'
const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)
const ARROW_IMG_PATH = '../assets/shared/icon-arrow-up.svg'
const COMMENTS_IMG_PATH = '../assets/shared/icon-comments.svg'

;(async () => {
   $('.header-back').addEventListener('click', () => window.history.back())
   const { productRequests } = await fetchData()
   const plannedFeedbacks = productRequests.filter(
      (req) => req.status === 'planned'
   )
   $('.planned span').innerHTML = plannedFeedbacks.length
   const inProgressFeedbacks = productRequests.filter(
      (req) => req.status === 'in-progress'
   )
   $('.in-progress span').innerHTML = inProgressFeedbacks.length
   const liveFeedbacks = productRequests.filter((req) => req.status === 'live')
   $('.live span').innerHTML = liveFeedbacks.length

   const plannedSection = $('.list-planned-feedbacks')
   plannedSection.innerHTML = `<h2 class="title">Planned (${plannedFeedbacks.length})</h2>
            <p class="secondary-text">Ideas prioritized for research</p>`
   const inProgressSection = $('.list-in-progress-feedbacks')
   inProgressSection.innerHTML = `<h2 class="title">In-Progress (${inProgressFeedbacks.length})</h2>
            <p class="secondary-text">Ideas prioritized for research</p>`
   const liveSection = $('.list-live-feedbacks')
   liveSection.innerHTML = `<h2 class="title">Live (${liveFeedbacks.length})</h2>
            <p class="secondary-text">Ideas prioritized for research</p>`

   plannedFeedbacks.forEach((feedback) => {
      plannedSection.innerHTML += feedbackHTMLBuilder(
         feedback,
         ARROW_IMG_PATH,
         COMMENTS_IMG_PATH,
         true
      )
   })

   inProgressFeedbacks.forEach((feedback) => {
      inProgressSection.innerHTML += feedbackHTMLBuilder(
         feedback,
         ARROW_IMG_PATH,
         COMMENTS_IMG_PATH,
         true
      )
   })

   liveFeedbacks.forEach((feedback) => {
      liveSection.innerHTML += feedbackHTMLBuilder(
         feedback,
         ARROW_IMG_PATH,
         COMMENTS_IMG_PATH,
         true
      )
   })

   $$('.status-section-filter > *').forEach((status) =>
      status.addEventListener('click', (e) => {
         $$('.status-section-filter > *').forEach((child) =>
            child.removeAttribute('id')
         )
         e.currentTarget.id = 'active-status'
         $$('.main > *').forEach((child) => child.classList.add('hide'))
         $(`[data-id=${e.currentTarget.classList[0]}]`).classList.remove('hide')
      })
   )

   if (window.innerWidth < 768) {
      $$('.main > *').forEach((child) => child.classList.add('hide'))
      const active = $('#active-status').classList[0]
      $(`[data-id=${active}]`).classList.remove('hide')
   }

   $$('.feedback').forEach((feedback) =>
      feedback.addEventListener('click', (e) => {
         window.location.href = `./feedback-detail.html?id=${e.currentTarget.dataset.id}`
      })
   )
})()

window.addEventListener('resize', () => {
   if (window.innerWidth >= 768) {
      $$('.main > *').forEach((child) => child.classList.remove('hide'))
   } else {
      $$('.main > *').forEach((child) => child.classList.add('hide'))
      const active = $('#active-status').classList[0]
      $(`[data-id=${active}]`).classList.remove('hide')
   }
})
