export type PortfolioSocialMediaLinks = {
	github?: string;
	linkedin?: string;
	instagram?: string;
};

export type PortfolioHomeData = {
	greeting?: string;
	name?: string;
	passions?: string[];
	description?: string;
	logo_path?: string;
	logo_url?: string;
	social_media_links?: PortfolioSocialMediaLinks;
	created_at?: string;
	updated_at?: string;
};

export type PortfolioAboutData = {
    description?: string;
    image_path?: string;
    cv_path?: string;
    created_at?: string;
    updated_at?: string;
    image_url?: string;
    cv_url?: string;
}
