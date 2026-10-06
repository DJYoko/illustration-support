const IMAGE_WIDTH = 1050;
const IMAGE_HEIGHT = 1485;
const $canvasElement = document.getElementById('previewCanvas');
const canvasContext = $canvasElement.getContext('2d');

window.addEventListener('DOMContentLoaded', async () => {
  // サイズ設定（先にやる）
  $canvasElement.width = IMAGE_WIDTH;
  $canvasElement.height = IMAGE_HEIGHT;

  // フォント読み込み待ち
  await document.fonts.ready;

  // setEvents
  const $inputItemList = document.querySelectorAll('.js-inputItem');
  $inputItemList.forEach(($singleItem) => {
    $singleItem.addEventListener('input', () => {
      clearCanvas();
      drawTexts();
    });
  });

  clearCanvas();
  drawTexts();
});

// clear canvas
const clearCanvas = () => {
  canvasContext.clearRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

  // 背景真っ白
  canvasContext.fillStyle = '#ffffff';
  canvasContext.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
};

// draw texts
const drawTexts = () => {
  canvasContext.font = 'bold 60px "Noto Sans JP", sans-serif';
  canvasContext.strokeStyle = '#333333';

  // 見出し
  const $titleInput = document.getElementById('mainTitle');
  canvasContext.fillStyle = '#333333';
  canvasContext.fillText($titleInput.value, 100, 970);

  // 発行日
  const $yearInput = document.getElementById('publishDateYear');
  const $MonthInput = document.getElementById('publishDateMonth');
  const $dayInput = document.getElementById('publishDateDay');

  canvasContext.font = '24px "Noto Sans JP", sans-serif';
  const displayText = `${$yearInput.value}年　${$MonthInput.value}月${$dayInput.value}日　初版発行`;
  canvasContext.fillText(displayText, 100, 1042);

  // 固定部分
  canvasContext.fillText('著　者　　ねるマレ＠AI', 100, 1100);
  canvasContext.fillText('連絡先　　nerumare@gmail.com', 100, 1136);
  canvasContext.fillText('印　刷　　しまうま出版', 100, 1228);

  canvasContext.font = '16px "Noto Sans JP", sans-serif';
  canvasContext.fillText('※本書を無断で複写、転載、転売、オークション出品等するのはおやめください。', 100, 1276);

  // 区切り線 - 太いほう
  canvasContext.beginPath(); // パス開始
  canvasContext.moveTo(100, 990); // 始点
  canvasContext.lineTo(948, 990); // 終点
  canvasContext.lineWidth = 2;
  canvasContext.stroke(); //

  // 区切り線 - 細いほう
  canvasContext.beginPath(); // パス開始
  canvasContext.moveTo(100, 1168); // 始点
  canvasContext.lineTo(948, 1168); // 終点
  canvasContext.lineWidth = 1;
  canvasContext.stroke(); //

  const $downLoadButton = document.querySelector('.js-dlButton');
  $downLoadButton.href = $canvasElement.toDataURL('image/png');
};
