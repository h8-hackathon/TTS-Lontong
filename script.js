let score = 0
let nyawa = 15
let bantuan = 15

let nomorSoal = 0

let clues = []
let jawabanUser = []

let nama = ''

function getRandomClue(jawaban, arr) {
  if (arr) {
    let result = arr
    let emptyBox = []
    arr.forEach((value, index) => {
      if (!value) emptyBox.push(index)
    })

    if (emptyBox.length === 0) return false

    const indexClueBaru = emptyBox[Math.floor(Math.random() * emptyBox.length)]
    result[indexClueBaru] = jawaban[indexClueBaru]
    return result
  }
  const index = Math.floor(Math.random() * jawaban.length)
  return jawaban
    .split('')
    .map((value, i) => (i === index ? value.toUpperCase() : ''))
}

function setNama(userInput) {
  nama = userInput
}

function set(id, value) {
  document.getElementById(id).innerHTML = value
}

function render() {
  if (!nama) {
    showLogin()
    return
  }

  set('nama-user', nama)
  set('score-user', score)

  set('nomor-soal', `${nomorSoal + 1}/${tts.length}`)

  set('nyawa', nyawa)
  set('bantuan', bantuan)

  set('soal', tts[nomorSoal].pertanyaan)
  // set('komen', tts[nomorSoal].komentar)
  if (!clues.length) {
    clues = getRandomClue(tts[nomorSoal].jawaban)
  }
  jawabanUser = [...clues]
  document.getElementById('jawaban').innerHTML = ''
  clues.forEach((clue, i) => {
    const newBox = document.createElement('div')
    newBox.innerHTML = clue.toUpperCase()
    newBox.id = `box-jawaban-${i}`
    newBox.classList.add('text')
    if (clue) newBox.classList.add('text-clue')
    document.getElementById('jawaban').appendChild(newBox)
  })
}

function cekJawaban() {
  if (
    tts[nomorSoal].jawaban
      .split('')
      .map((value) => value.toUpperCase())
      .every((value, i) => value === jawabanUser[i].toUpperCase())
  ) {
    if (nomorSoal === tts.length - 1) {
      document
        .getElementById('modal-menang')
        .classList.replace('hide', 'modal-menang')

      return
    }

    document
      .getElementById('modal-pass-level')
      .classList.replace('hide', 'modal-pass-level')
    document.getElementById('modal-komen').innerHTML = tts[nomorSoal].komentar
  } else {
    nyawa--
    render()
  }
}

function remove() {
  console.log(clues, jawabanUser)
  for (let i = jawabanUser.length - 1; i >= 0; i--) {
    console.log(i, !clues[i], !!jawabanUser[i])
    if (!clues[i] && jawabanUser[i]) {
      console.log(!jawabanUser[i], '<<<')
      jawabanUser[i] = ''
      set(`box-jawaban-${i}`, '')
      break
    }
  }
  console.log(jawabanUser)
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    remove()
    return
  }
})

const kamus = 'abcdefghijklmnopqrstuvwxyz'
  .split('')
  .map((value) => value.toUpperCase())

document.addEventListener('keypress', (event) => {
  const key = event.key.toUpperCase()
  if (!nama) return
  if (key === 'ENTER') {
    cekJawaban()
    return
  }
  if (!kamus.find((v) => key === v)) return
  for (let i = 0; i < jawabanUser.length; i++) {
    if (!jawabanUser[i]) {
      jawabanUser[i] = key
      set(`box-jawaban-${i}`, key)
      break
    }
  }
})

function tambahClue() {
  if (jawabanUser.every((value) => value) || bantuan < 1) return
  bantuan--
  clues = getRandomClue(tts[nomorSoal].jawaban, clues)
  jawabanUser = [...clues]
  render()
  // set('bantuan', bantuan)
  // document.getElementById('jawaban').innerHTML = ''
  // clues.forEach((clue, i) => {
  //   const newBox = document.createElement('div')
  //   newBox.innerHTML = clue.toUpperCase()
  //   newBox.id = `box-jawaban-${i}`
  //   newBox.classList.add('text')
  //   if (clue) newBox.classList.add('text-clue')
  //   document.getElementById('jawaban').appendChild(newBox)
  // })
}
function lanjut() {
  document
    .getElementById('modal-pass-level')
    .classList.replace('modal-pass-level', 'hide')
  if (tts[nomorSoal + 1]) {
    clues = []
    nomorSoal++
    render()
    return
  }
}

function hideLogin() {
  document.getElementById('login-page').classList.replace('modal-login', 'hide')
}

function login() {
  const name = document.getElementById('username')
  if (!name.value) return
  nama = name.value

  hideLogin()
  render()
}

function keluar() {
  score = 0
  nyawa = 15
  bantuan = 15

  nomorSoal = 0

  clues = []
  jawabanUser = []

  nama = ''
  document.getElementById('login-page').classList.replace('hide', 'modal-login')
  document.getElementById('username').value = ''
}
function ulangi() {
  score = 0
  nyawa = 15
  bantuan = 15

  nomorSoal = 0

  clues = []
  jawabanUser = []
  document
    .getElementById('modal-menang')
    .classList.replace('modal-menang', 'hide')
  render()
}

render()
