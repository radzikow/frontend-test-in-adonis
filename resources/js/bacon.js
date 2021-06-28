const cloneBaconBtn = document.querySelector('.bacon-page section:nth-child(1) button')

if (cloneBaconBtn) {
  cloneBaconBtn.addEventListener('click', cloneBaconImage)
}

const baconImage = document.querySelector('img[src="/images/bacon.jpg"]')

function cloneBaconImage () {
  let clonedImage = baconImage.cloneNode(true)
  baconImage.after(clonedImage)
  jumpToPageBottom()
}

function jumpToPageBottom () {
  window.scrollTo(0, document.body.scrollHeight)
}
