import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <HomePage />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
