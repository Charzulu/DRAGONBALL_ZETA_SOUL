const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const TILE_SIZE = 32;

// Helper to save canvas
function saveCanvas(canvas, filename, dir) {
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, '../public/assets', dir, filename), buffer);
  console.log(`Generated ${dir}/${filename}`);
}

// Generate character modular parts (simple colored rectangles/shapes for prototyping)
// A standard sprite might be 32x32, we will create 3 frames of animation (idle, walk1, walk2)
// For simplicity, just one frame now: 32x32 per part
function generateCharacterPart(name, color, yOffset, height) {
  const canvas = createCanvas(32, 32);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = color;
  ctx.fillRect(8, yOffset, 16, height); // Center 16px wide

  // Add some detail based on part
  if (name.includes('eye')) {
    ctx.fillStyle = 'black';
    ctx.fillRect(10, yOffset + 2, 2, 2);
    ctx.fillRect(20, yOffset + 2, 2, 2);
  } else if (name.includes('scar')) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(12, yOffset);
    ctx.lineTo(16, yOffset + 6);
    ctx.stroke();
  }

  saveCanvas(canvas, `${name}.png`, 'character');
}

// Generate Environment Tiles (Grass, Water, Wall, Floor, Dummy)
function generateEnvTile(name, color, type = 'solid') {
  const canvas = createCanvas(32, 32);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 32, 32);

  if (type === 'grass') {
    ctx.fillStyle = '#2d5a27'; // Darker green dots
    for(let i=0; i<5; i++) {
      ctx.fillRect(Math.random()*28, Math.random()*28, 4, 4);
    }
  } else if (type === 'wall') {
    ctx.strokeStyle = '#000';
    ctx.strokeRect(0, 0, 32, 32);
    ctx.beginPath();
    ctx.moveTo(0, 16); ctx.lineTo(32, 16);
    ctx.moveTo(16, 0); ctx.lineTo(16, 32);
    ctx.stroke();
  } else if (type === 'dummy') {
    // Training dummy
    ctx.fillStyle = '#8B4513'; // SaddleBrown
    ctx.fillRect(12, 16, 8, 16); // post
    ctx.fillStyle = '#DEB887'; // BurlyWood
    ctx.beginPath();
    ctx.arc(16, 12, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(8, 12, 16, 4); // arms
  }

  saveCanvas(canvas, `${name}.png`, 'env');
}

// Character parts
// Skin base (body + head)
generateCharacterPart('skin_light', '#f1c27d', 8, 24);
generateCharacterPart('skin_dark', '#8d5524', 8, 24);
generateCharacterPart('skin_green', '#719c59', 8, 24); // alien

// Hair
generateCharacterPart('hair_spiky_blonde', '#f9e076', 4, 10);
generateCharacterPart('hair_spiky_black', '#222', 4, 10);
generateCharacterPart('hair_bald', 'rgba(0,0,0,0)', 0, 0);

// Scars
generateCharacterPart('scar_none', 'rgba(0,0,0,0)', 0, 0);
generateCharacterPart('scar_eye', 'rgba(0,0,0,0)', 10, 8); // Uses logic above

// Environment tiles
generateEnvTile('grass', '#4caf50', 'grass');
generateEnvTile('water', '#2196f3', 'solid');
generateEnvTile('floor', '#9e9e9e', 'solid');
generateEnvTile('wall', '#607d8b', 'wall');
generateEnvTile('dummy', 'rgba(0,0,0,0)', 'dummy'); // Transparent background dummy
generateEnvTile('boar', '#795548', 'solid'); // Simple brown square for boar for now

console.log('Asset generation complete.');
