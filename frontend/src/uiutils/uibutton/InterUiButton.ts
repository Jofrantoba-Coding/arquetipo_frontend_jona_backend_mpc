export interface ButtonInterface {
    type: 'button' | 'submit' | 'link';
    text: string;
    icon?: string;
    callback?: () => void;
    href?: string; 
}