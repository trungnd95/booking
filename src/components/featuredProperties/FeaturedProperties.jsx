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
            imgSrc="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
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
