import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from './ai';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 THIS IS THE FIX
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {

  content: string = '';
  summary: string = '';
  keyPoints: string[] = [];
  headlines: string[] = [];
  loading = false;

  constructor(
    private aiService: AiService,
    private cdr: ChangeDetectorRef
  ) {}

  generateInsights() {
    this.loading = true;

    this.summary = '';
    this.keyPoints = [];
    this.headlines = [];

    this.aiService.generateInsights(this.content).subscribe((res: any) => {

      this.summary = res.summary;
      this.keyPoints = res.keyPoints;
      this.headlines = res.headlines;

      this.loading = false;

      this.cdr.detectChanges();
    });
  }
}