export interface postDataSchema {
    id: string;
    url: string[];
    title: string;
    posPrompt: string;
    negPrompt: string;
    model: string;
    sampler: string;
    sdVersion: string;
    view: number;
    createdAt: any;
}