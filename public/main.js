let players = [
  { id: 1, name: 'Player 1', wins: 0, choice: '', isComputer: false },
  { id: 2, name: 'Player 2', wins: 0, choice: '', isComputer: false },
  { id: 3, name: 'Player 3', wins: 0, choice: '', isComputer: false },
]

let roundCounter = 0

const headerBanner = document.querySelector('header h1')
const footerBanner = document.querySelector('footer h2')

//${playerToRender.id === 1 ? '' : '<button>Computer</button>'}

function renderPlayer(playerToRender) {
  const playerHtml = `<section class="player${playerToRender.id}">
  <div>
    <h2>${playerToRender.name}</h2>
    <button>Computer</button>
    <h3>Wins: ${playerToRender.wins}</h3>
    <input
      type="text"
      placeholder="Name"
      value="${playerToRender.name}"
    />
  </div>
  <i class="fas fa-hand-rock rock ${playerToRender.id}"></i>
  <i class="fas fa-hand-paper paper ${playerToRender.id}"></i>
  <i class="fas fa-hand-scissors scissors ${playerToRender.id}"></i>
  <i class="fas fa-hand-lizard lizard ${playerToRender.id}"></i>
  <i class="fas fa-hand-spock spock ${playerToRender.id}"></i>
</section>`

  return playerHtml
}

function setUpListeners(playerToListenTo) {
  document
    .querySelector(`.player${playerToListenTo.id} input`)
    .addEventListener('input', event => {
      playerToListenTo.name = event.target.value
      render()
    })
  document
    .querySelector(`.player${playerToListenTo.id} button`)
    .addEventListener('click', function (event) {
      if (playerToListenTo.isComputer) {
        playerToListenTo.isComputer = false
        playerToListenTo.name = document.querySelector(
          `.player${playerToListenTo.id} h2`
        ).textContent = `Player ${playerToListenTo.id}`
      } else {
        playerToListenTo.isComputer = true
        playerToListenTo.name = document.querySelector(
          `.player${playerToListenTo.id} h2`
        ).textContent = 'The Computer'
      }
      render()
    })
}

function handleClick(event) {
  if (event.target.nodeName !== 'I') return

  const playerClick = event.target.className.split(' ')
  const playerIdentifier = playerClick[3]
  const playerMove = playerClick[2]

  console.log(playerClick)
  console.log(playerIdentifier)
}

function render() {
  const html = `<header>
<h1>Roshambo! Round ${roundCounter}!</h1>
</header>
<main>
${players.map(player => renderPlayer(player)).join('')}
</main>
<footer>
<h2>Waiting for moves to be made...</h2>
<section>
  <button id="add">Add Player</button>
  <button id="remove">Remove Player</button>
  <button id="clear">Clear Hands</button>
  <button id="reset">Reset Game</button>
</section>
</footer>
<script src="/main.js" charset="utf-8"></script>`

  document.body.innerHTML = html

  players.forEach(player => setUpListeners(player))
}

function clearHand() {
  players.map(hand => (hand.choice = ''))
}

function main() {
  render()
  document.querySelector('main').addEventListener('click', handleClick)

  document.querySelector('#add').addEventListener('click', function (event) {
    const newPlayer = {
      id: players.length + 1,
      name: `Player ${players.length + 1}`,
      wins: 0,
      choice: '',
      isComputer: false,
    }

    players.push(newPlayer)

    render()
  })

  document.querySelector('#remove').addEventListener('click', function (event) {
    players.pop()
    render()
  })

  document.querySelector('#clear').addEventListener('click', clearHand)

  document
    .querySelector('#reset')
    .addEventListener('click', () => location.reload())
}

document.addEventListener('DOMContentLoaded', main)
