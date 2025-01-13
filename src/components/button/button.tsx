import clsx from "../../classNames";
import "./button.css";

export interface ButtonProps {
    children: React.ReactNode;
    left?: React.ReactNode;
    color?: string;
    className?: string;
    size?: "40";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { left, children, color, className, size, onClick } = props;

    return (
        <button
            className={clsx(
                "btn font-button-m",
                color ? `btn--${color}` : null,
                size ? `size--${size}` : null,
                className
            )}
            onClick={onClick}
        >
            {left && <div className="btn-left">{left}</div>}
            <div className="btn-content">{children}</div>
        </button>
    );
};

export default Button;
