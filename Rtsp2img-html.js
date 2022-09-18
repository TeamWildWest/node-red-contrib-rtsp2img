module.exports.code = (config) => {
  return String.raw`
      <!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://jsmpeg.com/jsmpeg.min.js"></script>
          <title>RTSP to Img frame</title>
      </head>
      
      <body>
        <div align="center" style="min-height: 800px;">
          <h1>RTSP to Img Page</h1>
          <div style="display: inline-block;" align="center" class="tooltip">
            <canvas id="input-canvas" width="600px" height="340px" style="border:3px solid grey"></canvas><br>
          </div>
        </div>
        <div>
          <button id="captureBtn">capture stream</button>
        </div>
      </body>
      
      </html>
      
      <script type="module">
          window.onload = function() {
            document.getElementById("captureBtn").addEventListener("click", handleClick);
          }

          const inputCanvas = document.getElementById('input-canvas')
          
          player = new JSMpeg.Player('ws://localhost:9999', {
            canvas: inputCanvas,
            preserveDrawingBuffer : true
          })	
        
          function handleClick() {

            const dataURL = inputCanvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = dataURL;
            a.download = "capture.png";
            console.log(dataURL);
            a.click();
          }
      </script>
      `;
};
