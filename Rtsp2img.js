const Stream = require("node-rtsp-stream");

module.exports = function (RED) {
  function Rtsp2imgNode(config) {
    function HTML() {
      return require("./Rtsp2img-html.js").code(config);
    }

    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg, send) {
      const rtspURL = config.rtspURL;
      const smartthingsMnid = this.credentials.smartthingsMnid;
      const smartthingsPat = this.credentials.smartthingsPat;

      stream = new Stream({
        name: "name",
        streamUrl: `rtsps://${smartthingsMnid}:${smartthingsPat}@${rtspURL}`,
        wsPort: 9999,
        ffmpegOptions: {
          // options ffmpeg flags
          "-stats": "", // an option with no neccessary value uses a blank string
          "-r": 30, // options with required values specify the value after the key
        },
      });

      msg.payload = HTML();
      send(msg);
    });
  }
  RED.nodes.registerType("rtsp2img", Rtsp2imgNode, {
    credentials: {
      smartthingsMnid: { value: "" },
      smartthingsPat: { value: "" },
    },
  });
};
