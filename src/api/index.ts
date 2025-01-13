import queryString from "query-string";

import { CLIENT_ID } from "../constants";
import { APIResponse, ImgurGalleryItem } from "../types/imgur";
const IMGUR_BASE_URL = "https://api.imgur.com/3/gallery";
const BASE_URL = "http://localhost:2020";

export type SearchRequestQuery = {
    q_all?: string;
    q_any?: string;
    q_exactly?: string;
    q_not?: string;
    q_type?: "jpg" | "png" | "gif" | "anigif" | "album";
    q_size_px?: string;
};
export const $search = async (data: SearchRequestQuery) => {
    const request = await fetch(
        queryString.stringifyUrl({
            url: IMGUR_BASE_URL + "/search",
            query: data,
        }),
        {
            headers: {
                Authorization: "Client-ID " + CLIENT_ID,
            },
        }
    );
    const body = (await request.json()) as APIResponse;
    return body;
};

export const $gallery = async (type = "hot") => {
    const request = await fetch(IMGUR_BASE_URL + "/" + type, {
        headers: {
            Authorization: "Client-ID " + CLIENT_ID,
        },
    });
    const body = (await request.json()) as APIResponse;
    return body;
};
export const $get_album = async (hash: string) => {
    const request = await fetch(IMGUR_BASE_URL + "/album/" + hash, {
        headers: {
            Authorization: "Client-ID " + CLIENT_ID,
        },
    });
    const body = (await request.json()) as APIResponse<ImgurGalleryItem>;
    return body;
};

export const $generate_description = async (ids: Array<string>) => {
    const request = await fetch(BASE_URL + "/generate", {
        body: JSON.stringify({
            images: ids,
        }),
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const body = (await request.json()) as {
        description: string;
        keywords: string[];
    };
    return body;
};
