import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSIGHTS_DIR = path.join(__dirname, '../public/assets/insights');
const QUALITY = 85;

async function convertToWebP() {
    try {
        // Get all JPEG files
        const files = fs.readdirSync(INSIGHTS_DIR);
        const jpegFiles = files.filter(file =>
            /\.(jpg|jpeg)$/i.test(file)
        );

        console.log(`Found ${jpegFiles.length} JPEG files to convert`);

        let converted = 0;
        let failed = 0;

        for (const file of jpegFiles) {
            const inputPath = path.join(INSIGHTS_DIR, file);
            const outputPath = path.join(INSIGHTS_DIR, file.replace(/\.(jpg|jpeg)$/i, '.webp'));

            try {
                await sharp(inputPath)
                    .webp({ quality: QUALITY })
                    .toFile(outputPath);

                // Delete original JPEG
                fs.unlinkSync(inputPath);
                converted++;
                console.log(`✓ Converted: ${file} → ${path.basename(outputPath)}`);
            } catch (error) {
                console.error(`✗ Failed to convert ${file}:`, error.message);
                failed++;
            }
        }

        console.log(`\n✅ Conversion complete!`);
        console.log(`   Converted: ${converted}`);
        console.log(`   Failed: ${failed}`);
        console.log(`   Total: ${jpegFiles.length}`);

    } catch (error) {
        console.error('Error during conversion:', error);
        process.exit(1);
    }
}

convertToWebP();
