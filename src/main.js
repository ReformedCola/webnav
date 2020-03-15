const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  { logo: 'A', url: 'https://www.acfun.cn'},
  { logo: 'B', url: 'https://www.bilibili.com'},
]
const colors = ['rgb(61, 192, 176)', 'rgb(175, 61, 78)', 'rgb(162, 104, 54)', 'rgb(91, 161, 80)', 'rgb(230, 79, 82)', 'rgb(0, 188, 212)', 'rgb(96, 125, 139)', 'rgb(132, 92, 78)', 'rgb(225, 116, 33)', 'rgb(0, 188, 212)']

const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // remove everything after '/'
}

const magicColor = () => {
  color = colors[Math.floor(Math.random() * colors.length)]
  $('.snowflake').css("background-color", color)
  $('.siteList').css("color", color)
  $('.icon2').css("fill", color)
  $('.magicText').css("color", color)
  $('.searchButton').css("background", color)
}

const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) =>{
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
          </svg>
          <div class="editDialog" title="Edit-Form"></div>
         </div>
      </div>
     </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation() // to stop opening the website while clicking on the 'x'
      console.log(hashMap)
      hashMap.splice(index, 1)
      render()
    })
    magicColor()
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
  const {key} = e // const key = e.key
  for(let i = 0; i < hashMap.length; i++) {
    if(hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})



