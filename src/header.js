import { animateCSS } from './Animate.js'
import { fetchData } from './Data.js'

const $ = (e) => document.querySelector(e)

const menu = $('.header-menu img')
const sidebar = $('.sidebar')
const body = $('body')
let flag = true

menu.addEventListener('click', (e) => {
   toogleIcon(e.currentTarget)
})

async function toogleIcon(target) {
   body.classList.toggle('disable-scroll')
   if (flag) {
      animateCSS(target, 'zoomOut', '0.2s').then(() => {
         target.src = '/assets/shared/mobile/icon-close.svg'
         animateCSS(target, 'zoomIn', '0.2s')
      })

      sidebar.classList.add('slide')
      animateCSS(sidebar, 'slideInRight', '0.25s')
   } else {
      animateCSS(target, 'zoomOut', '0.2s').then(() => {
         target.src = '/assets/shared/mobile/icon-hamburger.svg'
         animateCSS(target, 'zoomIn', '0.2s')
      })
      await animateCSS(sidebar, 'slideOutRight', '0.25s')
      sidebar.classList.remove('slide')
   }
   flag = !flag
}

;(async () => {
   const { productRequests } = await fetchData()
   const plannedFeedbacks = productRequests.filter(
      (req) => req.status === 'planned'
   )
   $('.no-planned-status').innerHTML = plannedFeedbacks.length
   const inProgressFeedbacks = productRequests.filter(
      (req) => req.status === 'in-progress'
   )
   $('.no-in-progress-status').innerHTML = inProgressFeedbacks.length
   const liveFeedbacks = productRequests.filter((req) => req.status === 'live')
   $('.no-live-status').innerHTML = liveFeedbacks.length
})()
