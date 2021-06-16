const baconImage = document.querySelector('#baconPage img')
const baconButtonWrapper = document.querySelector('#baconPage section:nth-child(1)')
const baconImagesWrapper = document.querySelector('#baconPage section:nth-child(2)')
const baconButton = document.querySelector('#baconPage section:nth-child(1) button')

// Add classes to the elements on the bacon page
if (baconImage) {
  baconImage.classList.add('bacon-image')
}
if (baconImagesWrapper) {
  baconImagesWrapper.classList.add('bacon-images-wrapper')
}
if (baconButton) {
  baconButton.classList.add('bacon-button')
}

// Handle clone button click
if (baconButton) {
  baconButton.addEventListener('click', cloneImage)
}

function cloneImage () {
  let clone = baconImage.cloneNode(true)
  baconImage.after(clone)
  jumpToPageBottom()
  console.log('Yeah, I love bacon!')
}

function jumpToPageBottom () {
  window.scrollTo(0, document.body.scrollHeight)
}
