import PropTypes from 'prop-types';
import React from 'react';

function PListItem({ imgSrc, accommodationType, numberOfHotels }) {
  return (
    <div className="pListItem">
      <img src={imgSrc} alt="" className="pListItemImg" />
      <div className="pListItemTitles">
        <h1>{accommodationType}</h1>
        <h2>{numberOfHotels} properties</h2>
      </div>
    </div>
  );
}

PListItem.propTypes = {
  imgSrc: PropTypes.string,
  accommodationType: PropTypes.string,
  numberOfHotels: PropTypes.number,
};

PListItem.defaultProps = {
  imgSrc: '',
  accommodationType: '',
  numberOfHotels: 0,
};

export default PListItem;
