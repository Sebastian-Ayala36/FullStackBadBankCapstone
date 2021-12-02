import Card from "./Card";
import { useContext, useState } from "react";
import UserContext from "./context";

function Withdraw() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <Card
      bgcolor="secondary"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <WithdrawMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [amount, setAmount] = useState("");
  const userContext = useContext(UserContext);
  const { setLoggedIn } = useContext(UserContext);

  function handle() {
    if (isNaN(amount) || amount <= 0 || amount > userContext.loggedIn.balance) {
      props.setStatus("Invalid amount");
      return;
    }
    fetch(`/account/update/${userContext.loggedIn.email}/${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(`Withdraw of $${amount} has been successful`);
          props.setShow(false);
          console.log("JSON:", data);
          setLoggedIn({
            id: userContext.loggedIn.id,
            name: userContext.loggedIn.name,
            email: userContext.loggedIn.email,
            balance: userContext.loggedIn.balance - parseInt(amount),
          });
        } catch (err) {
          props.setStatus("Withdraw failed");
          console.log("err:", text);
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
        Withdraw
      </button>
    </>
  );
}

export default Withdraw;
