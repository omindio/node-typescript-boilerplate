export interface Api {
  init(): Promise<void>;
  loadRoutes(): Promise<void>;
  seed(): Promise<void>;
}
