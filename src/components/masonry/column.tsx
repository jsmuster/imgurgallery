import { memo } from "react";

const Column: React.FC<{
    width: number;
    children: React.ReactNode;
}> = memo(({ width, children }) => {
    return (
        <div
            style={{
                width,
            }}
            className="column attachment-item-shadow"
        >
            {children}
        </div>
    );
});

export default Column;
