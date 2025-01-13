import { useEffect, useMemo, useState } from "react";
import { AnyImage } from "../types/imgur";

const ROW_HEIGHT = 300;
const INIT_WIDTH = 500;

const create_group = (boxes: Array<AnyImage>, width: number, index = 0) => {
    // initialize an empty group
    const group = [];

    for (let i = index; i < boxes.length; i++) {
        const { abs } = Math;

        // calculate the current width of a group
        const currentWidth = group.reduce((acc, { width }) => acc + width, 0);

        // check if the width wil fit an image
        if (width - currentWidth > 0) {
            // if so then add the element into the group
            group.push(boxes[i]);
        } else {
            // if adding an image into the group exceeds width
            // remove the first element to check
            const withoutLast = group.filter((_, groupIndex) => groupIndex !== group.length - 1);

            // calculate the difference between the full width and current groups
            const withLastDiff = abs(width - group.reduce((acc, { width }) => acc + width, 0));
            const withoutLastDiff = abs(width - withoutLast.reduce((acc, { width }) => acc + width, 0));

            if (withLastDiff < withoutLastDiff) {
                // return a group with last element
                return { group, index: i };
            } else {
                // return the group without the last element
                return { group: withoutLast, index: i - 1 };
            }
        }
    }

    // if all elements are processed return a group and last index
    return { group, index: boxes.length - 1 };
};

// This turns an array into groups that fit the current width
const collect_groups = ({ boxes, width }: { boxes: Array<AnyImage>; width: number }) => {
    // initial index used for grouping
    let initialIndex = 0;
    if (boxes.length === 1) {
        // if only 1 element, return it
        return [boxes];
    }

    const groups = [];
    
    while (initialIndex < boxes.length - 1) {
        // create a group starting with the initial index
        const { index, group } = create_group(boxes, width, initialIndex);

        groups.push(group); // Add a group into an array
        initialIndex = index; // Update index for next iteration
    }
    return groups;
};

const useMasonry = (images: Array<AnyImage>, container: HTMLDivElement) => {
    // container width
    const [width, setWidth] = useState(INIT_WIDTH);

    const ratioImages = useMemo(
        () =>
            images.map(({ width, height, ...rest }) => ({
                // set height = ROW_HEIGHT, which is 300px currently
                height: ROW_HEIGHT,
                // and then relative to height calculate the width
                width: (width * ROW_HEIGHT) / height,
                link: rest.link,
                type: rest.type,
                id: rest.id,
            })),
        [images]
    );

    useEffect(() => {
        const handleWindowResize = () => {
            // Using this method we get width of an element using getBoundingClientRect
            // getBoundingClientRect - this method calculates the position and size of an element and returns dimensions in pixels
            // container.width wont work since its width is 100%, but this method returns exact dimensions
            if (container) setWidth(container.getBoundingClientRect().width);
        };

        // window resize handler
        window.addEventListener("resize", handleWindowResize);

        // execute the handler immediately
        handleWindowResize();

        return () => {
            // При unmount мы удаляем подписку на событие resize
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [container]);

    const groups = useMemo(() => {
        // Create groups with the help of collect_groups method

        const group = collect_groups({ boxes: ratioImages, width });

        // if there is only 1 image then handle the logic different
        if (ratioImages.length === 1) {
            const item = ratioImages[0];
            return [
                [
                    {
                        ...item,
                        height: ROW_HEIGHT,
                        width: (item.width * ROW_HEIGHT) / ROW_HEIGHT,
                    },
                ],
            ];
        }

        // Create each group
        return group.map((group) => {
            // Summarize width of elements in a group
            const groupSum = group.reduce((acc, { width }) => acc + width, 0);

            // Calculate height
            const neededHeight = (ROW_HEIGHT * width) / groupSum;

            return group.map(({ width, height, ...rest }) => {
                return {
                    width: (width * neededHeight) / height, // figure out proportional width
                    height: neededHeight,
                    ...rest,
                };
            });
        });
    }, [width, ratioImages]);
    return groups;
};

export default useMasonry;
