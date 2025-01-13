import clsx from "../classNames";

const AttachmentItem: React.FC<{
    type: string;
    link: string;
    className: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({ link, type, className, onClick }) => {
    if (type === "video/mp4") {
        return (
            <div className={clsx(className, "video")} onClick={onClick}>
                Video isn't supported!
                {/* <video>
                    <source src={link} />
                </video> */}
            </div>
        );
    }
    return <img onClick={onClick} className={className} src={link}></img>;
};

export default AttachmentItem;
