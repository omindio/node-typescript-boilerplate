export interface Repository<T> {
  findByUuid(uuid: string): Promise<T>;
  exists(t: T): Promise<boolean>;
  create(t: T): Promise<any>;
  update(uuid: string, t: T): Promise<any>;
  delete(t: T): Promise<any>;
}
