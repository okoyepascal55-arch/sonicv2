const fs = require('fs');
const path = require('path');

const publicImagesDir = path.resolve(__dirname, 'public/images');
const srcDir = path.resolve(__dirname, 'src');

// Walk directory recursively
function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// 1. Gather all actual image files in public/images
let actualImages = [];
if (fs.existsSync(publicImagesDir)) {
  actualImages = walk(publicImagesDir).map(file => {
    // get relative path with forward slashes starting from /images/
    const rel = path.relative(path.resolve(__dirname, 'public'), file);
    return '/' + rel.replace(/\\/g, '/');
  });
}

console.log(`Found ${actualImages.length} images in public/images.`);

// 2. Scan src/ directory for references
const srcFiles = walk(srcDir).filter(file => /\.(tsx|ts|js|jsx|css|html)$/.test(file));
console.log(`Scanning ${srcFiles.length} files in src/ for image references...`);

const references = []; // array of { file, text, line, match }

// Regex to find potential image paths or references
// We want to capture anything that looks like /images/... or references in files
// Specifically, strings starting with /images/ and containing file extensions like .webp, .png, .jpg, .jpeg, .svg
const imagePathRegex = /\/images\/[^\s'"`\)]+\.(webp|png|jpg|jpeg|svg|gif)/gi;

// We also want to capture relative image paths if any, e.g. ../../public/images/
// Let's search for image names in general as well, to see if they match by base name.
for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    let match;
    // reset regex
    imagePathRegex.lastIndex = 0;
    while ((match = imagePathRegex.exec(line)) !== null) {
      references.push({
        file: path.relative(__dirname, file).replace(/\\/g, '/'),
        line: idx + 1,
        match: match[0],
        cleanMatch: decodeURIComponent(match[0]) // decode URL encoding if any
      });
    }
  });
}

console.log(`Found ${references.length} image references in src/.`);

// 3. Analysis
const brokenReferences = [];
const referencedImagesSet = new Set();

for (const ref of references) {
  const cleanPath = ref.cleanMatch;
  referencedImagesSet.add(cleanPath);
  
  // check if file exists in public directory
  const localPath = path.join(path.resolve(__dirname, 'public'), cleanPath);
  if (!fs.existsSync(localPath)) {
    // Try to see if case sensitivity or spaces are different
    // Let's look for matching files in actualImages (case-insensitive)
    const lowerClean = cleanPath.toLowerCase();
    const actualMatch = actualImages.find(img => img.toLowerCase() === lowerClean);
    if (actualMatch) {
      brokenReferences.push({
        ...ref,
        reason: `Case/naming difference. Code: "${cleanPath}", Disk: "${actualMatch}"`
      });
    } else {
      brokenReferences.push({
        ...ref,
        reason: 'File does not exist'
      });
    }
  }
}

const unusedImages = actualImages.filter(img => {
  // Check if this image is referenced in the code
  // We check exact match, or case-insensitive match, or if the basename is used anywhere
  const isUsed = Array.from(referencedImagesSet).some(ref => ref.toLowerCase() === img.toLowerCase());
  return !isUsed;
});

console.log('\n--- BROKEN / MISMATCHED REFERENCES ---');
if (brokenReferences.length === 0) {
  console.log('No broken references found.');
} else {
  brokenReferences.forEach(b => {
    console.log(`[BROKEN] File: ${b.file}:${b.line} -> "${b.match}" (${b.reason})`);
  });
}

console.log('\n--- UNUSED IMAGES ON DISK ---');
if (unusedImages.length === 0) {
  console.log('No unused images found.');
} else {
  console.log(`Found ${unusedImages.length} unused images:`);
  unusedImages.forEach(img => {
    console.log(`[UNUSED] ${img}`);
  });
}

// Write results to a file for easier inspection
const report = {
  actualImagesCount: actualImages.length,
  srcFilesScanned: srcFiles.length,
  referencesCount: references.length,
  brokenReferences,
  unusedImages
};

fs.writeFileSync(path.resolve(__dirname, 'image_check_report.json'), JSON.stringify(report, null, 2));
console.log('\nReport written to image_check_report.json');
