const fs = require('fs');
const path = require('path');

const publicImagesDir = path.resolve(__dirname, 'public/images');
const manifestFile = path.resolve(__dirname, 'src/mocks/imagesManifest.json');

// Walk directory recursively to find all files and group them by folder
function scanDirectory(dir, baseDir, manifest = {}) {
  const items = fs.readdirSync(dir);
  let hasFiles = false;
  const filesList = [];

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath, baseDir, manifest);
    } else {
      // It's a file. Check if it's an image.
      if (/\.(webp|png|jpg|jpeg|svg|gif)$/i.test(item)) {
        hasFiles = true;
        const relUrl = '/' + path.relative(baseDir, fullPath).replace(/\\/g, '/');
        filesList.push({
          url: relUrl,
          caption: path.basename(item, path.extname(item)).replace(/ Kopie| Schwarz Weiß/g, ''),
          wide: false
        });
      }
    }
  }

  if (hasFiles) {
    const relFolderPath = '/' + path.relative(baseDir, dir).replace(/\\/g, '/');
    
    // Create a clean human-readable name from the path
    let label = relFolderPath
      .replace(/^\/images\//, '')
      .replace(/\//g, ' — ')
      .replace(/ -Fallbsp/g, '');

    manifest[relFolderPath] = {
      key: relFolderPath,
      label: label,
      images: filesList
    };
  }

  return manifest;
}

console.log('Scanning public/images for files...');
const manifest = scanDirectory(publicImagesDir, path.resolve(__dirname, 'public'));

fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
console.log(`Manifest successfully written to ${manifestFile}. Found ${Object.keys(manifest).length} image sections.`);
