export interface Tab {
    id: string;
    menuId: number;
    label: string;
    icon: string;
    content: React.ReactNode;
}

export interface UiTabPanelState {
    activeTab: string;
    tabs: Tab[]
}