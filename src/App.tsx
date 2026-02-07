import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Leaderboard } from './components/Leaderboard';
import { LoginForm } from './components/LoginForm';
import { AdminPanel } from './components/AdminPanel';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <div className="bubbles" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="bubble" />
          ))}
        </div>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Leaderboard />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </AuthProvider>
    </HashRouter>
  );
}
