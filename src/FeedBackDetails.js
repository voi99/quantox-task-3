import { fetchData, feedbackHTMLBuilder } from './Data.js'
import { animateCSS } from './Animate.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)
const ARROW_IMG_PATH = '../assets/shared/icon-arrow-up.svg'
const COMMENTS_IMG_PATH = '../assets/shared/icon-comments.svg'

$('.header-back').addEventListener('click', () => {
   window.history.back()
})

const getId = () => {
   const url = new URL(window.location)
   return url.searchParams.get('id')
}

const loadFeedbackDetails = async (load) => {
   const id = getId()
   const { productRequests } = await fetchData()
   const feedback = productRequests.filter((feedback) => feedback.id === +id)[0]
   if (load) {
      const feedbackCard = feedbackHTMLBuilder(
         feedback,
         ARROW_IMG_PATH,
         COMMENTS_IMG_PATH
      )
      $('.main-feedback').innerHTML = feedbackCard
      commentsHTMLBuilder(feedback)
   } else {
      commentsHTMLBuilder(feedback)
   }
}

function commentsHTMLBuilder({ comments }) {
   const commentsSection = $('.comments')
   commentsSection.innerHTML = ''
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
                  <h4 class="comment-reply" data-id='reply-to-${comment.id}-${
            comment.user.username
         }'>Reply</h4>
               </div>
               <div class="secondary-text">
                  <p>
                     ${comment.content}
                  </p>
                   
                     ${
                        comment.replies
                           ? `<div class='replies'>${replies(
                                comment.id,
                                comment.replies
                             )}</div>`
                           : `${replyForm(comment.id)}`
                     }
               </div>
            </div>`
      })
      $$('[data-id^=reply-to]').forEach((replay) => {
         replay.addEventListener('click', (e) => {
            const splitDataset = e.currentTarget.dataset.id.split('-')
            e.currentTarget.classList.toggle('clicked-reply')
            const id = splitDataset[splitDataset.length - 2]
            const username = splitDataset[splitDataset.length - 1]
            const reply = $(`.form-wrapper[data-set='comment-${id}']`)
            $(
               `.form-wrapper[data-set='comment-${id}'] form`
            ).dataset.id = `${id}-${username}`
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
         addNewReplyFormHandler(form)
      })
   } else {
      commentsSection.innerHTML = 'Be first to post a comment!'
   }
}

function replies(commentId, replies) {
   let repliesHTML = ``
   replies.forEach((comment) => {
      repliesHTML += `<div class="comment" data-set='comment-${commentId}'>
               <div class="user">
                  <div class="user-info-wrapper">
                     <img src=".${comment.user.image}" alt="" />
                     <div class="user-info">
                        <h3 class="title">${comment.user.name}</h3>
                        <span class="secondary-text">@${comment.user.username}</span>
                     </div>
                  </div>
                  <h4 class="comment-reply" data-id='reply-to-${commentId}-${comment.user.username}'>Reply</h4>
               </div>
               <div class="secondary-text">
                  <p>
                     <span class='replying-to-username'>@${comment.replyingTo}</span> ${comment.content}
                  </p>
               </div>
            </div>`
   })

   repliesHTML += `${replyForm(commentId)}`

   return repliesHTML
}

function replyForm(commentId) {
   return `
      <div class="form-wrapper hide" data-set='comment-${commentId}'>
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

function addNewReplyFormHandler(form) {
   form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const data = await fetchData()
      const user = data.currentUser
      const id = getId()
      const commentId = e.target.dataset.id.split('-')[0]
      const replyingTo = e.target.dataset.id.split('-')[1]
      const replyText = e.target.children[0].value
      const selectedComment = data.productRequests
         .filter((r) => r.id === +id)[0]
         .comments.filter((c) => c.id === +commentId)[0]

      selectedComment.replies
         ? selectedComment.replies.push({
              content: replyText,
              replyingTo,
              user,
           })
         : (selectedComment['replies'] = [
              { content: replyText, replyingTo, user },
           ])

      data.productRequests
         .filter((r) => r.id === +id)[0]
         .comments.filter((c) => c.id === +commentId)[0]['replies'] =
         selectedComment.replies

      localStorage.setItem('data', JSON.stringify(data))
      loadFeedbackDetails(false)
   })
}

$('.add-comment-text').addEventListener('input', (e) => {
   const leftElement = $('.left-characters')
   const currentLength = e.currentTarget.value.length
   const leftNo = 250 - currentLength
   if (leftNo >= 0) {
      leftElement.innerHTML = `${leftNo} Characters left`
   } else {
      leftElement.innerHTML = `Out of characters!`
      e.currentTarget.value = e.currentTarget.value.substring(0, 250)
   }
})

$('.add-comment-form').addEventListener('submit', async (e) => {
   e.preventDefault()
   const text = $('.add-comment-text').value.substring(0, 250)
   const id = getId()

   const data = await fetchData()
   data.productRequests.filter((req) => req.id === +id)[0].comments
      ? data.productRequests
           .filter((req) => req.id === +id)[0]
           .comments.push({
              id:
                 data.productRequests.filter((req) => req.id === +id)[0]
                    .comments.length + 1,
              content: text,
              user: data.currentUser,
           })
      : (data.productRequests.filter((req) => req.id === +id)[0]['comments'] = [
           {
              id: 1,
              content: text,
              user: data.currentUser,
           },
        ])
   localStorage.setItem('data', JSON.stringify(data))
   loadFeedbackDetails(false)
   $('.add-comment-text').value = ''
   $('.left-characters').innerHTML = '250 Characters left'
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

$('.edit-btn').addEventListener('click', () => {
   const id = getId()
   window.location.href = `./feedback-edit.html?id=${id}`
})

loadFeedbackDetails(true)
