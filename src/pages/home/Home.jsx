import React from 'react';
import {
  Contact,
  Featured,
  FeaturedProperties,
  Footer,
  Header,
  Navbar,
  PropertyList,
} from '../../components';
import './Home.css';

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
