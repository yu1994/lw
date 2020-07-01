/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, " ")}"}`
  );
}
export function merge(wall, list) {
  const that = this;
  const canvas = document.createElement("canvas");
  canvas.width = wall.width;
  canvas.height = wall.height;
  const context = canvas.getContext("2d");
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#fff";
  context.fill();
  const myImage = new Image();
  const myImage2 = new Image();
  myImage.setAttribute("crossOrigin", "anonymous");
  myImage.src = this.currentTheme.bgTheme; //背景图片 你自己本地的图片或者在线图片
  myImage.onload = function() {
    context.drawImage(myImage, 0, 0, 700, 700);
    myImage2.src = that.currentTheme.phone; //你自己本地的图片或者在线图片
    myImage2.crossOrigin = "Anonymous";
    myImage2.onload = function() {
      context.drawImage(myImage2, 175, 175, 225, 225);
      var base64 = canvas.toDataURL("image/png"); //"image/png" 这里注意一下
      var img = document.getElementById("avatar");
      // document.getElementById('avatar').src = base64;
      img.setAttribute("src", base64);
    };
  };
}
export function drawImage(context, url, ratio) {
  return new Promise(resolve => {
    const myImage = new Image();
    myImage.setAttribute("crossOrigin", "anonymous");
    myImage.src = url;
    myImage.onload = function() {
      context.drawImage(
        myImage,
        ratio.left,
        ratio.top,
        ratio.width,
        ratio.height
      );
      resolve(myImage);
    };
  });
}
