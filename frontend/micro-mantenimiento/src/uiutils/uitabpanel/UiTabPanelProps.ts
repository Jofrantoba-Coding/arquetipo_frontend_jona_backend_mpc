/* Interfaces */
import { Tab } from "./UiTabPanelState";

export interface UiTabPanelProps {
    data: Tab[];
    callback: (id: string) => void;
}