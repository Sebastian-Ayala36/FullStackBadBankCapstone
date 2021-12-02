import { useState } from 'react';
import Card from './Card';

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');

  return (
    <Card
      bgcolor="secondary"
      header="Create Account"
      status={status}
      body={show ? <CreateForm setShow={setShow} setStatus={setStatus} /> : <CreateMsg setShow={setShow} />}
    />
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>
        Add another account
      </button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handle() {
    console.log(name, email, password);

    if (name && email && password) {
      if (password.length < 8) {
        props.setStatus('Password must be at least 8 digits');
        return;
      }
      const url = `/account/create/${name}/${email}/${password}`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);
      })();
      props.setShow(false);
      props.setStatus('');
    } else {
      props.setStatus('Missing information');
    }
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
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
        Create Account
      </button>
    </>
  );
}

export default CreateAccount;
