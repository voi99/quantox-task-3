import { animateCSS } from './Animate.js'

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
      await animateCSS(target, 'zoomOut', '0.1s')
      target.src = '/assets/shared/mobile/icon-close.svg'
      await animateCSS(target, 'zoomIn', '0.1s')
      sidebar.classList.add('slide')
      await animateCSS(sidebar, 'slideInRight', '0.25s')
   } else {
      await animateCSS(target, 'zoomOut', '0.1s')
      target.src = '/assets/shared/mobile/icon-hamburger.svg'
      await animateCSS(target, 'zoomIn', '0.1s')
      await animateCSS(sidebar, 'slideOutRight', '0.25s')
      sidebar.classList.remove('slide')
   }
   flag = !flag
}
