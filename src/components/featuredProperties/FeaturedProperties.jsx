import React from 'react';
import './FeaturedProperties.css';
import FeaturedPropertyItem from './FeaturedPropertyItem';
import fpData from './fpData';

function FeaturedProperties() {
  return (
    <div className="fp">
      {fpData.map((fp) => (
        <FeaturedPropertyItem
          key={fp.city}
          imgSrc={fp.imgSrc}
          name={fp.name}
          city={fp.city}
          price={fp.price}
          rating={fp.rating}
          ratingLevel={fp.ratingLevel}
        />
      ))}
    </div>
  );
}

export default FeaturedProperties;
