import { Item } from './ItemModel';

export interface searchResult {
    total_count: number;
    incomplete_results: boolean;
    items:Item[];
}