import PlusIcon from "../../icons/plus";
import RecentIcon from "../../icons/recent";
import Button from "../button/button";
import "./header.css";

const Header: React.FC = () => {
    const handleClick = () => {};
    return (
        <div className="header">
            <p className="header--text font-title-m">Albums</p>
            <div className="header--buttons">
                <Button color="blue" onClick={handleClick} left={<PlusIcon />}>
                    Create album
                </Button>
                <Button color="blue" left={<RecentIcon />}>
                    Most recent photo
                </Button>
            </div>
        </div>
    );
};

export default Header;
