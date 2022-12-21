
import EditableCell from "./EditableCell";

export default function ProductRow({ product, onDelEvent, onProductTableUpdate, handelCheckbox }) {
	const onRowDelEvent = () => {
		onDelEvent(product);
	}

	const handelCheckboxs = (event, product) => {
		handelCheckbox(event, product);
	}

	return (
		<tr className="eachRow" id={`row-${product.id}`}>

			<EditableCell onProductTableUpdate={onProductTableUpdate} cellData={{
				type: "name",
				value: product.name,
				id: product.id
			}} />
			<EditableCell onProductTableUpdate={onProductTableUpdate} cellData={{
				type: "email",
				value: product.email,
				id: product.id
			}} />
			<EditableCell onProductTableUpdate={onProductTableUpdate} cellData={{
				type: "role",
				value: product.role,
				id: product.id
			}} />
			<td className="del-cell">
				<input type="button" onClick={onRowDelEvent} value="X" className="del-btn" />
				<input id={`checkbox-${product.id}`} type="checkbox" className="form-check-input" onClick={(ev) => handelCheckboxs(ev, product)} />
			</td>
		</tr>
	);
}