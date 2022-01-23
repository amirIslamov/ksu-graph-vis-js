import {Link} from "react-router-dom";

const Header = (props) => <div>
    <h1>KSU Graph-vis</h1>
    <nav>
        <Link to={'editor'}>Editor</Link>
        <Link to={'algorithm'}>Algorithms</Link>
    </nav>
</div>

export default Header;