import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ title, description, keywords, image, url }) => {
    const defaultTitle = 'André Laurentino | Engenheiro de Software';
    const defaultDescription = 'Portfólio de André Laurentino, Engenheiro de Software especializado em desenvolvimento web de alta performance.';
    const siteUrl = 'https://andrelaurentino.com.br';

    return (
        <Helmet>
            <title>{title ? `${title} | André Laurentino` : defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            {keywords && <meta name="keywords" content={keywords} />}

            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || siteUrl} />
            {image && <meta property="og:image" content={image} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || defaultTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {image && <meta name="twitter:image" content={image} />}

            <html lang="pt-BR" />
        </Helmet>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string
};

export default SEO;
