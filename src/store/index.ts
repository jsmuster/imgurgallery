import { create } from "zustand";
import { $gallery, $generate_description, $search, SearchRequestQuery } from "../api";
import { immer } from "zustand/middleware/immer";
import { ImageDescription, ImgurGalleryItem } from "../types/imgur";

type StoreType = {
    /** List of albums after the search request */
    items: Array<ImgurGalleryItem>;

    /** Set Imgur album */
    set_item: (data: ImgurGalleryItem) => void;

    /** active album */
    active: null | string;

    /** full screen image */
    fullscreen: string | null;

    /** set active album */
    set_active: (id: string | null) => void;

    /** set active full screen image */
    set_fullscreen: (image: string | null) => void;

    /** method to retrieve albums from imgur */
    search: (query: SearchRequestQuery) => void;

    /** description generated via OpenAI  */
    descriptions: Record<string, ImageDescription>;
    /** method for generating a description and keywords */
    generate_descriptions: (id: string, link: string) => Promise<ImageDescription>;
};

export const useAppStore = create<StoreType>()(
    immer((set, get) => ({
        items: [],
        active: null,
        fullscreen: null,
        search: async (query: SearchRequestQuery) => {
            const { data } = await $search(query);
            set((prev) => {
                prev.items = data;
            });
        },
        set_fullscreen: (image) => {
            set((prev) => {
                if (image === null) {
                    prev.fullscreen = null;
                } else prev.fullscreen = image;
            });
        },
        set_active: (id) => {
            set((prev) => {
                prev.active = id;
            });
        },
        get_gallery: async () => {
            const { data } = await $gallery();
            set((prev) => {
                prev.items = data;
            });
        },
        set_item: async (item: ImgurGalleryItem) => {
            set((prev) => {
                const index = prev.items.findIndex((v) => v.id === item.id);
                if (index > -1) prev.items[index] = item;
                else prev.items.push(item);
            });
        },

        descriptions: {},
        generate_descriptions: async (id, link) => {
            const store = get();
            if (store.descriptions[id]) return store.descriptions[id];
            const response = await $generate_description([link]).catch(() => null);
            const status = response === null ? ("failed" as const) : ("ok" as const);
            const description = {
                id,
                link,
                status,
                keywords: response?.keywords ?? [],
                description: response?.description ?? "",
            };
            set((prev) => {
                prev.descriptions[id] = description;
            });

            return description;
        },
    }))
);
