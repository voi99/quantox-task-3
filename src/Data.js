const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)
const ARROW_IMG_PATH = 'assets/shared/icon-arrow-up.svg'
const COMMENTS_IMG_PATH = 'assets/shared/icon-comments.svg'

export const fetchData = async () => {
   if (localStorage.getItem('data')) {
      const data = JSON.parse(localStorage.getItem('data'))
      return data
   } else {
      const feedback = await fetch('../api/data.json')
      const data = await feedback.json()
      localStorage.setItem('data', JSON.stringify(data))
      return data
   }
}

export const getSingleFeedback = async (id) => {
   const { productRequests } = await fetchData()
   const singleFeedback = productRequests.filter(
      (feedback) => feedback.id === +id
   )[0]
   return singleFeedback
}

export const addNewFeedback = async (feedback) => {
   const previousData = await fetchData()
   previousData.productRequests.push(feedback)
   localStorage.setItem('data', JSON.stringify(previousData))
}

export const fillFeedbacks = async (category, sortBy = 'mostUpvotes') => {
   const feedbacksSection = $('.feedbacks')
   const noFeedbacks = $('.no-feedback')
   feedbacksSection.innerHTML = ''
   const { productRequests } = await fetchData()
   let filteredData
   if (category) {
      filteredData = productRequests.filter(
         (request) => request.category === category
      )
   } else {
      filteredData = productRequests
   }
   if (filteredData.length === 0) {
      noFeedbacks.classList.remove('hide')
      $('.no-of-suggetions').innerHTML = 0
      return
   } else if (!noFeedbacks.classList.contains('hide')) {
      noFeedbacks.classList.add('hide')
   }

   filteredData = sortData(filteredData, sortBy)

   filteredData.forEach((feedback) => {
      feedbacksSection.innerHTML += feedbackHTMLBuilder(
         feedback,
         ARROW_IMG_PATH,
         COMMENTS_IMG_PATH
      )
   })

   $('.no-of-suggetions').innerHTML = filteredData.length
   $$('.feedback').forEach((feedback) => {
      feedback.addEventListener('click', (e) => {
         openFeedbackDetailPage(e.currentTarget.dataset.id)
      })
   })

   $$('.upvotes-wrapper').forEach((upvote) => {
      upvote.addEventListener('click', (e) => {
         e.stopPropagation()
         console.log(e)
      })
   })
}

export function feedbackHTMLBuilder(feedback, arrowImg, commentsImg, border) {
   return `<div class="card feedback" data-id="${feedback.id}">
               ${border ? "<div class='top-border'></div>" : ''}
               ${border ? `${statusInfo(feedback)}` : ''}
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

function statusInfo({ status }) {
   let text
   let bulletColor
   if (status === 'planned') {
      text = 'Planned'
      bulletColor = 'orange'
   } else if (status === 'in-progress') {
      text = 'In Progress'
      bulletColor = 'purple'
   } else if (status === 'live') {
      text = 'Live'
      bulletColor = 'blue'
   }
   return `<div class='status-info'><div class='bullet bullet-${bulletColor}'></div><span>${text}</span></div>`
}

function openFeedbackDetailPage(id) {
   window.location.href = `./pages/feedback-detail.html?id=${id}`
}

function sortData(data, sortBy) {
   let sortedData = data
   if (sortBy === 'mostUpvotes') {
      sortedData.sort((a, b) => {
         return b.upvotes - a.upvotes
      })
   } else if (sortBy === 'leastUpvotes') {
      sortedData.sort((a, b) => {
         return a.upvotes - b.upvotes
      })
   } else if (sortBy === 'mostComments') {
      sortedData.sort((a, b) => {
         return (
            (b.comments ? b.comments.length : 0) -
            (a.comments ? a.comments.length : 0)
         )
      })
   } else if (sortBy === 'leastComments') {
      sortedData.sort((a, b) => {
         return (
            (a.comments ? a.comments.length : 0) -
            (b.comments ? b.comments.length : 0)
         )
      })
   }
   return sortedData
}
