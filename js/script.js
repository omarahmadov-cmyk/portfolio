document.addEventListener('DOMContentLoaded',function(){
  const toggles = document.querySelectorAll('.nav-toggle')
  toggles.forEach(btn=>{
    const nav = btn.nextElementSibling || document.getElementById('siteNav') || document.querySelector('.site-nav')
    btn.addEventListener('click',()=>{
      nav.classList.toggle('open')
    })
  })

  // set year(s)
  const year = new Date().getFullYear()
  document.querySelectorAll('[id^="year"]').forEach(el=>el.textContent=year)

  // Page enter animation: mark page as ready to transition in
  requestAnimationFrame(()=>{
    // small timeout to allow initial styles to apply
    setTimeout(()=>document.body.classList.add('page-ready'),20)
  })

  // Page exit animation when clicking internal links
  const ANIM_DUR = 450 // ms; keep in sync with CSS
  document.addEventListener('click', function(e){
    const a = e.target.closest('a')
    if(!a) return
    // ignore external / new-tab links and anchors with hashes only
    const href = a.getAttribute('href')
    if(!href || href.startsWith('mailto:') || a.target === '_blank' || href.startsWith('#')) return
    // Only intercept same-origin navigations to html pages
    try{
      const url = new URL(href, location.href)
      if(url.origin !== location.origin) return
    }catch(err){ return }

    // Allow same-page anchor navigation (different pathname but hash) to proceed
    e.preventDefault()
    document.body.classList.add('page-exiting')
    setTimeout(()=>{ location.href = href }, ANIM_DUR)
  }, true)

  // Cursor-follow underline for nav links and better hover for buttons
  function attachCursorFollow(sel){
    document.querySelectorAll(sel).forEach(el=>{
      el.addEventListener('mousemove', function(ev){
        const r = el.getBoundingClientRect()
        const x = ev.clientX - r.left
        const pct = Math.round((x / r.width) * 100)
        el.style.setProperty('--x', pct + '%')
      })
      // clean up on leave
      el.addEventListener('mouseleave', function(){ el.style.removeProperty('--x') })
    })
  }
  attachCursorFollow('.site-nav a')
  attachCursorFollow('.btn')
})
