export class Url {
  constructor(
    public id: string,
    public url: string,
    public shortCode: string,
    public accessCount: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  incrementAccessCount() {
    this.accessCount++;
  }
}