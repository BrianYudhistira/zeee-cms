import apiClient from "@/shared/utils/apiClient";
import type { PortfolioAboutData, PortfolioHomeData } from "../types/portfolio.types";

export const portfolioService = {
    async getPortfolioData() {
        const response = await apiClient.get("/api/portfolio");
        console.log("Portfolio data fetched:", response.data);
        return response.data;
    },

    async getHomeData(): Promise<PortfolioHomeData> {
        const response = await apiClient.get("/api/portfolio/home");
        console.log("Home data fetched:", response.data);
        return response.data;
    },

    async getAboutData(): Promise<PortfolioAboutData> {
        const response = await apiClient.get("/api/portfolio/about");
        console.log("About data fetched:", response.data);
        return response.data;
    }
}