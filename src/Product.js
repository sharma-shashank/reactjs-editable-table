import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

export default function Products() {
  const [filterText, setFilterText] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)

  const handleUserInput = (filterText) => {
    console.log(filterText);
    setFilterText(filterText);
  };

  const handleRowDel = (product) => {
    let delProducts = [];
    const cloneProducts = [...products];
    if (Array.isArray(product)) {
      delProducts = [...product];
      document.getElementById('select-all').checked = false;
    } else {
      delProducts.push(product);
    }
    for (let i = 0; i < delProducts.length; i++) {
      cloneProducts.splice(delProducts[i], 1);
    }
    setProducts(cloneProducts);
  };

  const handleProductTable = (evt) => {
    const item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    let pro = products.slice();
    let newProducts = pro.map(function (product) {
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
        }
      }
      return product;
    });
    setProducts(newProducts);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const url =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
    fetch(url).then((res) => res.json())
      .then((pro) => {
        setProducts(pro);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <SearchBar filterText={filterText} onUserInput={handleUserInput} />
      <ProductTable
        onProductTableUpdate={handleProductTable}
        onRowDel={handleRowDel}
        paginate={paginate}
        products={products}
        filterText={filterText}
        currentPage={currentPage}
      />
    </>
  );
}
