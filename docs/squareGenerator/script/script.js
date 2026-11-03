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

  const $sizeChangerElements = document.querySelectorAll('input[name="sizeChanger"]');
  $sizeChangerElements.forEach(($el, _index) => {
    $el.addEventListener('change', (event) => {
      onChangeItemSize(event.target.value);
    });
  });

  // init
  onChangeItemSize('large');
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

const onChangeItemSize = (_size) => {
  console.log({ _size });

  const $previewElement = document.querySelector('.previewWrapper');

  if (_size === 'large') {
    $previewElement.classList.add('is-large');
    $previewElement.classList.remove('is-small');
  } else {
    $previewElement.classList.add('is-small');
    $previewElement.classList.remove('is-large');
  }
};
