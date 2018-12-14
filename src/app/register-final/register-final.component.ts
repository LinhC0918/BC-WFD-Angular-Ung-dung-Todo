import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

function comparePassword(compare: AbstractControl) {
    const value = compare.value;
    return (value.password === value.confirmPassword) ? null : {passwordnotmatch: true};
}

@Component({
    selector: 'app-register-final',
    templateUrl: './register-final.component.html',
    styleUrls: ['./register-final.component.scss']
})
export class RegisterFinalComponent implements OnInit {
    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            pwGroup: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
            }, {validator: comparePassword}),
            country: ['', Validators.required],
            age: ['', [Validators.required, Validators.min(18)]],
            gender: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern(/^\+84\d{9,10}$/)]]
        });
        this.registerForm.patchValue({
            email: 'abc@codegym.com'
        });
    }

    onSubmit() {
        console.log(this.registerForm);
    }

}
