// let citySlect
// const token = 'aeba2b5b15cfe9e8706847e82e4a16a49f3af81d'


// function selecCityOptions() {
//   const selecCity = document.querySelector('#selecCity')
//   selecCity.querySelectorAll('[data-value]').forEach((city) => {
//     city.addEventListener('click', (e) => {
//       citySlect = e.target.dataset.value
//       airBring()
//     })
//   })
// }
// selecCityOptions()

// function airBring() {
//   fetch(`https://api.waqi.info/feed${citySlect}?token=${token}`)
//     .then(response => response.json())
//     .then((data) => {
//       const dataToUse = data.data
//       setData(dataToUse.aqi, dataToUse.city.name, dataToUse.time.s)
//       setAdvice(dataToUse.aqi)
//     })
// }

// function setData(a, b, c) {
//   const airQuality = document.querySelector('.airQuality')
//   airQuality.querySelector('p.aqi').textContent = a
//   airQuality.querySelector('p.city').textContent = b
//   airQuality.querySelector('p.time').textContent = c
// }
// function setAdvice(a) {
//   const airQuality = document.querySelector('.airQuality')
//   const aquiQuantity = airQuality.querySelector('p.aqi')
//   const aquiAdvice = airQuality.querySelector('p.advice')
//   const aquiDanger = airQuality.querySelector('p.danger')
//   const dataStored = dataStorage()

//   // ONE
//   if (a <= 50) {
//     aquiQuantity.style.color = dataStored.valueOne.color
//     aquiQuantity.style.backgroundColor = dataStored.valueOne.bgColor
//     aquiAdvice.textContent = dataStored.valueOne.advice
//     aquiDanger.textContent = dataStored.valueOne.danger
//     // TWO
//   } else if (a <= 100) {
//     aquiQuantity.style.color = dataStored.valueTwo.color
//     aquiQuantity.style.backgroundColor = dataStored.valueTwo.bgColor
//     aquiAdvice.textContent = dataStored.valueTwo.advice
//     aquiDanger.textContent = dataStored.valueTwo.danger
//     // THREE
//   } else if (a <= 150) {
//     aquiQuantity.style.color = dataStored.valueThree.color
//     aquiQuantity.style.backgroundColor = dataStored.valueThree.bgColor
//     aquiAdvice.textContent = dataStored.valueThree.advice
//     aquiDanger.textContent = dataStored.valueThree.danger
//     // FOUR
//   } else if (a <= 200) {
//     aquiQuantity.style.color = dataStored.valueFour.color
//     aquiQuantity.style.backgroundColor = dataStored.valueFour.bgColor
//     aquiAdvice.textContent = dataStored.valueFour.advice
//     aquiDanger.textContent = dataStored.valueFour.danger
//     // FIVE
//   } else if (a <= 300) {
//     aquiQuantity.style.color = dataStored.valueFive.color
//     aquiQuantity.style.backgroundColor = dataStored.valueFive.bgColor
//     aquiAdvice.textContent = dataStored.valueFive.advice
//     aquiDanger.textContent = dataStored.valueFive.danger
//     // SIX
//   } else {
//     aquiQuantity.style.color = dataStored.valueSix.color
//     aquiQuantity.style.backgroundColor = dataStored.valueSix.bgColor
//     aquiAdvice.textContent = dataStored.valueSix.advice
//     aquiDanger.textContent = dataStored.valueSix.danger
//   }
// }
// function dataStorage() {
//   const dataValues = {
//     valueOne: {
//       bgColor: '#009966',
//       advice: "Air quality is considered satisfactory, and air pollution poses little or no risk",
//       danger: "None"
//     },
//     valueTwo: {
//       color: '#000',
//       bgColor: '#ffde33',
//       advice: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
//       danger: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
//     },
//     valueThree: {
//       color: '#000',
//       bgColor: '#ff9933',
//       advice: "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
//       danger: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
//     },
//     valueFour: {
//       bgColor: '#ffde33',
//       advice: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
//       danger: "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion"
//     },
//     valueFive: {
//       bgColor: '#ffde33',
//       advice: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
//       danger: "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion."
//     },
//     valueSix: {
//       bgColor: '#ffde33',
//       advice: "Health alert: everyone may experience more serious health effects",
//       danger: "Everyone should avoid all outdoor exertion"
//     },
//   }
//   return dataValues
// }
// ---------------------------------
// REFACTOR

const qualityAirSearch = document.querySelector('.qualityAirSearch')
const form = document.querySelector('.form')
const results = document.querySelector('.results')
const deleteS = document.querySelector('.delete')
const token = 'aeba2b5b15cfe9e8706847e82e4a16a49f3af81d'
let keyword = ''
let dataToFetch
let stateCard = false

qualityAirSearch.addEventListener('keyup', () => {
  keyword = qualityAirSearch.value
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  fetch(`https://api.waqi.info/search/?token=${token}&keyword=${keyword}`)
    .then(response => response.json())
    .then(data => {
      dataToFetch = data.data
      stateCard = false
      createList(dataToFetch)
      setDataToCard()
      styleCard()
    })
})

function deleteList() {
  results.innerHTML = ''
}
function createList(dataToFetch) {
  if (results.children.length > 0) {
    deleteList()
  }
  for (let i = 0; i < dataToFetch.length; i++) {
    const li = document.createElement('li')
    results.appendChild(li)
    li.setAttribute('data-url', dataToFetch[i].station.url)
    li.textContent = dataToFetch[i].station.name
    aqiListShowAndHandle(i, li)
  }
}
function aqiListShowAndHandle(i, li) {
  const span = document.createElement('span')
  span.textContent = dataToFetch[i].aqi
  span.classList.add('aqi')
  let aqi = dataToFetch[i].aqi
  li.appendChild(span)
  // console.log(dataToFetch[i]);
  const aquiQuantity2 = document.querySelectorAll('.aqi')
  setAdvice(aqi, aquiQuantity2[i])
}

function setDataToCard() {
  const lis = results.querySelectorAll('li')
  lis.forEach(li => {
    li.addEventListener('click', (e) => {
      console.log(e);
      let dataToSearchOnClick = e.target.getAttribute("data-url")
      let dataFetch
      fetch(`https://api.waqi.info/feed/${dataToSearchOnClick}/?token=${token}`)
        .then(response => response.json())
        .then(data => dataFetch = data.data)
        .then(() => {
          deleteList()
          setParametersToCard(dataFetch)
          stateCard = true
          styleCard()
        })
    })
  });
}

function styleCard() {
  const card = document.querySelector('.card')
  if (!stateCard) {
    card.style.display = 'none'
    return
  }
  card.style.display = 'flex'
  return
}
styleCard()

function setParametersToCard(dataFetch) {
  const number = document.querySelector('.number')
  const city = document.querySelector('.city')
  city.textContent = dataFetch.city.name
  number.textContent = dataFetch.aqi
  let aqi = dataFetch.aqi
  setAdvice(aqi)
}

function setAdvice(a, b) {
  const aquiQuantity = document.querySelector('.number')
  const aquiAdvice = document.querySelector('.advice')
  const aquiDanger = document.querySelector('.danger')
  const dataStored = dataStorage()

  if (b == undefined) {
    if (a <= 50) {
      aquiQuantity.style.backgroundColor = dataStored.valueOne.bgColor
      aquiAdvice.textContent = dataStored.valueOne.advice
      aquiDanger.textContent = dataStored.valueOne.danger
      // TWO
    } else if (a <= 100) {
      aquiQuantity.style.color = dataStored.valueTwo.color
      aquiQuantity.style.backgroundColor = dataStored.valueTwo.bgColor
      aquiAdvice.textContent = dataStored.valueTwo.advice
      aquiDanger.textContent = dataStored.valueTwo.danger
      // THREE
    } else if (a <= 150) {
      aquiQuantity.style.color = dataStored.valueThree.color
      aquiQuantity.style.backgroundColor = dataStored.valueThree.bgColor
      aquiAdvice.textContent = dataStored.valueThree.advice
      aquiDanger.textContent = dataStored.valueThree.danger
      // FOUR
    } else if (a <= 200) {
      aquiQuantity.style.backgroundColor = dataStored.valueFour.bgColor
      aquiAdvice.textContent = dataStored.valueFour.advice
      aquiDanger.textContent = dataStored.valueFour.danger
      // FIVE
    } else if (a <= 300) {
      aquiQuantity.style.backgroundColor = dataStored.valueFive.bgColor
      aquiAdvice.textContent = dataStored.valueFive.advice
      aquiDanger.textContent = dataStored.valueFive.danger
      // SIX
    } else {
      aquiQuantity.style.color = '#fff'
      aquiQuantity.style.backgroundColor = dataStored.valueSix.bgColor
      aquiAdvice.textContent = dataStored.valueSix.advice
      aquiDanger.textContent = dataStored.valueSix.danger
    }

  } else {
    if (a <= 50) {
      b.style.backgroundColor = dataStored.valueOne.bgColor
      aquiQuantity.style.backgroundColor = dataStored.valueOne.bgColor
      aquiAdvice.textContent = dataStored.valueOne.advice
      aquiDanger.textContent = dataStored.valueOne.danger
      // TWO
    } else if (a <= 100) {
      b.style.color = dataStored.valueTwo.color
      b.style.backgroundColor = dataStored.valueTwo.bgColor
      aquiQuantity.style.color = dataStored.valueTwo.color
      aquiQuantity.style.backgroundColor = dataStored.valueTwo.bgColor
      aquiAdvice.textContent = dataStored.valueTwo.advice
      aquiDanger.textContent = dataStored.valueTwo.danger
      // THREE
    } else if (a <= 150) {
      b.style.color = dataStored.valueThree.color
      b.style.backgroundColor = dataStored.valueThree.bgColor
      aquiQuantity.style.color = dataStored.valueThree.color
      aquiQuantity.style.backgroundColor = dataStored.valueThree.bgColor
      aquiAdvice.textContent = dataStored.valueThree.advice
      aquiDanger.textContent = dataStored.valueThree.danger
      // FOUR
    } else if (a <= 200) {
      b.style.backgroundColor = dataStored.valueFour.bgColor
      aquiQuantity.style.backgroundColor = dataStored.valueFour.bgColor
      aquiAdvice.textContent = dataStored.valueFour.advice
      aquiDanger.textContent = dataStored.valueFour.danger
      // FIVE
    } else if (a <= 300) {
      b.style.backgroundColor = dataStored.valueFive.bgColor
      aquiQuantity.style.backgroundColor = dataStored.valueFive.bgColor
      aquiAdvice.textContent = dataStored.valueFive.advice
      aquiDanger.textContent = dataStored.valueFive.danger
      // SIX
    } else {
      b.style.color = '#fff'
      b.style.backgroundColor = dataStored.valueSix.bgColor
      aquiQuantity.style.color = '#fff'
      aquiQuantity.style.backgroundColor = dataStored.valueSix.bgColor
      aquiAdvice.textContent = dataStored.valueSix.advice
      aquiDanger.textContent = dataStored.valueSix.danger
    }
  }
  // ONE

}

function dataStorage() {
  const dataValues = {
    valueOne: {
      bgColor: '#009966',
      advice: "Air quality is considered satisfactory, and air pollution poses little or no risk",
      danger: "None"
    },
    valueTwo: {
      color: '#000',
      bgColor: '#ffde33',
      advice: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
      danger: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
    },
    valueThree: {
      color: '#000',
      bgColor: '#ff9933',
      advice: "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
      danger: "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
    },
    valueFour: {
      bgColor: '#cc0033',
      advice: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects",
      danger: "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion"
    },
    valueFive: {
      bgColor: '#660099',
      advice: "Health warnings of emergency conditions. The entire population is more likely to be affected.",
      danger: "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion."
    },
    valueSix: {
      bgColor: '#7e0023',
      advice: "Health alert: everyone may experience more serious health effects",
      danger: "Everyone should avoid all outdoor exertion"
    },
  }
  return dataValues
}