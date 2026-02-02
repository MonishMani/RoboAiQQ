import React from 'react';

/**
 * ROBOT COMPONENT - TEMPORARILY DISABLED
 * 
 * This component was attempting to load animation GLB files that have been removed:
 * - Front Flip.glb
 * - Waving.glb
 * - Standing 2H Magic Attack 01.glb
 * - Stop Walking.glb
 * 
 * The component has been disabled to prevent 404 errors on the website.
 * To re-enable: Add the required GLB animation files to /public/assets/models/
 */

export default function Robot({ style, className }) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            padding: '40px',
            textAlign: 'center',
            ...style
        }} className={className}>
            <div>
                <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#667eea' }}>
                    🤖 Robot Animation Component
                </h2>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                    This feature is temporarily unavailable.
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                    Animation files need to be added to enable this component.
                </p>
            </div>
        </div>
    );
}
