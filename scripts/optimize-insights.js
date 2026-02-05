import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSIGHTS_DIR = path.join(__dirname, '../public/assets/insights');
const QUALITY = 85;

async function processImages() {
    try {
        // Get all JPEG files that are NOT webp files
        const files = fs.readdirSync(INSIGHTS_DIR);
        const jpegFiles = files.filter(file =>
            /\.(jpg|jpeg|png)$/i.test(file)
        ).sort(); // Sort to ensure deterministic ordering

        console.log(`Found ${jpegFiles.length} files to process`);

        let processed = 0;
        let failed = 0;

        for (let i = 0; i < jpegFiles.length; i++) {
            const oldFilename = jpegFiles[i];
            const extension = '.webp';
            const newFilename = `insight-${String(i + 1).padStart(2, '0')}${extension}`;

            const inputPath = path.join(INSIGHTS_DIR, oldFilename);
            const outputPath = path.join(INSIGHTS_DIR, newFilename);

            try {
                // Convert to WebP
                await sharp(inputPath)
                    .webp({ quality: QUALITY })
                    .toFile(outputPath);

                console.log(`✓ [${i + 1}/${jpegFiles.length}] Converted: ${oldFilename} → ${newFilename}`);
                processed++;
            } catch (error) {
                console.error(`✗ Failed to process ${oldFilename}:`, error.message);
                failed++;
            }
        }

        console.log(`\n✅ Optimization complete!`);
        console.log(`   Processed: ${processed}`);
        console.log(`   Failed: ${failed}`);

    } catch (error) {
        console.error('Error during processing:', error);
        process.exit(1);
    }
}

processImages();
