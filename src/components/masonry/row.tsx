import { memo } from "react";

const Row: React.FC<{
    height: number;
    children: React.ReactNode;
}> = memo(({ height, children }) => {
    return (
        <div
            style={{
                height,
            }}
            className="row"
        >
            {children}
        </div>
    );
});

export default Row;
