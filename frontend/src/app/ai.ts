import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiUrl = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
  private apiKey = '';

  constructor(private http: HttpClient) {}

  generateInsights(content: string) {
  return this.http.post('http://localhost:3000/api/summarize', {
    content: content
  });
}
}