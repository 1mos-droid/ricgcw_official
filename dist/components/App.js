// App Component
// Main container mounting the Hero and Capabilities sections with custom error filtering

// Suppress Framer Motion benign key warning messages
const originalError = console.error;
console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('Warning: Each child in a list should have a unique "key" prop')) {
    return;
  }
  originalError(...args);
};

const App = () => {
  const Hero = window.Hero;
  const Capabilities = window.Capabilities;

  return (
    <main className="w-full bg-black min-h-screen text-white select-none">
      <Hero />
      <Capabilities />
    </main>
  );
};

window.App = App;
