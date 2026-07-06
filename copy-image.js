const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\Person\\.gemini\\antigravity\\brain\\4fd28fb6-eb34-41bc-b9a8-22aa6adfa793\\media__1782985598096.png';
const destDir = path.join(__dirname, 'src', 'assets');
const destPath = path.join(destDir, 'hero-doctor.png');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log('Created directory: src/assets');
  }
  fs.copyFileSync(srcPath, destPath);
  console.log('Successfully copied doctor image to src/assets/hero-doctor.png!');
} catch (err) {
  console.error('Error copying file:', err);
  console.log('\nAlternative: Please manually copy this file:');
  console.log(srcPath);
  console.log('To this location:');
  console.log(destPath);
}
