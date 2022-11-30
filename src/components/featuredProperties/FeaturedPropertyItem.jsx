import PropTypes from 'prop-types';
import React from 'react';

function FeaturedPropertyItem({ imgSrc, name, city, price, rating, ratingLevel }) {
  return (
    <div className="fpItem">
      <img src={imgSrc} alt="" className="fpImg" />
      <span className="fpName">{name}</span>
      <span className="fpCity">{city}</span>
      <span className="fpPrice">Starting from ${price}</span>
      <div className="fpRating">
        <button type="button">{rating}</button>
        <span>{ratingLevel}</span>
      </div>
    </div>
  );
}

FeaturedPropertyItem.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  city: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.string,
  ratingLevel: PropTypes.string,
};

FeaturedPropertyItem.defaultProps = {
  imgSrc: null,
  name: null,
  city: null,
  price: null,
  rating: null,
  ratingLevel: null,
};

export default FeaturedPropertyItem;
