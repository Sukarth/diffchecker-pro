const sharp = require('sharp');
const fs = require('fs');
const sizes = [192, 512, 144, 256, 384];

sizes.forEach(size => {
    sharp('assets/icon.png')
        .resize(size, size)
        .toFile(`assets/icon-${size}.png`, (err, info) => {
            if (err) console.error(`Error resizing to ${size}x${size}:`, err);
            else console.log(`Created icon-${size}.png`);
        });
});