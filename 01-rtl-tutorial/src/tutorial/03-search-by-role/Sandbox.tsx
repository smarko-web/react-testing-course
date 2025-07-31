import { useEffect, useState } from 'react';

const Sandbox = () => {
  const [showAsyncButton, setShowAsyncButton] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Show async button after 1sec
    const timer = setTimeout(() => {
      setShowAsyncButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>

      {/* Headings */}
      <h1>Main Heading</h1>
      <h4>Subheading</h4>

      <img src="example.jpg" alt="Example" />

      {/* Regular buttons */}
      <button>Click me</button>
      <button>Submit</button>
      <button>Cancel</button>

      {/* Conditional error button to demonstrate queryByRole */}
      {showError && <button>Error</button>}

      {/* Async button to demonstrate findByRole */}
      {showAsyncButton && <button>Async Button</button>}
    </div>
  );
};

export default Sandbox;
