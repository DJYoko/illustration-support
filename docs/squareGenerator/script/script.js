const STORE = {
  images: [],
};

const DEFAULT_IMG = './img/default.svg';

window.addEventListener('DOMContentLoaded', () => {
  setupDefaultImage();

  const $inputElements = document.querySelectorAll('.inputFile');
  $inputElements.forEach(($el, _index) => {
    $el.addEventListener('change', (event) => {
      onChangeImage(event, _index);
    });
  });

  document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
  });
});

const onChangeImage = (_event, _index) => {
  const file = _event.target.files[0];
  if (!file) return;

  STORE.images[_index] = URL.createObjectURL(file);

  renderImages();
};

const renderImages = () => {
  const imgElements = document.querySelectorAll('.previewImage');

  imgElements.forEach(($el, _index) => {
    console.log($el, 30, STORE.images[_index]);
    $el.src = STORE.images[_index] || DEFAULT_IMG;
  });
};

const setupDefaultImage = () => {
  const imgElements = document.querySelectorAll('.previewImage');
  imgElements.forEach(($el, _index) => {
    STORE.images[_index] = DEFAULT_IMG;
  });

  renderImages();
};
