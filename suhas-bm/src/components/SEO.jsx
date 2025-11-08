import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * SEO component for setting meta tags and page title.
 * Usage: <SEO title="Home" description="Portfolio of Suhas BM" />
 */
const SEO = ({ title, description, keywords, image, url }) => {
  const pageTitle = title ? `${title} | Suhas BM` : "Suhas BM";
  const metaDescription = description || "Suhas BM — building reliable data and product workflows end to end.";
  const metaImage = image || "/favicon-s.svg";

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {metaDescription && <meta name="description" content={metaDescription} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default SEO; 