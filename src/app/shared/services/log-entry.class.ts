export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

export class LogEntry {
  // Public Properties
    public entryDate: Date = new Date();
    public message = '';
    public level: LogLevel = LogLevel.Debug;
    public extraInfo: any[] = [];
    public logWithDate = true;

    public buildLogString(): string {
      let ret = '';

      if (this.logWithDate) {
        ret = new Date() + ' - ';
      }

      ret += 'Type: ' + LogLevel[this.level];
      ret += ' - Message: ' + this.message;
      if (this.extraInfo.length) {
        ret += ' - Extra Info: ' + this.formatParams(this.extraInfo);
      }
      return ret;
    }

    private formatParams(params: any[]): string {
      let ret: string = params.join(',');

      // Is there at least one object in the array?
      // tslint:disable-next-line: triple-equals
      if (params.some(p => typeof p == 'object')) {
        ret = '';
        // Build comma-delimited string
        // tslint:disable-next-line: prefer-const
        for (let item of params) {
          ret += JSON.stringify(item) + ',';
        }
      }
      return ret;
    }
}
