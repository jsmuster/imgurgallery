import React, { useEffect, useMemo, useRef } from "react";
import { ImgurGalleryItem } from "../../types/imgur";
import { useAppStore } from "../../store";
import "./carousel.css";
import ArrowLeftIcon from "../../icons/arrow-left";
import ArrowRightIcon from "../../icons/arrow-right";
import Sidebar from "./sidebar";
import Button from "../button/button";

const Carousel: React.FC<{
    images: Exclude<ImgurGalleryItem["images"], undefined>;
    title: string | null;
}> = ({ images, title = null }) => {
    // currentIndex - this is the current index of the current image in an array
    const currentIndex = useRef(0);
    // id of the current image
    const active = useAppStore((store) => store.fullscreen!);

    useEffect(() => {
        // During the initialization we find an index of the image in an array of images
        const index = images.findIndex((v) => v.id === active);
        // make sure its more than -1, which means its a valid index
        if (index > -1) currentIndex.current = index;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const next_slide = () => {
        // current image index
        const prevIndex = currentIndex.current;
        // figure out the next image index
        const index = (prevIndex + 1) % images.length;
        // set a new image into the full screen
        useAppStore.getState().set_fullscreen(images[index].id);
        // update the current image index
        currentIndex.current = index;
    };

    const prev_slide = () => {
        // current image index
        const prevIndex = currentIndex.current;
        // calculate the next image index
        const index = (prevIndex - 1 + images.length) % images.length;
        // set the next image into the full screen
        useAppStore.getState().set_fullscreen(images[index].id);
        // update the current index
        currentIndex.current = index;
    };

    // active image for sidebar content
    const active_item = useMemo(() => {
        const item = images.find((v) => v.id === active)!;
        return { ...item, title: item.title ?? title };
    }, [active, images, title]);

    return (
        <div className="carousel">
            <div className="carousel-wrapper">
                <div className="carousel-images">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`carousel-image ${
                                image.id === active ? "carousel-image-0" : "carousel-image-full"
                            }`}
                        >
                            <img src={image.link} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </div>

                <Sidebar image={active_item} />
            </div>

            {/* previous button to switch the image . */}
            <Button size="40" className="carousel-prev-btn" onClick={prev_slide}>
                <ArrowLeftIcon />
            </Button>
            {/* next image to switch the image. */}
            <Button size="40" className="carousel-next-btn" onClick={next_slide}>
                <ArrowRightIcon />
            </Button>
        </div>
    );
};

export default Carousel;
