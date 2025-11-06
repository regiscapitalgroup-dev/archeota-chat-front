export interface ChatMessageModel {
    type: 'in' | 'out';
    text: string;
    time: string;
    animate: boolean;
}