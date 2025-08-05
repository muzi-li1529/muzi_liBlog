<!-- 电影院选座 -->
## 电影院选座
在开发电影原售票等相关页面时，会碰到电影院选座的相关问题，本文采用canvas绘图的方式实现座位渲染，并通过点击事件动态控制作为效果。

### 效果展示
<Cinema />

### 代码实现
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>电影院选座</title>
  <style>
    canvas{
      border: 1px solid black;
      display: block;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  
  <canvas id="cinemaCanvas" width="800" height="600"></canvas>
  <script src="./cinema.js"></script>
 
</body>
</html>

```

```javascript
//cinema.js
const canvas = document.getElementById('cinemaCanvas');
const ctx = canvas.getContext('2d');

const rows = 10;
const cols = 15;
const seatSize = 40;
const seatSpacing = 10;

const seats = [];

for (let row = 0; row < rows; row++) {
  const seatRow = [];
  for (let col = 0; col < cols; col++) {
    const x = col * (seatSize + seatSpacing) +25;
    const y = row * (seatSize + seatSpacing) +50;
    const status = 'available';
    seatRow.push({ x, y, status });
  }
  seats.push(seatRow);
  
}
function drawSeats() {
  seats.forEach(row=>{
    row.forEach(seat=>{
      ctx.fillStyle = getSeatColor(seat.status);
      ctx.fillRect(seat.x, seat.y, seatSize,seatSize);
    
    })
  })
}
function getSeatColor(status) {
  switch (status) {
    case 'available':
      return 'green';
    case 'selected':
      return'blue';
    case 'unavailable':
      return 'red';
    default:
      return 'grey'; 
  }
}
drawSeats();
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  seats.forEach(row => {
    row.forEach(seat => {
      if(x>=seat.x && x<=seat.x+seatSize && y>=seat.y && y<=seat.y+seatSize){
        if(seat.status === 'available'){
          seat.status ='selected';
        }else if(seat.status ==='selected'){
          seat.status = 'available';
        }
        drawSeats();
      }
    });
  });
})

