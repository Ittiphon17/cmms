import type { Asset, AssetStatus } from '../types';
import { seedMockData } from './mockDataSeeder';

seedMockData();

export const assetApi = {
  getAssets: async (): Promise<Asset[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return JSON.parse(localStorage.getItem('cf_assets') || '[]');
  },

  getAssetById: async (id: string): Promise<Asset | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const assets: Asset[] = JSON.parse(localStorage.getItem('cf_assets') || '[]');
    return assets.find((a) => a.id === id) || null;
  },

  createAsset: async (asset: Omit<Asset, 'workOrderCount'>): Promise<Asset> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const assets: Asset[] = JSON.parse(localStorage.getItem('cf_assets') || '[]');
    const newAsset: Asset = {
      ...asset,
      workOrderCount: 0,
    };
    assets.push(newAsset);
    localStorage.setItem('cf_assets', JSON.stringify(assets));
    return newAsset;
  },

  updateAssetStatus: async (id: string, status: AssetStatus): Promise<Asset> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const assets: Asset[] = JSON.parse(localStorage.getItem('cf_assets') || '[]');
    const idx = assets.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error('Asset not found');
    assets[idx].status = status;
    localStorage.setItem('cf_assets', JSON.stringify(assets));
    return assets[idx];
  },
};
