import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/whereisthecar-removebg.png'

const Header = () => {

  const location = useLocation();

  return (
    <div className="flex justify-between bg-slate-200">
      <div className="basis-1/5 text-center">
        <Link to="/">
          <img src={logo} alt="logotype" className="p-5 h-24 w-auto max-w-none"></img>
        </Link>
      </div>
      <div className="basis-1/5 flex text-center flex-col justify-center">
        {location.pathname === "/history" ? (
          <Link to="/" className="text-center flex-col justify-center bg-[#1b1b1b] hover:bg-[#3b3b3b] text-white mr-4 p-2">Tillbaka</Link>
        ) : (
          <Link to="history" className="text-center flex-col justify-center bg-[#1b1b1b] hover:bg-[#3b3b3b] text-white mr-4 p-2">Historik</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
