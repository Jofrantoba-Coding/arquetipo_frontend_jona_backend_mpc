export interface ButtonInterface {
    type: 'button' | 'submit'
    text: string;
    callback?: () => void
}
