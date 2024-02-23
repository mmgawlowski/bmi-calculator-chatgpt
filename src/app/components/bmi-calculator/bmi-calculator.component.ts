import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BmiCalculatorService } from '../../services/bmi-calculator.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-bmi-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './bmi-calculator.component.html',
  styleUrl: './bmi-calculator.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ])
  ]
})
export class BmiCalculatorComponent {
  bmiForm: FormGroup;
  bmi!: number;
  bmiInterpretation = '';
  weatherIcon = '';

  constructor(private bmiCalculatorService: BmiCalculatorService) {
    this.bmiForm = new FormGroup({
      weight: new FormControl(null, [Validators.required, Validators.min(0)]),
      height: new FormControl(null, [Validators.required, Validators.min(0)])
    });
  }

  calculateBMI() {
    if (this.bmiForm.valid) {
      const weight = this.bmiForm.get('weight')!.value;
      const height = this.bmiForm.get('height')!.value;  
      this.bmi = this.bmiCalculatorService.calculateBMI(weight, height);
      this.bmiInterpretation = this.bmiCalculatorService.interpretBMI(this.bmi);
      this.setWeatherIcon(this.bmi);
    }
  }

  private setWeatherIcon(bmi: number) {
    if (bmi < 18.5) {
      this.weatherIcon = 'cloud';
    } else if (bmi >= 18.5 && bmi < 25) {
      this.weatherIcon = 'sun';
    } else if (bmi >= 25 && bmi < 30) {
      this.weatherIcon = 'cloud-sun';
    } else {
      this.weatherIcon = 'cloud-rain';
    }
  }
}
