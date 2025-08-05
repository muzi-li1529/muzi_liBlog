<!-- 明水印 -->
## 明水印
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;水印是在图片上添加的用来声明版权的文字，字符等标签，以便版权所有人能够识别。从实现方式上分为明水印和暗水印，明水印是通过前端直接在图片展示的时候进行添加，暗水印则是要后端进行处理，将水印信息直接添加在二进制文件中。<br/>
<br/>
本篇采用canvas技术实现明水印功能，实现思路为在具体效果和代码如下：

### 效果展示
<Markwater/>

### 代码实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>明水印</title>
</head>
<body>
  <canvas id="watermarkCanvas"></canvas>
  <script>
    function addWaterMark(imageSrc,watermarkText){
      const canvas = document.getElementById("watermarkCanvas");
      const ctx  = canvas.getContext("2d");
      const image = new Image();
      image.src = imageSrc;
      image.onload = function(){
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image,0,0);
        ctx.font = "30px Arial";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText(watermarkText,image.width-150,image.height-30);
      }
    }
    addWaterMark('url',"text");
  </script>
</body>
</html>
