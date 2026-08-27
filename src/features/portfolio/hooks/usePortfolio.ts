
import { useCallback } from "react";
import { portfolioService } from "../services/portfolio.service";
import type { PortfolioHomeData, PortfolioAboutData } from "../types/portfolio.types";

export function usePortfolio() {
    const getPortfolioData = useCallback(async () => {
        try {
            const response = await portfolioService.getPortfolioData();
            console.log("Portfolio data fetched:", response);
            return response;
        } catch (error) {
            console.error("Error fetching portfolio data:", error);
            throw error;
        }
    }, []);

    const getHomeData = useCallback(async (): Promise<PortfolioHomeData> => {
        try {
            const response = await portfolioService.getHomeData();
            console.log("Home data fetched:", response);
            return response;
        }
        catch (error) {
            console.error("Error fetching home data:", error);
            throw error;
        }
    }, []);

    const getAboutData = useCallback(async (): Promise<PortfolioAboutData> => {
        try {
            const response = await portfolioService.getAboutData();
            console.log("About data fetched:", response);
            return response;
        }
        catch (error) {
            console.error("Error fetching about data:", error);
            throw error;
        }
    }, []);

    return {
        getPortfolioData,
        getHomeData,
        getAboutData
    };
}