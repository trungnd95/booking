import React from 'react';
import pListData from './pListData';
import PListItem from './PListItem';
import './PropertyList.css';

function PropertyList() {
  return (
    <div className="pList">
      {pListData.map((pData) => (
        <PListItem
          key={pData.accommodationType}
          imgSrc={pData.imgSrc}
          accommodationType={pData.accommodationType}
          numberOfHotels={pData.numberOfHotels}
        />
      ))}
    </div>
  );
}

export default PropertyList;
