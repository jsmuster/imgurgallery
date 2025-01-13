import { useRef, useState, useEffect } from "react";
import { useAppStore } from "../../store";
import { ImageDescription, ImgurImage } from "../../types/imgur";

import "./sidebar.css";

import ChevronLeftIcon from "../../icons/chevron-left";
import CloseIcon from "../../icons/close";
import Button from "../button/button";

const Sidebar: React.FC<{
    image: ImgurImage;
}> = ({ image }) => {
    const is_fetching = useRef(false);
    const [state, set_state] = useState<ImageDescription | null>(null);
    const [sidebar, set_sidebar] = useState(false);

    useEffect(() => {
        if (!is_fetching.current) {
            is_fetching.current = true;
            useAppStore
                .getState()
                .generate_descriptions(image.id, image.link)
                .then((res) => {
                    set_state(res);
                });
        }
    }, [image.id, image.link]);

    const close = () => {
        useAppStore.getState().set_fullscreen(null);
    };

    const show_sidebar = () => {
        set_sidebar((prev) => !prev);
    };
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Button size="40" className="carousel-chevron-btn" onClick={show_sidebar}>
                    <ChevronLeftIcon />
                </Button>
                {sidebar && <div className="sidebar--title font-label-l">{image.title}</div>}
                <Button size="40" className="carousel-close-btn" onClick={close}>
                    <CloseIcon />
                </Button>
            </div>
            {sidebar && (
                <div className="sidebar-content">
                    <DescriptionRenderer description={state} />
                </div>
            )}
        </div>
    );
};

const DescriptionRenderer: React.FC<{
    description: ImageDescription | null;
}> = ({ description }) => {
    
    if (!description) {
        //  null means we are loading, show loading state
        return (
            <div className="description--container">
                <div className="description font-body-s">Loading...</div>
            </div>
        );
    }

    if (description.status === "failed") {
        // failure to generate the description
        return (
            <div className="description--container">
                <div className="description font-body-s">Failed to generate description!</div>
            </div>
        );
    }
    
    return (
        <div className="description--container">
            <div className="description font-body-s">{description.description}</div>
            <div className="description--keywords-list">
                {description.keywords.map((v) => (
                    <div className="description--keyword-item font-body-s" key={v}>
                        {v}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Sidebar;
