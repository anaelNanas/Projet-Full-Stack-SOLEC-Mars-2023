import {useState, useEffect} from 'react';

export const Admin = () => {
  const [orderList, setOrderList] = useState([]);
  const [selected, setSelected] = useState([]);

  const fetchOrders = () => {
    fetch('http://cabe0232.odns.fr/webdev-api/order')
      .then((res) => res.json())
      .then((orders) => setOrderList(orders))
  };

  useEffect(fetchOrders, []);

  const handleCheckboxChange = (id) => {
    const idx = selected.indexOf(id);
    if (id >= 0) {
      selected.splice(idx, 1);
      setSelected(selected);
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleDeleteClicked = async () => {
    const promises = selected.map((id) => fetch(`http://cabe0232.odns.fr/webdev-api/order/${id}`, { method: 'delete' }));
    await Promise.all(promises);
    setSelected([]);
    await fetchOrders();
  };

  const orderRows = orderList.map((order) => (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.date}</td>
      <td>{order.client}</td>
      <td><pre>{order.description}</pre></td>
      <td>{order.price}</td>
      <td><input type="checkbox" checked={selected.includes(order.id)} onChange={() => handleCheckboxChange(order.id)} /></td>
    </tr>
  ));

  return (
    <>
      <h2>Commandes</h2>
      <button type="button" className="mt-3 mb-3 btn btn-danger" onClick={handleDeleteClicked}>Supprimer la sélection</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Date</th>
            <th scope="col">Client</th>
            <th scope="col">Description</th>
            <th scope="col">Prix</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderRows}
        </tbody>
      </table>
    </>
  );

};
