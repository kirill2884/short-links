import ShortLinkInterface from "../services/interfaces/ShortLinkInterface";
import { ShortLinkService } from "../services/ShortLinkService";
import config from '../config/main.json'
import AnalyticsInterface from "../services/interfaces/AnaliticsInterface";
import { AnalyticsService } from "../services/AnalyticsService";

  
  
export const shortLinkService:ShortLinkInterface = new ShortLinkService(config.serverUrl)
export const analyticsService:AnalyticsInterface = new AnalyticsService(config.serverUrl)