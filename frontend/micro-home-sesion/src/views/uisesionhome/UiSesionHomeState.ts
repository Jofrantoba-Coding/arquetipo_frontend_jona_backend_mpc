import { MenuItem } from "../../uiutils/uimenubar/InterUiMenuBar";
import { Tab } from "../../uiutils/uitabpanel/UiTabPanelState";
import { UiTitleBarUser } from "../../uiutils/uititlebar/InterUiTitleBar";

export interface UiSesionHomeState {
    menuData: MenuItem[];
    profileData: UiTitleBarUser | null;
    loading: boolean;
    tabsData: Tab[];
}
