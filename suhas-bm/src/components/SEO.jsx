import PropTypes from 'prop-types';

/**
 * Sets document title and core meta tags without Helmet.
 */
const SEO = ({ title, description, keywords, image, url }) => {
  const pageTitle = title ? `${title} | Suhas BM` : "Suhas BM";
  const metaDescription = description || "Suhas BM — building reliable data and product workflows end to end.";
  const metaImage = image || "/favicon-s.svg";

  if (typeof document !== "undefined") {
    document.title = pageTitle;

    const setMetaTag = (name, content, attr = "name") => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMetaTag("description", metaDescription);
    setMetaTag("keywords", keywords);
    setMetaTag("og:title", pageTitle, "property");
    setMetaTag("og:description", metaDescription, "property");
    setMetaTag("og:image", metaImage, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", pageTitle);
    setMetaTag("twitter:description", metaDescription);
    setMetaTag("twitter:image", metaImage);
    setMetaTag("og:url", url, "property");
  }

  return null;
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default SEO;