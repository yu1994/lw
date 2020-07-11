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
export function drawImageHandle(context, url, sx, sy, sw,sh,dx,dy,dw ,dh ) {
  return new Promise(resolve => {
    const myImage = new Image();
    myImage.setAttribute("crossOrigin", "anonymous");
    myImage.src = url;
    myImage.onload = function() {
      if (dx || dy|| dw || dh) {
        context.drawImage(
          myImage,sx, sy, sw,sh,dx,dy,dw,dh
        );
      } else {
        context.drawImage(
          myImage,sx, sy, sw,sh
        );
      }
      resolve(myImage);
    };
  });
}

export function getInnerWidth() {
  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (width >= 640) width = 640;
  return width;
}
export function createImgHandle(file) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = file.content;
    img.onload = () => resolve(img);
  });
}
export  function base64ToBlob ({b64data = '', contentType = '', name = 'name',sliceSize = 512} = {}) {
  return new Promise((resolve) => {
    // 使用 atob() 方法将数据解码
    let byteCharacters = atob(b64data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = [];
      for (let i = 0; i < slice.length; i++) {
        byteNumbers.push(slice.charCodeAt(i));
      }
      // 8 位无符号整数值的类型化数组。内容将初始化为 0。
      // 如果无法分配请求数目的字节，则将引发异常。
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    let result = new Blob(byteArrays, {
      type: contentType
    })
    result = Object.assign(result,{
      // jartto: 这里一定要处理一下 URL.createObjectURL
      preview: URL.createObjectURL(result),
      name: `${name}.png`
    });
    resolve(result)
  })
}
