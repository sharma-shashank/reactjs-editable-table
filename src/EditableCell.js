export default function EditableCell({onProductTableUpdate, cellData}) {
    return (
        <td>
          <input type='text' name={cellData.type} id={cellData.id} value={cellData.value} onChange={onProductTableUpdate}/>
        </td>
      );
}