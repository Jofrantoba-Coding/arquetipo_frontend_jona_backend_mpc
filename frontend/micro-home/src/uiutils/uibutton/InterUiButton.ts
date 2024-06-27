export interface ButtonInterface {
    type: 'button' | 'submit' | 'link';
    text: string;
    icon?: string;
    disabled?: boolean;
    className?: string;
    callback?: () => void;
    href?: string; 
    color?: 'blue' | 'alternative' | 'dark' | 'light' | 'green' | 'red' | 'yellow' | 'purple';
}