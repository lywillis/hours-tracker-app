import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export function LogDatesValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors | null => {
        const start = group.get('start');
        const end = group.get('end');
        if ((start && end) && (start.value >= end.value)) {
            return {start: 'start date should be less than end date'};
        }
        return null;
    };
}
