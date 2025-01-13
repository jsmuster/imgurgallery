import { useEffect, useRef } from "react";
import SearchInputField from "../../components/input";
import AlbumPreview from "../../components/album-preview/album-preview";
import { useAppStore } from "../../store";
import "./home.css";

// Page to render all the albums from imgur
const HomePage: React.FC = () => {
    const { items, search } = useAppStore();

    const is_initialized = useRef(false);

    useEffect(() => {
        // Check if is initialized
        if (!is_initialized.current) {
            // If it's not then set true
            is_initialized.current = true;
            // And fetch albums from Imgur
            search({
                q_all: "cats",
                q_type: "album",
            });
        }
    }, [search]);

    return (
        <div className="home-page">
            <SearchInputField />
            <div className="home-page--content">
                {items.map((v) => (
                    <AlbumPreview key={v.id + v.datetime} media={v} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
