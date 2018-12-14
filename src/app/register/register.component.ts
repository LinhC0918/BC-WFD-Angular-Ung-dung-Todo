import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

function comparePassword(compare: AbstractControl) {
    const value = compare.value;
    return (value.password === value.confirmPassword) ? null : {
        passwordnotmatch: true
    };
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            pwGroup: this.formBuilder.group({
                password: '',
                confirmPassword: ''
            }, {validator: comparePassword})
        });

        this.registerForm.patchValue({
            email: 'info@example.com'
        });
    }

    onSubmit() {
    }

}
