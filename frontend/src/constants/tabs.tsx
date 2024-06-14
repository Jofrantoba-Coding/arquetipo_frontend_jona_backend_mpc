import { Tab } from "../uiutils/uitabpanel/UiTabPanelState";
import { UiDistritoGridImpl } from "../views/uidistritogrid/UiDistritoGridImpl";

export const MENU_TABS: Tab[] = [
    {
      id: 'distritos',
      menuId: 164,
      label: 'Distritos',
      icon: 'Build',
      content: <UiDistritoGridImpl />
    }
]