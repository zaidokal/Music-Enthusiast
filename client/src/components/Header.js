import GenericButton from "../components/GenericButton";
import { Login } from "../views/Login";
import { Register } from "../views/Register";

const Header = (props) => {
  return (
    <div className="container">
      <GenericButton linkTo={"/login"} text={"Login"} />
      <GenericButton linkTo={"/register"} text={"Register"} />
      <label>SRZ Music</label>
    </div>
  );
};
