// Example Usage of Robot Component
// Import this component in your page/app and use it like this:

import Robot from './components/Robot';

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Robot />
        </div>
    );
}

export default App;

// Or use it in a specific section:
function RobotSection() {
    return (
        <section style={{
            width: '100%',
            height: '600px',
            margin: '2rem 0'
        }}>
            <h2>Meet Our Robot</h2>
            <Robot style={{ height: '500px' }} />
        </section>
    );
}
