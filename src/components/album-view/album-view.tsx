import { useNavigate } from "react-router";
import { useAppStore } from "../../store";
import { useLayoutEffect, useRef } from "react";
import { $get_album } from "../../api";
import { format } from "date-fns";
import FullscreenView from "../fullscreen-view";
import { AnyImage } from "../../types/imgur";

import "./album-view.css";
import Masonry from "../masonry/masonry";

const AlbumView: React.FC<{
    id: string;
}> = ({ id }) => {
    const navigate = useNavigate();
    const media = useAppStore((store) => store.items.find((v) => v.id === id)!);
    const fullscreen = useAppStore((store) => store.fullscreen);
    const is_loaded = useRef(false);

    useLayoutEffect(() => {
        const loader = async () => {
            if (is_loaded.current) return;
            // Loading the current album
            const album = await $get_album(id!);

            // if no such album then navigate to main page
            if (!album) navigate("/");
            else {
                // add to store
                is_loaded.current = true;
                useAppStore.getState().set_item(album.data);
                useAppStore.getState().set_active(album.data.id);
            }
        };

        // call this to load an album
        loader();
    }, [id, navigate]);

    // if no album then show nothing
    if (!media) return null;

    return (
        <div className="album-view">
            <div className="album-view--header">
                <p className="album-view--header-title font-title-l">{media.title}</p>

                <p className="album-view--header-subtitle font-body-m">
                    {
                        // Format === April 29th, 1453
                        // Imgur returns (number timestamp / 1000)
                        format(media.datetime * 1000, "PPP")
                    }
                </p>
            </div>
            {fullscreen ? <FullscreenView media={media} /> : <Masonry images={media.images ?? [media as AnyImage]} />}
        </div>
    );
};

export default AlbumView;
