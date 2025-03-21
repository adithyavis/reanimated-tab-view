export type Route = {
  key: string;
  title?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};

export type Scene = {
  route: Route;
};

export type NavigationState = {
  index: number;
  routes: Route[];
};

export type Layout = {
  width: number;
  height: number;
};

export type SceneRendererProps = {
  route: Route;
};
