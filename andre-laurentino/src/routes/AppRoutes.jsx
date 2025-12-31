import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../components/Loading';

// Lazy Load das Páginas (Code Splitting)
const Home = lazy(() => import('../pages/Home'));
const Blog = lazy(() => import('../pages/Blog'));
const ArticleDetails = lazy(() => import('../pages/ArticleDetails'));
const Labs = lazy(() => import('../pages/Labs'));
const LabDetails = lazy(() => import('../pages/LabDetails'));
const Agenda = lazy(() => import('../pages/Agenda'));
const Contact = lazy(() => import('../pages/Contact'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const Books = lazy(() => import('../pages/Books'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<ArticleDetails />} />
                <Route path="/labs" element={<Labs />} />
                <Route path="/labs/:id" element={<LabDetails />} />
                <Route path="/books" element={<Books />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="*" element={<ErrorPage code={404} />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
