const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)
const ARROW_IMG_PATH = 'assets/shared/icon-arrow-up.svg'
const COMMENTS_IMG_PATH = 'assets/shared/icon-comments.svg'

export const fetchData = async () => {
   const feedback = await fetch('../api/data.json')
   const data = await feedback.json()
   return data
}

export const fillFeedbacks = async () => {
   const feedbacksSection = $('.feedbacks')
   const { productRequests } = await fetchData()
   productRequests.forEach((feedback) => {
      feedbacksSection.innerHTML += feedbackHTMLBuilder(
         feedback,
         ARROW_IMG_PATH,
         COMMENTS_IMG_PATH
      )
   })
   $$('.feedback').forEach((feedback) => {
      feedback.addEventListener('click', (e) => {
         openFeedbackDetailPage(e.currentTarget.dataset.id)
      })
   })
}

export function feedbackHTMLBuilder(feedback, arrowImg, commentsImg) {
   return `<div class="card feedback" data-id="${feedback.id}">
               <h3 class="title feedback-title">${feedback.title}</h3>
               <p class="feedback-text secondary-text">
                  ${feedback.description}
               </p>
               <button class="btn category-btn">${
                  feedback.category.charAt(0).toUpperCase() +
                  feedback.category.slice(1)
               }</button>
               <div class="feedback-footer">
                  <div class="upvotes-wrapper">
                     <img src="${arrowImg}" alt="" />
                     <span class="votes">${feedback.upvotes}</span>
                  </div>
                  <div class="comments-wrapper">
                     <img src="${commentsImg}" alt="" />
                     <span class="comments-no">${
                        feedback.comments ? feedback.comments.length : 0
                     }</span>
                  </div>
               </div>
            </div>`
}

function openFeedbackDetailPage(id) {
   window.location.href = `./pages/feedback-detail.html?id=${id}`
}
