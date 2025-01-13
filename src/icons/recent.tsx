const RecentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g id="Clip path group">
                <mask
                    id="mask0_12164_5052"
                    style={{
                        maskType: "luminance",
                    }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                >
                    <g id="clippath-4">
                        <path id="BoundingBox" d="M0 24L24 24L24 0L0 0L0 24Z" fill="white" />
                    </g>
                </mask>
                <g mask="url(#mask0_12164_5052)">
                    <g id="Group">
                        <path
                            id="Vector"
                            d="M3.22 14C4.13 18.01 7.71 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C8.94 3 6.23 4.53 4.6 6.87L4 8"
                            stroke="#1439B8"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                        <path id="Vector_2" d="M3 2V8H9" stroke="#1439B8" strokeWidth="2" strokeMiterlimit="10" />
                        <path
                            id="Vector_3"
                            d="M12 6V12L16.5 16.5"
                            stroke="#1439B8"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};
export default RecentIcon;
