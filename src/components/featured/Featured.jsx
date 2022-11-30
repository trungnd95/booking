import React from 'react';
import './Featured.css';
import featuredData from './featuredData';
import FeaturedItem from './FeaturedItem';

function Featured() {
  return (
    <div className="featured">
      {featuredData.map((featured) => (
        <FeaturedItem
          key={featured.name}
          imgSrc={featured.imgSrc}
          name={featured.name}
          shortDesc={featured.shortDesc}
        />
      ))}
    </div>
  );
}

export default Featured;
