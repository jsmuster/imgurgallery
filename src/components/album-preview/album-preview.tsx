import { useNavigate } from "react-router";
import { useAppStore } from "../../store";
import { ImgurGalleryItem } from "../../types/imgur";
import AttachmentItem from "../attachment-item";
import "./album-preview.css";

const AlbumPreview: React.FC<{
    media: ImgurGalleryItem;
}> = ({ media }) => {
    const navigate = useNavigate();
    const preview = media.is_album ? media.images![0] : media;

    const handleClick = () => {
        navigate(`/${media.id}`);
        useAppStore.getState().set_active(media.id);
    };

    return (
        <div className="album-preview" onClick={handleClick}>
            <AttachmentItem
                key={preview.id + preview.datetime}
                type={preview.type!}
                link={preview.link}
                className="album-preview__thumbnail"
            />
            <div className="album-preview__metadata">
                <p className="album-preview__metadata--title font-label-l">{media.title}</p>
                <p className="album-preview__metadata--subtitle font-body-s">{Number(media.images_count)} items</p>
            </div>
        </div>
    );
};

export default AlbumPreview;
