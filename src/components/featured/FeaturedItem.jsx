import PropTypes from 'prop-types';
import React from 'react';

function FeaturedItem({ imgSrc, name, shortDesc }) {
  return (
    <div className="featuredItem">
      <img src={imgSrc} alt="" className="featuredImg" />
      <div className="featuredTitles">
        <h1>{name}</h1>
        <h2>{shortDesc}</h2>
      </div>
    </div>
  );
}

FeaturedItem.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  shortDesc: PropTypes.string,
};

FeaturedItem.defaultProps = {
  imgSrc: '',
  name: '',
  shortDesc: '',
};
export default FeaturedItem;
