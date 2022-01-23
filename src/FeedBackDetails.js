import { fetchData, feedbackHTMLBuilder } from './Data.js'
import { animateCSS } from './Animate.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)
const ARROW_IMG_PATH = '../assets/shared/icon-arrow-up.svg'
const COMMENTS_IMG_PATH = '../assets/shared/icon-comments.svg'

$('.header-back').addEventListener('click', () => {
   window.location.href = `../index.html`
})

const loadFeedbackDetails = async () => {
   const url = new URL(window.location)
   const id = url.searchParams.get('id')
   const { productRequests } = await fetchData()
   const feedback = productRequests.filter((feedback) => feedback.id === +id)[0]
   const feedbackCard = feedbackHTMLBuilder(
      feedback,
      ARROW_IMG_PATH,
      COMMENTS_IMG_PATH
   )
   $('.main-feedback').innerHTML += feedbackCard
   commentsHTMLBuilder(feedback)
}

function commentsHTMLBuilder({ comments }) {
   const commentsSection = $('.comments')
   if (comments) {
      commentsSection.innerHTML += `<h2 class="title">${comments.length} ${
         comments.length > 1 ? 'Comments' : 'Comment'
      }</h2>`
      comments.forEach((comment, index) => {
         commentsSection.innerHTML += `<div class="comment ${
            index === comments.length - 1 ? '' : 'comment-line'
         }" data-id=comment-${comment.id}>
               <div class="user">
                  <div class="user-info-wrapper">
                     <img src=".${comment.user.image}" alt="" />
                     <div class="user-info">
                        <h3 class="title">${comment.user.name}</h3>
                        <span class="secondary-text">@${
                           comment.user.username
                        }</span>
                     </div>
                  </div>
                  <h4 class="comment-reply" data-id='reply-to-${
                     comment.id
                  }'>Reply</h4>
               </div>
               <div class="secondary-text">
                  <p>
                     ${comment.content}
                  </p>
                  <div class="replies"> 
                     ${comment.replies ? replies(comment.replies) : ''}
                  </div>
                 
                  ${replyForm()}
               </div>
            </div>`
      })
      $$('[data-id^=reply-to]').forEach((replay) => {
         replay.addEventListener('click', (e) => {
            const splitDataset = e.currentTarget.dataset.id.split('-')
            e.currentTarget.classList.toggle('clicked-reply')
            const id = splitDataset[splitDataset.length - 1]
            const reply = $(`[data-id='comment-${id}'] .form-wrapper`)
            if (e.currentTarget.classList.contains('clicked-reply')) {
               reply.classList.remove('hide')
               e.currentTarget.innerHTML = 'Cancel'
               animateCSS(reply, 'zoomIn', '0.5s')
            } else {
               e.currentTarget.innerHTML = 'Reply'
               animateCSS(reply, 'zoomOut', '0.5s').then(() => {
                  reply.classList.add('hide')
               })
            }
         })
      })

      $$('.comment-reply-form').forEach((form) => {
         form.addEventListener('submit', (e) => {
            e.preventDefault()
         })
      })
   } else {
      commentsSection.innerHTML = 'Be first to post a comment!'
   }
}

function replies(replies) {
   let repliesHTML = ``
   replies.forEach((comment) => {
      repliesHTML += `<div class="comment" data-id=comment-${comment.id}>
               <div class="user">
                  <div class="user-info-wrapper">
                     <img src=".${comment.user.image}" alt="" />
                     <div class="user-info">
                        <h3 class="title">${comment.user.name}</h3>
                        <span class="secondary-text">@${
                           comment.user.username
                        }</span>
                     </div>
                  </div>
                  <h4 class="comment-reply" data-id='reply-to-${
                     comment.id
                  }'>Reply</h4>
               </div>
               <div class="secondary-text">
                  <p>
                     ${comment.content}
                  </p>
                  ${replyForm()}
               </div>
            </div>`
   })

   return repliesHTML
}

function replyForm() {
   return `
      <div class="form-wrapper hide">
            <form action="" class="comment-reply-form">
               <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  maxlength="250"
                  class="secondary-text"
                  required
               ></textarea>
               <button type="submit" class="btn btn-purple">
                  Post Reply
               </button>
            </form>
         </div>`
}

loadFeedbackDetails()
