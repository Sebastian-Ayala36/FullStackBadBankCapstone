import Card from './Card';
import { useContext, useState } from 'react';
import UserContext from './context';

function Deposit() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');

  return (
    <Card
      bgcolor="secondary"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <DepositMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const [amount, setAmount] = useState('');
  const userContext = useContext(UserContext);
  const { setLoggedIn } = useContext(UserContext);

  function handle() {
    if (isNaN(amount) || amount <= 0) {
      props.setStatus('Invalid amount');
      return;
    }
    fetch(`/account/update/${userContext.loggedIn.email}/${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(`Deposit of $${amount} has been succesful`);
          props.setShow(false);
          console.log('JSON:', data);
          setLoggedIn({
            id: userContext.loggedIn.id,
            name: userContext.loggedIn.name,
            email: userContext.loggedIn.email,
            balance: userContext.loggedIn.balance + parseInt(amount),
          });
        } catch (err) {
          props.setStatus('Deposit failed');
          console.log('err:', text);
        }
      });
  }

  return (
    <>
      Balance
      <br />
      <p>${userContext.loggedIn.balance}</p>
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Deposit
      </button>
    </>
  );
}

export default Deposit;
