// // const app = new window.PIXI.Application({
// //   width: window.innerWidth,
// //   height: window.innerHeight / 1.5
// // });
// // const canvas = document.getElementById("mycanvas");

// let _w = window.innerWidth;
// let _h = window.innerHeight;

// const renderer = new PIXI.Renderer({
//   view: canvas,
//   width: _w,
//   height: _h / 1.5,
//   backgroundColor: 0xf5f5f5,
//   resolution: window.devicePixelRatio,
//   autoDensity: true
// });

// window.addEventListener("resize", resize);

// function resize() {
//   _w = window.innerWidth;
//   _h = window.innerHeight;
//   renderer.resize(_w, _h);
// }

// const stage = new PIXI.Container();

// const texture1 = PIXI.Texture.from("mage.png");
// const texture2 = PIXI.Texture.from("mage_2.png");
// const img1 = new PIXI.Sprite(texture1);
// const img2 = new PIXI.Sprite(texture2);

// img1.anchor.x = 0.5;
// img1.anchor.y = 0.5;
// console.log(img2);
// stage.addChild(img1);
// stage.addChild(img2);

// const ticker = new PIXI.Ticker();
// ticker.add(animate);
// ticker.start();

// function animate() {
//   img1.x = renderer.screen.width / 2;
//   img1.y = renderer.screen.height / 2;
//   img1.rotation += 0.0125;
//   renderer.render(stage);
// }
