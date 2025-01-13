export interface APIResponse<T = Array<ImgurGalleryItem>> {
    data: T;
    status: number;
    success: boolean;
}
export interface ImgurGalleryItem {
    id: string;
    title: string | null;
    description: string | null;
    datetime: number; // Unix timestamp
    type: string | null; // MIME type (e.g., "image/jpeg", "video/mp4") - only present if is_album is false
    animated: boolean; // Only relevant if is_album is false
    width: number; // Only relevant if is_album is false
    height: number; // Only relevant if is_album is false
    size: number; // Only relevant if is_album is false
    views: number;
    bandwidth: number; // Bandwidth used
    vote: string | null; // User vote: "up" | "down" | null
    favorite: boolean;
    nsfw: boolean | null; // Not Safe For Work
    section: string | null; // Section (e.g., "funny", "aww")
    account_url: string | null; // Username of uploader
    account_id: number | null; // User ID of uploader
    is_ad: boolean; // Whether it's an advertisement
    in_most_viral: boolean; // Included in most viral
    has_sound: boolean; // Whether it includes sound (only for videos)
    tags: ImgurTag[];
    ad_type: number | null;
    ad_url: string | null;
    in_gallery: boolean; // Whether it is in the gallery
    link: string; // URL to the image/album
    comment_count: number;
    favorite_count: number;
    ups: number; // Upvotes
    downs: number; // Downvotes
    points: number; // Net points (ups - downs)
    score: number; // Score (e.g., algorithm-based)
    is_album: boolean; // Indicates if the item is an album
    images_count?: number; // Present only if is_album is true
    images?: ImgurImage[]; // Array of images if is_album is true
}
export interface ImgurImage {
    id: string;
    title: string | null;
    description: string | null;
    datetime: number; // Unix timestamp
    type: string; // MIME type (e.g., "image/jpeg", "video/mp4")
    animated: boolean;
    width: number;
    height: number;
    size: number; // Size in bytes
    views: number;
    bandwidth: number;
    vote: string | null; // User vote: "up" | "down" | null
    favorite: boolean;
    nsfw: boolean | null; // Not Safe For Work
    link: string; // Direct URL to the image
    has_sound?: boolean; // Only relevant for videos
    tags?: ImgurTag[]; // Optional, if provided for the individual image
}

export type AnyImage = {
    id: string;
    link: string;
    type: string;
    width: number;
    height: number;
};

// Tag Data
interface ImgurTag {
    name: string;
    display_name: string;
    followers: number;
    total_items: number;
    following: boolean;
    is_whitelisted: boolean;
    background_hash: string;
    thumbnail_hash: string | null;
    accent: string | null;
    background_is_animated: boolean;
    thumbnail_is_animated: boolean;
    is_promoted: boolean;
    description: string | null;
}

export interface ImageDescription {
    id: string;
    description: string;
    status: "ok" | "failed";
    link: string;
    keywords: string[];
}