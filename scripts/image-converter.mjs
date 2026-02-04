#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts all PNG, JPG, JPEG images to WebP and AVIF formats
 * Preserves original files as fallbacks
 */

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Configuration
const CONFIG = {
    // Directories to scan
    inputDirs: [
        join(projectRoot, 'public/assets/images'),
        join(projectRoot, 'public/assets/about'),
        join(projectRoot, 'public/assets/mentors'),
        join(projectRoot, 'public/assets/testimonials'),
        join(projectRoot, 'public/assets/unique'),
    ],
    // Output directory for optimized images (same as input)
    outputInline: true,
    // Quality settings
    webpQuality: 85,
    avifQuality: 80,
    // Extensions to convert
    extensions: ['.png', '.jpg', '.jpeg'],
    // Skip if already exists
    skipExisting: false,
};

// Statistics tracking
const stats = {
    total: 0,
    converted: 0,
    skipped: 0,
    failed: 0,
    originalSize: 0,
    webpSize: 0,
    avifSize: 0,
};

/**
 * Get all image files from a directory
 */
async function getImageFiles(dir) {
    const files = [];

    try {
        const entries = await readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = join(dir, entry.name);

            if (entry.isDirectory()) {
                // Recursively scan subdirectories
                const subFiles = await getImageFiles(fullPath);
                files.push(...subFiles);
            } else if (entry.isFile()) {
                const ext = extname(entry.name).toLowerCase();
                if (CONFIG.extensions.includes(ext)) {
                    files.push(fullPath);
                }
            }
        }
    } catch (error) {
        console.warn(`⚠️  Could not read directory ${dir}: ${error.message}`);
    }

    return files;
}

/**
 * Convert single image to WebP and AVIF
 */
async function convertImage(inputPath) {
    const ext = extname(inputPath);
    const dir = dirname(inputPath);
    const name = basename(inputPath, ext);

    const webpPath = join(dir, `${name}.webp`);
    const avifPath = join(dir, `${name}.avif`);

    try {
        // Get original file size
        const originalStats = await stat(inputPath);
        stats.originalSize += originalStats.size;

        // Check if outputs already exist
        if (CONFIG.skipExisting) {
            try {
                await stat(webpPath);
                await stat(avifPath);
                console.log(`⏭️  Skipping ${basename(inputPath)} (already converted)`);
                stats.skipped++;
                return;
            } catch {
                // Files don't exist, continue with conversion
            }
        }

        // Load image once
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        console.log(`🔄 Converting ${basename(inputPath)} (${metadata.width}x${metadata.height}, ${(originalStats.size / 1024).toFixed(1)} KB)`);

        // Convert to WebP
        await image
            .clone()
            .webp({ quality: CONFIG.webpQuality, effort: 6 })
            .toFile(webpPath);

        const webpStats = await stat(webpPath);
        stats.webpSize += webpStats.size;

        // Convert to AVIF (better compression but slower)
        await image
            .clone()
            .avif({ quality: CONFIG.avifQuality, effort: 6 })
            .toFile(avifPath);

        const avifStats = await stat(avifPath);
        stats.avifSize += avifStats.size;

        const webpSaved = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);
        const avifSaved = ((1 - avifStats.size / originalStats.size) * 100).toFixed(1);

        console.log(`  ✅ WebP: ${(webpStats.size / 1024).toFixed(1)} KB (${webpSaved}% smaller)`);
        console.log(`  ✅ AVIF: ${(avifStats.size / 1024).toFixed(1)} KB (${avifSaved}% smaller)`);

        stats.converted++;
    } catch (error) {
        console.error(`  ❌ Failed to convert ${basename(inputPath)}: ${error.message}`);
        stats.failed++;
    }
}

/**
 * Main execution
 */
async function main() {
    console.log('🚀 RoboAIQ Image Optimization Script\n');
    console.log('📂 Scanning directories...\n');

    // Collect all image files
    const allImageFiles = [];
    for (const dir of CONFIG.inputDirs) {
        const files = await getImageFiles(dir);
        allImageFiles.push(...files);
        console.log(`   Found ${files.length} images in ${dir}`);
    }

    stats.total = allImageFiles.length;
    console.log(`\n📊 Total images to convert: ${stats.total}\n`);

    if (stats.total === 0) {
        console.log('✅ No images found to convert.');
        return;
    }

    console.log('⚙️  Starting conversion...\n');

    // Convert all images
    for (const file of allImageFiles) {
        await convertImage(file);
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📈 CONVERSION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total images processed:  ${stats.total}`);
    console.log(`Successfully converted:  ${stats.converted}`);
    console.log(`Skipped:                 ${stats.skipped}`);
    console.log(`Failed:                  ${stats.failed}`);
    console.log('');
    console.log(`Original total size:     ${(stats.originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`WebP total size:         ${(stats.webpSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`AVIF total size:         ${(stats.avifSize / 1024 / 1024).toFixed(2)} MB`);
    console.log('');

    if (stats.converted > 0) {
        const webpReduction = ((1 - stats.webpSize / stats.originalSize) * 100).toFixed(1);
        const avifReduction = ((1 - stats.avifSize / stats.originalSize) * 100).toFixed(1);

        console.log(`WebP savings:            ${webpReduction}% (${((stats.originalSize - stats.webpSize) / 1024 / 1024).toFixed(2)} MB saved)`);
        console.log(`AVIF savings:            ${avifReduction}% (${((stats.originalSize - stats.avifSize) / 1024 / 1024).toFixed(2)} MB saved)`);
    }

    console.log('='.repeat(60));
    console.log('\n✨ Image optimization complete!\n');
}

// Run the script
main().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
});
