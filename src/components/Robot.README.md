# Robot Component

Production-ready 3D character system for React/Next.js with seamless animation sequencing and auto-return camera behavior.

## Features

- ✅ **Intro Animation**: Front flip → Waving (on first load)
- ✅ **Loop Animation**: Magic attack → Stop walking → Waving (4s each, infinite)
- ✅ **Smooth Crossfading**: 0.4s transitions, zero T-posing
- ✅ **Auto-Return Camera**: Returns to front view after 1.5s inactivity
- ✅ **Interactive Controls**: Mouse drag to rotate, scroll to zoom
- ✅ **Performance Optimized**: Preloading, Suspense, error boundaries
- ✅ **Mobile Responsive**: Auto-scales for all screen sizes

## Quick Start

### Test the Component

```bash
npm run dev
```

Navigate to: `http://localhost:5175/robot-test`

### Use in Your App

```jsx
import Robot from './components/Robot';

function MyPage() {
  return (
    <div style={{ height: '600px' }}>
      <Robot />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `object` | `{}` | Custom inline styles |
| `className` | `string` | `undefined` | Custom CSS class |

## Files

- `src/components/Robot.jsx` - Main component
- `src/components/Robot.example.jsx` - Usage examples
- `src/pages/RobotTest.jsx` - Test page

## Animation Sequence

1. **Intro** (plays once):
   - Front Flip animation
   - Crossfade to Waving

2. **Loop** (infinite):
   - Magic Attack (4 seconds)
   - Stop Walking (4 seconds)
   - Waving (4 seconds)
   - Repeat

## Customization

### Change Animation Duration

Edit line 183-221 in `Robot.jsx`:

```javascript
if (animTimerRef.current >= 6.0) { // Change from 4.0 to 6.0 for 6 seconds
```

### Change Auto-Return Delay

Edit line 267 in `Robot.jsx`:

```javascript
}, 3000); // Change from 1500 to 3000 for 3 seconds
```

### Adjust Camera Position

Edit lines 45-46 in `Robot.jsx`:

```javascript
const initialCameraPos = useRef(new THREE.Vector3(0, 2, 6)); // Adjust position
const initialCameraTarget = useRef(new THREE.Vector3(0, 1.5, 0)); // Adjust target
```

## Troubleshooting

### Models Not Loading

Verify file paths in `Robot.jsx` match actual GLB files in `/public/assets/models/`:

```javascript
const MODEL_PATHS = {
  base: '/assets/models/roboaiq-model.glb',
  frontFlip: '/assets/models/Front Flip.glb',
  waving: '/assets/models/Waving.glb',
  magicAttack: '/assets/models/Standing 2H Magic Attack 01.glb',
  stopWalking: '/assets/models/Stop Walking.glb',
};
```

### Animation Not Playing

Check console for animation clip errors. Ensure all GLB files contain animations and have compatible skeletons.

### Performance Issues

Reduce shadow quality:

```javascript
shadow-mapSize-width={1024} // Reduce from 2048
```

Or disable shadows:

```jsx
<Canvas shadows={false}>
```

## Dependencies

- `react` ^19.2.0
- `three` ^0.182.0
- `@react-three/fiber` ^9.5.0
- `@react-three/drei` ^10.7.7

## Browser Support

- ✅ Chrome/Edge (Desktop + Mobile)
- ✅ Firefox
- ✅ Safari (macOS + iOS)

## Performance

| Device | Target FPS | Load Time |
|--------|-----------|-----------|
| Desktop | 60 FPS | < 2s |
| Mobile | 30-45 FPS | < 5s |

## License

Part of RoboAiQ project
