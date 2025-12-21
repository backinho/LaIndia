function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification')
  notification.textContent = message
  notification.className = `notification show ${type}`

  setTimeout(() => {
    notification.classList.remove('show')
  }, 3000)
}

function showForm(formId) {
  document.querySelectorAll('.form-container').forEach(form => {
    form.classList.remove('active')
  })
  document.getElementById(formId).classList.add('active')
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light'
  document.documentElement.setAttribute('data-theme', savedTheme)

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  })
}

function initNavigation() {
  document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault()
    showForm('register-form')
  })

  document.getElementById('show-recovery').addEventListener('click', (e) => {
    e.preventDefault()
    showForm('recovery-form')
    showRecoveryStep(1)
  })

  document.getElementById('back-to-login').addEventListener('click', (e) => {
    e.preventDefault()
    showForm('login-form')
  })

  document.getElementById('back-to-login-2').addEventListener('click', (e) => {
    e.preventDefault()
    showForm('login-form')
  })

  document.getElementById('back-to-recovery-1').addEventListener('click', (e) => {
    e.preventDefault()
    showRecoveryStep(1)
  })

  document.getElementById('logout-btn').addEventListener('click', () => {
    currentUser = null
    showForm('login-form')
    showNotification('Sesión cerrada exitosamente', 'success')
  })
}

function showRecoveryStep(step) {
  document.querySelectorAll('.recovery-step').forEach(s => {
    s.classList.remove('active')
  })
  document.getElementById(`recovery-step${step}`).classList.add('active')
}

async function init() {

  initTheme()
  initNavigation()

  document.getElementById('register').addEventListener('submit', handleRegister)
  document.getElementById('login').addEventListener('submit', handleLogin)
  document.getElementById('recovery-step1').addEventListener('submit', handleRecoveryStep1)
  document.getElementById('recovery-step2').addEventListener('submit', handleRecoveryStep2)
  document.getElementById('recovery-step3').addEventListener('submit', handleRecoveryStep3)

  showForm('login-form')
}

init()
