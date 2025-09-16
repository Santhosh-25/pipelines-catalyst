"use strict";
const express = require("express");
const app = express();
const catalyst = require("zcatalyst-sdk-node");

app.get("/imageConversion", async (req, res) => {
  const catalystApp = catalyst.initialize(req);
  const { createCanvas, loadImage } = require("canvas");
  const fs = require("fs");

  async function drawImage() {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext("2d");

    // Fill background
    ctx.fillStyle = "#3498db";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.font = "bold 48px Sans";
    ctx.fillStyle = "white";
    ctx.fillText("Hello, Canvas!", 200, 100);

    // Load and draw an image
    const image = await loadImage("https://picsum.photos/200");
    ctx.drawImage(image, 300, 150, 200, 200);

    // Save to file
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./Newoutputfile.png", buffer);

    const stratus = catalystApp.stratus();
    const file = fs.createReadStream(`./Newoutputfile.png`);
    const bucket = stratus.bucket("bucketgit");
    const response = await bucket.putObject(`Newoutputfile.png`, file);
    console.log(response);

    console.log("✅ Image saved as output.png");
  }

  drawImage().catch((err) => console.error(err));

  res.status(200).send("Success");
});

app.get("/svgpng", async (req, res) => {
  try {
    const catalystApp = catalyst.initialize(req);

    // install: npm install @resvg/resvg-js

    const { Resvg } = require("@resvg/resvg-js");
    const fs = require("fs");

    async function svgToPng() {
      // Example SVG string (you could also read from a file)
      const svgCode = `
		  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
			<rect width="200" height="200" fill="#2ecc71"/>
			<circle cx="100" cy="100" r="80" fill="white"/>
			<text x="100" y="115" font-size="32" text-anchor="middle" fill="#2ecc71">Hi!</text>
		  </svg>
		`;

      // Create renderer with config
      const resvg = new Resvg(svgCode, {
        fitTo: {
          mode: "width", // could be "original", "height", "zoom"
          value: 400, // resize width to 400px
        },
        font: {
          loadSystemFonts: true, // allows using system fonts for text
        },
      });

      // Render the SVG
      const render = resvg.render();

      // Get PNG buffer
      const pngBuffer = render.asPng();

      // Save PNG to disk
      fs.writeFileSync("newoutputfilefromsvg3.png", pngBuffer);

      const stratus = catalystApp.stratus();
      const file = fs.createReadStream(`./newoutputfilefromsvg3.png`);
      const bucket = stratus.bucket("bucketgit");
      const response = await bucket.putObject(
        `newoutputfilefromsvg3.png`,
        file
      );
      console.log(response);

      console.log("✅ SVG rendered and saved as output.png");
    }

    const test = await svgToPng();
    console.log("test :", test);
  } catch (error) {
    console.log("error :", error);
  }
});

app.get("/pixman", async(req, res) => {
  try{
async function generateQrCode(text) {
  const size = 300;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // White background
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, size, size);

  // Render QR code onto the canvas
  await QRCode.toCanvas(canvas, text, {
    width: size,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });

  // Save PNG
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("qrcode.png", buffer);

  console.log("✅ QR code saved as qrcode.png");
}
generateQrCode("https://example.com").catch(console.error);

  
}catch(err){
  console.log("error :", err);
}
});

module.exports = app;
