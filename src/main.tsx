import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeTheme } from './utils/theme';

// Initialize theme system
initializeTheme();

createRoot(document.getElementById("root")!).render(<App />);
