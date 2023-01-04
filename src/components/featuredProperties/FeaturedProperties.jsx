import React from 'react';
import useFetch from '../../hooks/useFetch';
import Loading from '../loading/Loading';
import './FeaturedProperties.css';
import FeaturedPropertyItem from './FeaturedPropertyItem';

function FeaturedProperties() {
  const { data, loading } = useFetch('/hotels?featured=true&limit=4');
  return (
    <div className="fp">
      {loading ? (
        <Loading />
      ) : (
        data.map((fp) => (
          <FeaturedPropertyItem
            key={fp.city}
            imgSrc={fp.photos[0]}
            name={fp.name}
            city={fp.city}
            price={fp.cheapestPrice}
            rating={fp.rating}
            ratingLevel="Excellent"
          />
        ))
      )}
    </div>
  );
}

export default FeaturedProperties;
