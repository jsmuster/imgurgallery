import { createPortal } from "react-dom";
import { ImgurGalleryItem } from "../types/imgur";
import Carousel from "./carousel/carousel";
import { useLayoutEffect } from "react";
// Get element div with id "fullscreen"
const fullscreen_el = document.getElementById("fullscreen")!;

// This is a full screen view component where we display the image carousel
const FullscreenView: React.FC<{
    media: ImgurGalleryItem;
}> = ({ media }) => {
    useLayoutEffect(() => {
        // When component renders it's going to set fullscreen element display to 'block'.
        // By default it's none
        fullscreen_el.style.display = "block";

        // Overflow hidden to disable browsers scrollbar
        document.body.style.overflow = "hidden";
        return () => {
            // When component unmounts we undo our changes
            document.body.style.overflow = "unset";
            fullscreen_el.style.display = "none";
        };
    }, []);

    return createPortal(<Carousel images={media.images!} title={media.title} />, fullscreen_el);
};

export default FullscreenView;
