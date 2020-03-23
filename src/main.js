const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  { logo: 'A', url: 'https://www.github.com'},
  { logo: 'B', url: 'https://www.leetcode.com'},
  { logo: 'C', url: 'https://www.reactjs.org'},
  { logo: 'D', url: 'https://www.facebook.com'},
  { logo: 'E', url: 'https://www.apple.com'},
  { logo: 'F', url: 'https://www.amazon.com'},
  { logo: 'G', url: 'https://www.linkedin.com'},
  { logo: 'H', url: 'https://www.google.com'},
]
const colors = [
  'rgb(61, 192, 176)',
  'rgb(175, 61, 78)',
  'rgb(162, 104, 54)',
  'rgb(91, 161, 80)',
  'rgb(230, 79, 82)',
  'rgb(0, 188, 212)',
  'rgb(96, 125, 139)',
  'rgb(132, 92, 78)',
  'rgb(225, 116, 33)',
  /*------------------*/
  'rgb(72, 85, 100)',
  'rgb(78, 169, 219)',
  'rgb(137, 48, 61)',
  'rgb(48, 63, 159)',
  'rgb(69, 90, 100)'
]

const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // remove everything after '/'
}

const logoList = (e) => {
  return('https://www.' + e + '/favicon.ico')
}


const magicColor = () => {
  let color = colors[Math.floor(Math.random() * colors.length)]
  if(color === 'rgb(72, 85, 100)'
    || color === 'rgb(78, 169, 219)'
    || color === 'rgb(137, 48, 61)'
    || color === 'rgb(48, 63, 159)'
    || color === 'rgb(69, 90, 100)'
  ) {
    $('body').css("background", color)
    $('.snowflake').css("background", 'white')
    $('.siteList').css("color", 'white')
    $('.icon2').css("fill", 'white')
    $('.magicText').css("color", 'white')
    $('.searchButton').css("background", 'white')
    $('.searchButton').css("color", color)

  } else {
    $('body').css("background", 'white')
    $('.snowflake').css("background", color)
    $('.siteList').css("color", color)
    $('.icon2').css("fill", color)
    $('.magicText').css("color", color)
    $('.searchButton').css("background", color)
    $('.searchButton').css("color", 'white')
  }
}
magicColor()
// <div class="logo">${node.logo}</div>
const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) =>{
    node.logo = logoList(simplifyUrl(node.url))
    const $li = $(`<li>
      <div class="site">
         <div class="logo">
            <img class="fav" src="${node.logo}" alt="" width="50%" height="50%">
          </div> 
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
          </svg>
         </div>
      </div>
     </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation() // to stop opening the website while clicking on the 'x'
      hashMap.splice(index, 1)
      render()
    })

  })
}

render()

$('.magicButton')
  .on('click', () => {
    magicColor()
    render()
  })


$('.addButton')
  .on(`click`, () => {
    let url = window.prompt('Which website would you like to add?')
    if (url.indexOf('http') !== 0) {
      url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
      logo: simplifyUrl(url)[0],
      //simplifyUrl(url)[0]
      logoType: 'text',
      url: url
    })
    render()
  })

window.onbeforeunload = ()=> {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x', string)
}


$(document).on('keypress', (e) => {
  const {key} = e
  for(let i = 0; i < hashMap.length; i++) {
    if(hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})



