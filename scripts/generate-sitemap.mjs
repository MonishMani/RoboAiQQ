#!/usr/bin/env node

/**
 * Sitemap Generation Script
 * Auto-generates sitemap.xml for RoboAIQ website
 */

import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Configuration
const CONFIG = {
    baseUrl: 'https://www.roboaiq.in',
    outputPath: join(projectRoot, 'public/sitemap.xml'),
    robotsPath: join(projectRoot, 'public/robots.txt'),

    // Routes configuration
    routes: [
        {
            path: '/',
            priority: '1.0',
            changefreq: 'weekly',
            title: 'Home - Robotics & AI Education for Kids',
        },
        {
            path: '/about',
            priority: '0.9',
            changefreq: 'monthly',
            title: 'About RoboAIQ',
        },
        {
            path: '/programs',
            priority: '0.9',
            changefreq: 'monthly',
            title: 'Program Curriculum',
        },
        {
            path: '/robotics-kit',
            priority: '0.8',
            changefreq: 'monthly',
            title: 'Robotics Kit',
        },
        {
            path: '/mentors',
            priority: '0.7',
            changefreq: 'monthly',
            title: 'Our Mentors',
        },
        {
            path: '/privacy-policy',
            priority: '0.3',
            changefreq: 'yearly',
            title: 'Privacy Policy',
        },
    ],
};

/**
 * Generate sitemap.xml content
 */
function generateSitemap() {
    const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const route of CONFIG.routes) {
        xml += '  <url>\n';
        xml += `    <loc>${CONFIG.baseUrl}${route.path}</loc>\n`;
        xml += `    <lastmod>${now}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += '  </url>\n';
    }

    xml += '</urlset>\n';

    return xml;
}

/**
 * Generate robots.txt content
 */
function generateRobotsTxt() {
    return `# RoboAIQ Robots.txt
# Allow all search engines to crawl the site

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${CONFIG.baseUrl}/sitemap.xml

# Disallow paths (if any)
# Disallow: /admin/
# Disallow: /api/
`;
}

/**
 * Main execution
 */
async function main() {
    console.log('🗺️  RoboAIQ Sitemap Generator\n');

    try {
        // Generate sitemap.xml
        console.log('📝 Generating sitemap.xml...');
        const sitemapContent = generateSitemap();
        await writeFile(CONFIG.outputPath, sitemapContent, 'utf8');
        console.log(`✅ Sitemap saved to: ${CONFIG.outputPath}`);
        console.log(`   Total URLs: ${CONFIG.routes.length}`);

        // Generate robots.txt
        console.log('\n📝 Generating robots.txt...');
        const robotsContent = generateRobotsTxt();
        await writeFile(CONFIG.robotsPath, robotsContent, 'utf8');
        console.log(`✅ Robots.txt saved to: ${CONFIG.robotsPath}`);

        // Print route summary
        console.log('\n📊 Routes included in sitemap:');
        console.log('─'.repeat(60));
        for (const route of CONFIG.routes) {
            console.log(`${route.path.padEnd(20)} Priority: ${route.priority}  Freq: ${route.changefreq}`);
        }
        console.log('─'.repeat(60));

        console.log('\n✨ Sitemap generation complete!');
        console.log(`\n🌐 Your sitemap will be available at: ${CONFIG.baseUrl}/sitemap.xml`);
        console.log('📌 Next steps:');
        console.log('   1. Deploy your site');
        console.log('   2. Visit Google Search Console: https://search.google.com/search-console');
        console.log('   3. Submit your sitemap URL');
        console.log('   4. Verify with Bing Webmaster Tools');

    } catch (error) {
        console.error('❌ Error generating sitemap:', error.message);
        process.exit(1);
    }
}

// Run the script
main().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
});
