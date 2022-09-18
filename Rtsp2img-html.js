module.exports.code = (config) => {
  return String.raw`
      <!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://jsmpeg.com/jsmpeg.min.js"></script>
          <script src="https://cdn.socket.io/4.5.0/socket.io.min.js" integrity="sha384-7EyYLQZgWBi67fBtVxw60/OWl1kjsfrPFcaU0pp0nAh+i8FD068QogUvg85Ewy1k" crossorigin="anonymous"></script>
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
          <button id="startBtn">Start capturing</button>
          <button id="stopBtn">Stop capturing</button>
          <button id="captureBtn">capture</button>
        </div>
      </body>
      
      </html>
      
      <script type="module">
          window.onload = function() {
            document.getElementById("startBtn").addEventListener("click", handleStart);
            document.getElementById("stopBtn").addEventListener("click", handleStop);
            document.getElementById("captureBtn").addEventListener("click", handleCapture);
          }

          const inputCanvas = document.getElementById('input-canvas')
          const dataWebSocket = new WebSocket('${config.dataWsURL}')

          const player = new JSMpeg.Player('ws://localhost:9999', {
            canvas: inputCanvas,
            preserveDrawingBuffer : true
          })	

          let sendFrameInterval;

          function handleCapture() {
            const dataURL = inputCanvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = dataURL;
            a.download = "capture.png";
            a.click();
          }

          function handleStart() {
            let dataURL;
            let id = 1;

            sendFrameInterval = setInterval(() => {
                this.dataURL = inputCanvas.toDataURL("image/png");
                dataWebSocket.send(JSON.stringify({ id: id++, data: this.dataURL}));
            }, 100);
          }

          function handleStop() {
              clearInterval(sendFrameInterval);
              alert("정지");
          }
          
      </script>
      `;
};
