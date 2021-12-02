import Card from './Card';

function Home() {
  return (
    <Card
      txtcolor="black"
      header="Full Stack Bank"
      title="Welcome to this Brand New Bank Website"
      text="You may use the navigation bar for creating a new user or manage your account as a logged in user"
      body={<img src="bank.png" className="img-fluid" alt="Illustration of a bank" />}
    />
  );
}

export default Home;
