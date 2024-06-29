export interface Tab {
    id: string;
    menuId: number;
    label: string;
    icon: string;
    content: any;
}

export interface UiTabPanelState {
    activeTab: string;
    tabs: Tab[]
}