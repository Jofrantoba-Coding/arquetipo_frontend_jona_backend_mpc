export interface Tab {
    id: string;
    label: string;
    icon: string;
    content: React.ReactNode;
}

export interface UiTabPanelState {
    activeTab: string;
    tabs: Tab[]
}