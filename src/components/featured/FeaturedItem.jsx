import PropTypes from 'prop-types';
import React from 'react';

function FeaturedItem({ imgSrc, name, count }) {
  return (
    <div className="featuredItem">
      <img src={imgSrc} alt="" className="featuredImg" />
      <div className="featuredTitles">
        <h1>{name}</h1>
        <h2>{`${count} properties`}</h2>
      </div>
    </div>
  );
}

FeaturedItem.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  count: PropTypes.number,
};

FeaturedItem.defaultProps = {
  imgSrc: '',
  name: '',
  count: 0,
};
export default FeaturedItem;
