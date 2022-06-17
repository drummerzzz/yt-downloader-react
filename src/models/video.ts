
export interface Video {
    title: string
    resolution: string
    url: string
    expiration: string
    extention: string
    size: number
}


export interface VideoInfo {
    title: string
    thumbnail_url: string
    description?: string
    publish_date?: string
    rating?: number | null
    resolutions: Video[]
}
