export interface Repository<DTO> {
  findById(id: string): Promise<DTO>;
  exists(t: DTO): Promise<boolean>;
  save(t: DTO): Promise<any>;
  delete(t: DTO): Promise<any>;
}
