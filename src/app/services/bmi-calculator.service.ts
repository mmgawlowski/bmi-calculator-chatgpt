import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BmiCalculatorService {

  constructor() { }

  calculateBMI(weight: number, height: number): number {
    return weight / ((height / 100) * (height / 100));
  }

  interpretBMI(bmi: number): string {
    if (bmi < 18.5) {
      return 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      return 'overweight';
    } else {
      return 'obesity';
    }
  }
}