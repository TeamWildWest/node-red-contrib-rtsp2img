module.exports = function (RED) {
  function Rtsp2imgNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg) {
      msg.payload = msg.payload;
      node.send(msg);
    });
  }
  RED.nodes.registerType("rtsp2img", Rtsp2imgNode);
};
