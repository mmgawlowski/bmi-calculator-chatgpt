import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-bmi-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bmi-calculator.component.html',
  styleUrl: './bmi-calculator.component.css'
})
export class BmiCalculatorComponent {
  bmiForm: FormGroup;
  bmi!: number;
  bmiInterpretation!: string;
  weatherIcon!: string;

  constructor() {
    this.bmiForm = new FormGroup({
      weight: new FormControl(null, [Validators.required, Validators.min(0)]),
      height: new FormControl(null, [Validators.required, Validators.min(0)])
    });
  }

  calculateBMI() {
    if (this.bmiForm.valid) {
      const weight = this.bmiForm.get('weight')!.value;
      const height = this.bmiForm.get('height')!.value;

      this.bmi = weight / ((height / 100) * (height / 100));
      this.interpretBMI(this.bmi);
    }
  }

  interpretBMI(bmi: number) {
    if (bmi < 18.5) {
      this.bmiInterpretation = 'Underweight';
      this.weatherIcon = 'cloud-sun';
    } else if (bmi >= 18.5 && bmi < 25) {
      this.bmiInterpretation = 'Normal weight';
      this.weatherIcon = 'sun';
    } else if (bmi >= 25 && bmi < 30) {
      this.bmiInterpretation = 'Overweight';
      this.weatherIcon = 'cloud';
    } else {
      this.bmiInterpretation = 'Obese';
      this.weatherIcon = 'cloud-rain';
    }
  }
}
