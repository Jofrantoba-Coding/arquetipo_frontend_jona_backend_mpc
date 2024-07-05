import React, { Suspense } from "react";
import { Tab } from "../uiutils/uitabpanel/UiTabPanelState";
import ErrorBoundary from "../ErrorBoundary";

const FallbackLoading: React.FC = () => <div>Cargando...</div>;
const FallbackError: React.FC = () => <div>Error al cargar el microservicio. Por favor, intenta más tarde.</div>;

const UiDistritoGrid = React.lazy(() => import("microMantenimiento/UiDistritoGrid"));

export const MENU_TABS: Tab[] = [
  {
    id: 'distritos',
    menuId: 164,
    label: 'Distritos',
    icon: 'Build',
    content: (
      <ErrorBoundary fallback={<FallbackError />}>
        <Suspense fallback={<FallbackLoading />}>
          <UiDistritoGrid />
        </Suspense>
      </ErrorBoundary>
    )
  }
];