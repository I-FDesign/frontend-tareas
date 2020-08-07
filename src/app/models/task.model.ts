export class Task {
  constructor(
    public id?: string,
    public title?: string,
    public priority = '',
    public expiration?: any,
    public expirationHour?: string,
    public userId?: string
  ) {}
}
