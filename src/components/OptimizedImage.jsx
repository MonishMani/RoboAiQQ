import React from 'react';
import PropTypes from 'prop-types';

/**
 * OptimizedImage Component
 * 
 * Renders images with modern format support (AVIF/WebP) and proper fallbacks.
 * Automatically handles lazy loading, responsive sizing, and accessibility.
 * 
 * @param {Object} props
 * @param {string} props.src - Path to the original image (e.g., '/assets/images/hero.jpg')
 * @param {string} props.alt - Alt text for accessibility (required for SEO)
 * @param {string} [props.className] - CSS classes
 * @param {boolean} [props.loading='lazy'] - Loading strategy: 'lazy' | 'eager'
 * @param {string} [props.sizes] - Responsive sizes attribute
 * @param {number} [props.width] - Image width
 * @param {number} [props.height] - Image height
 * @param {boolean} [props.priority=false] - If true, disables lazy loading (for LCP images)
 */
const OptimizedImage = ({
    src,
    alt,
    className = '',
    loading = 'lazy',
    sizes,
    width,
    height,
    priority = false,
    onLoad,
    onError,
    style,
}) => {
    // Don't optimize if it's an external URL or SVG
    const isExternal = src.startsWith('http') || src.startsWith('//');
    const isSvg = src.endsWith('.svg');

    if (isExternal || isSvg) {
        return (
            <img
                src={src}
                alt={alt}
                className={className}
                loading={priority ? 'eager' : loading}
                width={width}
                height={height}
                onLoad={onLoad}
                onError={onError}
                style={style}
                decoding="async"
            />
        );
    }

    // Generate optimized image paths
    const getOptimizedPaths = (originalSrc) => {
        const lastDotIndex = originalSrc.lastIndexOf('.');
        const basePath = originalSrc.substring(0, lastDotIndex);
        const extension = originalSrc.substring(lastDotIndex);

        return {
            avif: `${basePath}.avif`,
            webp: `${basePath}.webp`,
            original: originalSrc,
        };
    };

    const paths = getOptimizedPaths(src);

    return (
        <picture className={className}>
            {/* AVIF - Best compression, modern browsers */}
            <source srcSet={paths.avif} type="image/avif" />

            {/* WebP - Great compression, wide support */}
            <source srcSet={paths.webp} type="image/webp" />

            {/* Fallback to original format */}
            <img
                src={paths.original}
                alt={alt}
                loading={priority ? 'eager' : loading}
                decoding="async"
                width={width}
                height={height}
                sizes={sizes}
                onLoad={onLoad}
                onError={onError}
                style={style}
            />
        </picture>
    );
};

OptimizedImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    loading: PropTypes.oneOf(['lazy', 'eager']),
    sizes: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    priority: PropTypes.bool,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    style: PropTypes.object,
};

export default OptimizedImage;
