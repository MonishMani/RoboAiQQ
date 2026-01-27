import React from 'react';
import Robot from '../components/Robot';

/**
 * Robot Test Page
 * Full-screen 3D robot experience
 */
function RobotTestPage() {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
        }}>
            <Robot />
        </div>
    );
}

export default RobotTestPage;
