import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Header = (props) => <div className="navbar navbar-light bg-light flex-row ">
    <div className="container-fluid">
        <h1 className="navbar-brand">KSU Graph-vis</h1>
        <nav className="nav nav-tabs">
            <Link className="nav-link" to={'editor'}>Editor</Link>
            <Link className="nav-link" to={'algorithm'}>Algorithms</Link>
        </nav>
    </div>  
</div>

export default Header;