import { Outlet } from "react-router";
// import Header from "../header/header";

const Layout: React.FC = () => {
    return (
        <div className="layout">
            {/* <Header /> */}
            <Outlet />
        </div>
    );
};
export default Layout;
