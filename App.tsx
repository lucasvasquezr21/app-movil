import { AuthProvider } from './app/context/AuthContext';
import Layout from './src/components/Layout';

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}