const EXPORT_WIDTH = 1590;
const EXPORT_HEIGHT = 2100;
const BOOK_BACK_WIDTH = 105; // 背表紙の幅

const STATE = {
  file: null,
  titleLabel: '',
  yearMonth: '',
  isRotated: false,
};

window.addEventListener('DOMContentLoaded', () => {
  const $fileSelectElement = document.querySelector('#inputFile');
  $fileSelectElement.addEventListener('change', (event) => {
    onChangeImage(event);
  });

  const titleLabel = document.querySelector('#titleLabel');

  // 初期値適用
  STATE.titleLabel = titleLabel.value;
  console.log(STATE);
  titleLabel.addEventListener('change', (event) => {
    STATE.titleLabel = event.target.value;
    render();
  });

  const inputYearMonth = document.querySelector('#inputYearMonth');

  // 初期値適用
  STATE.yearMonth = inputYearMonth.value;
  console.log(STATE);
  inputYearMonth.addEventListener('change', (event) => {
    STATE.yearMonth = event.target.value;
    render();
  });
});

const onChangeImage = (_event) => {
  const file = _event.target.files[0];
  if (!file) return;

  STATE.file = file;
  render();
};

const render = () => {
  const $canvas = document.querySelector('#previewCanvas');
  const canvasContext = $canvas.getContext('2d');

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      // キャンバスのサイズを画像に合わせる（必要に応じて調整してね！）

      // 1. CSSで決まっている表示サイズを取得
      const rect = $canvas.getBoundingClientRect();

      // 2. Canvasの解像度を表示サイズと一致させる
      $canvas.width = EXPORT_WIDTH;
      $canvas.height = EXPORT_HEIGHT;

      const drawAreaWidth = EXPORT_WIDTH * (149 / 159); // 背表紙分を加味

      const canvasAspect = drawAreaWidth / EXPORT_HEIGHT;
      const imageAspect = img.width / img.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imageAspect < canvasAspect) {
        // 画像の方が縦長（または同じ） → 高さを$Canvasに合わせる
        drawWidth = drawAreaWidth;
        drawHeight = drawAreaWidth / imageAspect;
        offsetX = 0;
        offsetY = (EXPORT_HEIGHT - drawHeight) / 2;
      } else {
        // 画像の方が横長 → 横幅をCanvasに合わせる
        drawWidth = EXPORT_HEIGHT * imageAspect;
        drawHeight = EXPORT_HEIGHT;
        offsetX = (drawAreaWidth - drawWidth) / 2;
        offsetY = 0;
      }

      offsetX = BOOK_BACK_WIDTH + offsetX;

      canvasContext.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      drawTextItem();
    };
    img.src = event.target.result;
  };

  if (STATE.file) {
    reader.readAsDataURL(STATE.file);
  } else {
    drawTextItem();
  }
};

const drawTextItem = () => {
  const $canvas = document.querySelector('#previewCanvas');
  const canvasContext = $canvas.getContext('2d');
  canvasContext.translate(0, 0);
  canvasContext.rotate(0);

  if (!$canvas.getAttribute('width')) {
    $canvas.width = EXPORT_WIDTH;
    $canvas.height = EXPORT_HEIGHT;
  }

  canvasContext.fillStyle = '#ffffff'; // 色を指定
  canvasContext.fillRect(0, 0, BOOK_BACK_WIDTH, EXPORT_HEIGHT); // (x, y, 幅, 高さ)

  // 背表紙の厚さを算出 10 / 149
  const fontSize = BOOK_BACK_WIDTH;
  const fontWeight = '1000';
  const fontFamily = 'Hiragino Kaku Gothic ProN';

  // 掲載文字のスタイル
  canvasContext.font = `${fontWeight} ${fontSize}px "${fontFamily}", arial`;
  canvasContext.fillStyle = '#000'; // 文字色
  canvasContext.textAlign = 'left'; // 水平中央揃え
  canvasContext.textBaseline = 'top'; // 垂直中央揃え

  // 配置
  canvasContext.translate(0, 32);
  canvasContext.rotate((90 * Math.PI) / 180);

  const _yearMonthText = STATE.yearMonth.replace('-', '/');
  canvasContext.fillText(`  ${STATE.titleLabel}  ${_yearMonthText}  NERUMARE`, 0, -1 * fontSize);
};
