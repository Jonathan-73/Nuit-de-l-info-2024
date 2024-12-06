import QRCode from "easyqrcodejs";

interface QrCodeWithBackgroundOptions {
  link: string;
  imagePath: string;
  size?: number;
}

export function createQrCodeWithBackground(
  options: QrCodeWithBackgroundOptions
): HTMLDivElement {
  const { link, imagePath, size = 300 } = options;

  const containerDiv = document.createElement("div");

  const qrOptions = {
    text: link,
    width: size,
    height: size,
    quietZone: 0,
    backgroundImage: imagePath, //logo: imagePath, if we want the image to be in the center
    backgroundImageAlpha: 0.9, // Optional: transparency level for better blending
    dotScale: 1, // Scale of QR code dots (1 = full coverage)
    colorDark: "#000000", // QR code dot color
    colorLight: "rgba(255, 255, 255, 0)", // Transparent QR code background
  };

  // Generate the QR code
  new QRCode(containerDiv, qrOptions);

  return containerDiv;
}

/*
How to use it:

import { createQrCodeWithBackground } from "./pokemon-qrcode";
function addQrCode() {
    const qrCodeDiv = createQrCodeWithBackground({
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Link to encode
      imagePath: "Stacktiflette.png", // Background image path
      size: 400, // Size of the QR code
    });
  
    // Append the QR code div to the document
    document.body.appendChild(qrCodeDiv);
  }
  
  addQrCode();
*/
