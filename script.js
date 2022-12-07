let score = 0
let nyawa = 15
let bantuan = 15

let nomorSoal = 0

let clues = []

let nama = 'Jhon Doe'

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
  return jawaban.split('').map((value, i) => (i === index ? value : ''))
}

function setNama(userInput) {
  nama = userInput
}

function set(id, value) {
  document.getElementById(id).innerHTML = value
}

function showLogin() {}

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

  // set('soal', tts[nomorSoal].pertanyaan)
}

function next() {
  if (tts[nomorSoal + 1]) {
    nomorSoal++
    render()
    return
  }
}


render()