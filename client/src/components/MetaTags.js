import React from "react";
import MetaTag from "react-meta-tags";

const MetaTags = ({ title, description, id }) => {
  return (
    <MetaTag id={id}>
      <meta name="description" content={`${description}`} />
      <meta name="og:title" content={`${title}`} />
      <title>{title}</title>
    </MetaTag>
  );
};

export default MetaTags;
