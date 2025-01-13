function clsx(...classList: unknown[]): string | undefined {
    const classesList = {
        value: "",
    };
    // Go trough all arguments
    for (const className of classList) {
        // Check if type is string then just add to classList
        if (typeof className === "string") classesList.value += ` ${className}`;
        else if (Array.isArray(className)) {
            // If it's an array then we gonna make recursion
            const newClassesList = clsx(...(className as unknown[]));
            // If it's not empty we gonna add them to the classList
            if (newClassesList) classesList.value += ` ${newClassesList}`;
        } else if (className && typeof className === "object") {
            // If it's an object then check if value is truthy
            for (const [key, value] of Object.entries(className)) {
                // And if it's truthy then add to classlist
                if (!!value === true) classesList.value += ` ${key}`;
            }
        }
    }

    const trimmed = classesList.value.trim();
    return trimmed.length ? trimmed : undefined;
}
export default clsx;
