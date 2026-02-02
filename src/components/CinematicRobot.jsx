import React from "react";

/**
 * CINEMATIC ROBOT COMPONENT - TEMPORARILY DISABLED
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

export default function CinematicRobot() {
    return (
        <div className="relative w-full h-[600px] md:h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
            <div className="text-center p-8">
                <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                    🤖 Cinematic Robot Experience
                </h2>
                <p className="text-white/70 mb-2">
                    This feature is temporarily unavailable.
                </p>
                <p className="text-white/50 text-sm">
                    Animation files need to be added to enable this component.
                </p>
            </div>
        </div>
    );
}
