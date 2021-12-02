import { useContext, useState } from 'react';
import UserContext from './context';
import Card from './Card';

function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const userContext = useContext(UserContext);

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        userContext.loggedIn.name === null ? (
          <LoginForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function LoginMsg(props) {
  const { setLoggedIn } = useContext(UserContext);

  function handle() {
    props.setShow(true);
    setLoggedIn({
      id: null,
      name: null,
      email: null,
      balance: null,
    });
  }
  return (
    <>
      <h5>Success</h5>
      <button type="submit" className="btn btn-light" onClick={handle}>
        Authenticate again
      </button>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useContext(UserContext);
  const userContext = useContext(UserContext);

  function handle() {
    fetch(`/account/login/${email}/${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus('');
          props.setShow(false);
          console.log('JSON:', data);
          setLoggedIn({
            id: data._id,
            name: data.name,
            email: data.email,
            balance: data.balance,
          });
          console.log(userContext);
        } catch (err) {
          props.setStatus('Error at login');
          console.log('err:', text);
        }
      });
  }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Login
      </button>
    </>
  );
}

export default Login;
