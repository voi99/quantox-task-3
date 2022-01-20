export const animateCSS = (node, animation, duration) =>
   new Promise((resolve, reject) => {
      let prefix = 'animate__'
      const animationName = `${prefix}${animation}`

      node.classList.add(`${prefix}animated`, animationName)
      node.style.setProperty('--animate-duration', duration)

      function handleAnimationEnd(event) {
         event.stopPropagation()
         node.classList.remove(`${prefix}animated`, animationName)
         resolve('Animation ended')
      }

      node.addEventListener('animationend', handleAnimationEnd, { once: true })
      node.addEventListener('animationiteration', handleAnimationEnd, {
         once: true,
      })
   })
