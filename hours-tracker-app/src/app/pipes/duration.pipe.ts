import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duration',
  pure: false
})
export class DurationPipe implements PipeTransform {

  transform(value: any, args?: any): any { // value in seconds
    const totalSeconds = value;
    const totalMinutes = Math.floor(totalSeconds / 60 );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    return this.pad(hours) + ' : ' + this.pad(minutes) + ' : ' + this.pad(seconds);
  }

  private pad(digit: any): string {
    return digit < 10 ? '0' + digit : digit;
  }
}
