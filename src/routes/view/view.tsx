import AlbumView from "../../components/album-view/album-view";
import { useNavigate, useParams } from "react-router";
import "./view.css";
import BackIcon from "../../icons/back";
import Button from "../../components/button/button";

const ViewPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const onBack = () => {
        navigate("/");
    };

    return (
        <div className="view-page">
            <div className="album-header">
                <Button size="40" onClick={onBack}>
                    <BackIcon />
                </Button>
            </div>
            <AlbumView id={id!} />
        </div>
    );
};

export default ViewPage;
