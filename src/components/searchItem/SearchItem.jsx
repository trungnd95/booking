/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchItem.css';

function SearchItem({ item }) {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">Studio Apartment with Air conditioning</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button type="button">{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button type="button" className="siCheckButton">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
SearchItem.propTypes = {
  item: PropTypes.object,
};

SearchItem.defaultProps = {
  item: null,
};
export default SearchItem;
