import React, {Suspense} from 'react';
import ShopItems from './ShopItem/ShopItem';

const Shop = () => {
  return (
    <>
      <h1 className="title">Shoppen</h1>
      <Suspense fallback={<h2 className='loadingH2'>Indlæser...</h2>}>
        <ShopItems />
      </Suspense>
    </>
  );
};

export default Shop;
