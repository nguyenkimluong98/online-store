import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = (props) => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/product">
        Product
      </MenuItem>
      <MenuItem icon="asterisk" to="/product-category">
        Product Category
      </MenuItem>
      {props.isAdmin && (<MenuItem icon="asterisk" to="/customer">
        Customer
      </MenuItem>)}
      <MenuItem icon="asterisk" to="/product-order">
        Product Order
      </MenuItem>
      <MenuItem icon="asterisk" to="/order-item">
        Order Item
      </MenuItem>
      <MenuItem icon="asterisk" to="/invoice">
        Invoice
      </MenuItem>
      <MenuItem icon="asterisk" to="/shipment">
        Shipment
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
