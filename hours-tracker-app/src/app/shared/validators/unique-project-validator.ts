import { ProjectService } from 'src/app/services/project.service';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';

export function UniqueProjectValidator (projectService: ProjectService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
        return projectService.checkIfProjectExists(control.value).then(exists => {
            const res =  exists ? {'projectExists': true} : null;
            return res;
        });
    };
}


