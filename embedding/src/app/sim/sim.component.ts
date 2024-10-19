import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sim',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sim.component.html',
  styleUrl: './sim.component.css'
})
export class SimComponent {
  api = 'http://127.0.0.1:5000/similarity';
  private httpClient = inject(HttpClient);

  input = signal<string>("This is just an example");

  texts = signal<string[]>(["I like playing soccer", "Python programming is simple", "A child painting a picture"]);
  similarities = signal<number[]>(new Array(this.texts().length).fill(0));
  validations = signal<string[]>(new Array(this.texts().length).fill(""));

  callApi(text1: string, text2: string): Promise<{ similarity: number }> {
    return firstValueFrom(this.httpClient.post<{ similarity: number }>(this.api, { "text1": text1, "text2": text2 }));
  }

  async calculate() {
    for (let i = 0; i < this.texts().length; i++) {
      const response = await this.callApi(this.input(), this.texts()[i]);
      this.similarities()[i] = response.similarity;
      if (response.similarity > 600) {
        this.validations()[i] = "valid";
      } else {
        this.validations()[i] = "invalid";
      }
    }
  }
}
