import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <section>
      <h2>Payment canceled</h2>
      <Link to="/">return to shop</Link>
    </section>
  );
};
export default CancelPage;
