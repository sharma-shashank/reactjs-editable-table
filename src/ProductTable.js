import React, { useMemo, useState } from 'react';

import ProductRow from "./ProductRow";

export default function ProductTable({ onRowDel, filterText, products, onProductTableUpdate, currentPage, paginate }) {

	const [totalProduct, setTotalProduct] = useState(10);
	const [selectedRows, setSelectedRows] = useState([]);
	const [activeDelete, setActiveDelete] = useState(false);
	const productsPerPage = 10
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalProduct / productsPerPage); i++) {
		pageNumbers.push(i);
	}

	const computePages = (items) => {
		setTotalProduct(items.length);
		return items.slice(
			(currentPage - 1) * productsPerPage,
			(currentPage - 1) * productsPerPage + productsPerPage
		) || [];
	}

	const productData = useMemo(() => {
		if (filterText) {
			const computedProduct = products.filter((product) => {
				if (product.name.indexOf(filterText) !== -1 || product.email.indexOf(filterText) !== -1 || product.role.indexOf(filterText) !== -1) {
					return product;
				}
			});
			return computePages(computedProduct);
		} 
		return computePages(products);
	}, [products, currentPage, filterText]);

	const handeSelectAll = (ev) => {
		if(ev.target.checked) {
			for(let i=0; i< productData.length; i++) {
				document.getElementById(`checkbox-${productData[i].id}`).checked = true;
				document.getElementById(`row-${productData[i].id}`).classList.add('cell-selected');
			}
			setSelectedRows(productData);
			setActiveDelete(true);
		} else {
			for(let i=0; i< productData.length; i++) {
				document.getElementById(`checkbox-${productData[i].id}`).checked = false;
				document.getElementById(`row-${productData[i].id}`).classList.remove('cell-selected');
			}
			setSelectedRows([]);
			setActiveDelete(false);
		}
	}

	const handelCheckbox = (event, product) => {
		if(event.target.checked) {
			document.getElementById(`row-${product.id}`).classList.add('cell-selected');
			const items = [...selectedRows, product];
			setSelectedRows(items);
		} else {
			document.getElementById(`row-${product.id}`).classList.remove('cell-selected');
			const items = [...selectedRows]
			const i = items.findIndex(item => item.id === product.id);
			items.splice(i,1);
			setSelectedRows(items);
		}
		if(selectedRows.length) {
			setActiveDelete(true);
		}
	}

	const handelDeleteSelected = () => {
		onRowDel(selectedRows);
		setActiveDelete(false);
	}

	return (
		<>
			{productData.length ? (
			<>
			<table className="table-hover table" id="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Actions  <input type="checkbox" id="select-all" className="form-check-input" onClick={(ev) => handeSelectAll(ev)}/></th>
					</tr>
				</thead>
				<tbody>
					{productData.map((item, i) => {
						return <ProductRow handelCheckbox={handelCheckbox} onProductTableUpdate={onProductTableUpdate} product={item} onDelEvent={onRowDel} key={item.id} />
					})}
				</tbody>
			</table>
			<nav>
				<ul className="pagination">
					{pageNumbers.map((number) => (
						<li key={number} className="page-item">
							<button onClick={() => paginate(number)} className="page-link">
								{number}
							</button>
						</li>
					))}
				</ul>
			</nav>
			</>
			) : <div>No results found for your search</div>}
      		{activeDelete && <button onClick={handelDeleteSelected} type="button" className="btn btn-primary btn-lg">Delete Selected</button>}
			
		</>
	);
}