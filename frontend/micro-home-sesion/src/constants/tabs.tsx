import React from "react";
import { Tab } from "../uiutils/uitabpanel/UiTabPanelState";
import UiDistritoGrid from "microMantenimiento/UiDistritoGrid";

export const MENU_TABS: Tab[] = [
    {
      id: 'distritos',
      menuId: 164,
      label: 'Distritos',
      icon: 'Build',
      content: <UiDistritoGrid/>
    }
]