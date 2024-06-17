import { Link } from "react-router-dom";
const NavBar = () => {

    return (
        <nav>
            <ul>
                <li>
                    <Link to="Donations">כל התרומות</Link>
                </li>
                <li>
                    <Link to="AddDonation">הוספת תרומה</Link>
                </li>

            </ul>
        </nav>
    );
}

export default NavBar;