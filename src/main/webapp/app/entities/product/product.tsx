import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Input } from 'reactstrap';
import { openFile, byteSize, Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProduct } from 'app/shared/model/product.model';
import { getEntities } from './product.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export const Product = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const [searchedText, setSearchedText] = useState('');

  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const productList = useAppSelector(state => state.product.entities);
  const loading = useAppSelector(state => state.product.loading);
  const totalItems = useAppSelector(state => state.product.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { match } = props;

  return (
    <div>
      <h2 id="product-heading" data-cy="ProductHeading">
        Products
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          {isAdmin && (
            <Link to="/product/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
              <FontAwesomeIcon icon="plus" />
              &nbsp; Create new Product
            </Link>
          )}
        </div>
      </h2>
      <div className="table-responsive">
        <div className="mb-2 d-flex justify-content-end align-items-center">
          <span className="mr-2 col-2">Filter by name</span>
          <Input type="search" placeholder="Enter the product name" onChange={e => setSearchedText(e.target.value)} />
          <span className="mx-2 col-1">Sort by</span>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-light" onClick={sort('name')}>
              <span className="d-flex">
                <span>Name</span>&nbsp;
                <FontAwesomeIcon icon="sort" />
              </span>
            </button>
            <button type="button" className="btn btn-light" onClick={sort('price')}>
              <span className="d-flex">
                <span>Price</span>&nbsp;
                <FontAwesomeIcon icon="sort" />
              </span>
            </button>
            <button type="button" className="btn btn-light" onClick={sort('size')}>
              <span className="d-flex">
                <span>Size</span>&nbsp;
                <FontAwesomeIcon icon="sort" />
              </span>
            </button>
          </div>
        </div>

        {productList && productList.length > 0 ? (
          <div className="list-group">
            {productList
              .filter(p => p.name.toLowerCase().includes(searchedText.toLowerCase()))
              .map((product, i) => (
                <div
                  key={`entity ${i}`}
                  className="list-group-item list-group-item-action flex-column
              align-items-start"
                >
                  <div className="row">
                    <div className="col-2 col-xs-12 justify-content-center">
                      <img
                        src={`data:${product.imageContentType};base64,${product.image}`}
                        style={{ maxHeight: 150 }}
                        alt="product image"
                      />
                    </div>
                    <div className="col col-xs-12">
                      <div className="d-flex w-100 justify-content-between">
                        <Link to={`/product/${product.id}`}>
                          <h5 className="mb-1">{product.name}</h5>
                        </Link>
                        {product.productCategory ? (
                          <small>
                            <Link to={`/product-category/${product.productCategory.id}`}>Category: {product.productCategory.name}</Link>
                          </small>
                        ) : (
                          ''
                        )}
                      </div>
                      <small className="mb-1">{product.description}</small>
                      <p className="mb-1">Price: {product.price} (VND)</p>
                      <small className="mb-1">
                        Size:
                        <span>{product.size}</span>
                      </small>
                      {isAdmin && (
                        <div className="mt-2">
                          <Button
                            tag={Link}
                            to={`/product/${product.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                            color="primary"
                            size="sm"
                            data-cy="entityEditButton"
                          >
                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                          </Button>
                          <span style={{ width: 10, display: 'inline-block' }}></span>
                          <Button
                            tag={Link}
                            to={`/product/${product.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                            color="danger"
                            size="sm"
                            data-cy="entityDeleteButton"
                          >
                            <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          // <Table responsive>
          //   <thead>
          //     <tr>
          //       <th className="hand" onClick={sort('id')}>
          //         ID <FontAwesomeIcon icon="sort" />
          //       </th>
          //       <th className="hand" onClick={sort('name')}>
          //         Name <FontAwesomeIcon icon="sort" />
          //       </th>
          //       <th className="hand" onClick={sort('description')}>
          //         Description <FontAwesomeIcon icon="sort" />
          //       </th>
          //       <th className="hand" onClick={sort('price')}>
          //         Price <FontAwesomeIcon icon="sort" />
          //       </th>
          //       <th className="hand" onClick={sort('size')}>
          //         Size <FontAwesomeIcon icon="sort" />
          //       </th>
          //       <th className="hand" onClick={sort('image')}>
          //         Image <FontAwesomeIcon icon="sort" />
          //       </th>
          //       <th>
          //         Product Category <FontAwesomeIcon icon="sort" />
          //       </th>
          //       <th />
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {productList.map((product, i) => (
          //       <tr key={`entity-${i}`} data-cy="entityTable">
          //         <td>
          //           <Button tag={Link} to={`/product/${product.id}`} color="link" size="sm">
          //             {product.id}
          //           </Button>
          //         </td>
          //         <td>{product.name}</td>
          //         <td>{product.description}</td>
          //         <td>{product.price}</td>
          //         <td>{product.size}</td>
          //         <td>
          //           {product.image ? (
          //             <div>
          //               {product.imageContentType ? (
          //                 <a onClick={openFile(product.imageContentType, product.image)}>
          //                   <img src={`data:${product.imageContentType};base64,${product.image}`} style={{ maxHeight: '30px' }} />
          //                   &nbsp;
          //                 </a>
          //               ) : null}
          //               <span>
          //                 {product.imageContentType}, {byteSize(product.image)}
          //               </span>
          //             </div>
          //           ) : null}
          //         </td>
          //         <td>
          //           {product.productCategory ? (
          //             <Link to={`/product-category/${product.productCategory.id}`}>{product.productCategory.name}</Link>
          //           ) : (
          //             ''
          //           )}
          //         </td>
          //         <td className="text-end">
          //           <div className="btn-group flex-btn-group-container">
          //             <Button tag={Link} to={`/product/${product.id}`} color="info" size="sm" data-cy="entityDetailsButton">
          //               <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
          //             </Button>
          //             {isAdmin && (
          //               <>
          //                 <Button
          //                   tag={Link}
          //                   to={`/product/${product.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
          //                   color="primary"
          //                   size="sm"
          //                   data-cy="entityEditButton"
          //                 >
          //                   <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          //                 </Button>
          //               <Button
          //                 tag={Link}
          //                 to={`/product/${product.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
          //                 color="danger"
          //                 size="sm"
          //                 data-cy="entityDeleteButton"
          //               >
          //                 <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
          //               </Button>
          //             </>)}
          //           </div>
          //         </td>
          //       </tr>
          //     ))}
          //   </tbody>
          // </Table>
          !loading && <div className="alert alert-warning">No Products found</div>
        )}
      </div>
      {totalItems ? (
        <div className={productList && productList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Product;
