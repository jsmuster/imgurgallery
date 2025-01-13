import { useCallback } from "react";
import { useAppStore } from "../../store";
import { AnyImage } from "../../types/imgur";
import AttachmentItem from "../attachment-item";

import useUpdatableRef from "../../hooks/useUpdatableRef";
import useMasonry from "../../hooks/useMasonry";

import Column from "./column";
import Row from "./row";

import "./masonry.css";

const Masonry: React.FC<{
    images?: AnyImage[];
}> = ({ images = [] }) => {
    // set fullscreen on click the image
    const handleClick = useCallback((id: string) => {
        useAppStore.getState().set_fullscreen(id);
    }, []);

    const [masonry_container_ref, setRef] = useUpdatableRef<HTMLDivElement>();

    // get images with calculated width and height
    const imagesGroups = useMasonry(images, masonry_container_ref.current!);

    return (
        <div className="masonry" ref={setRef}>
            {imagesGroups.map((images, index) => (
                // Указываем вычисленный height
                <Row key={index} height={Math.floor(images[0].height)}>
                    {images.map((item, boxIndex) => (
                        // Указываем вычисленный width
                        <Column key={boxIndex} width={Math.floor(item.width)}>
                            <AttachmentItem
                                key={index}
                                link={item.link}
                                type={item.type}
                                className="masonry-item"
                                onClick={() => handleClick(item.id)}
                            />
                        </Column>
                    ))}
                </Row>
            ))}
        </div>
    );
};

export default Masonry;
