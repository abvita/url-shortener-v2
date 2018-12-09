import { Component } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private http: Http) { }

  title = 'url-shortener';
  urlData = {
    long:'',
    short:''
  };
  //background color scope variables
  bgColor = '';
  colCount = 0;
  colorArr = ['oneBg', 'twoBg', 'threeBg', 'fourBg'];
  currColor = '';

  //URL shortening function
  shorten(): any {
    let formattedUrl = this.formatUrl(this.urlData.long);
    let request = {url: formattedUrl};
    this.http.post('/api/shorten', request).subscribe(
            (response: any) => {
              let resp = JSON.parse(response._body);
              var resultHTML = '<a href="' + resp.shortUrl + '">'
                  + resp.shortUrl + '</a>';
              this.urlData.short = resp.shortUrl;
          },
          (error: any) => {
            console.log(error);
          });

    //background color cycle script
    this.colCount ++;
      if (this.colCount < this.colorArr.length)
      {
          this.bgColor = this.colorArr[this.colCount];
      } else {
          this.colCount = 0;
          this.bgColor = this.colorArr[this.colCount];
      }
  }

  formatUrl(data: any): any {
    if (data.toLowerCase().includes('http://') || data.toLowerCase().includes('https://')) {
      return data;
    } else {
      let formattedData = 'http://' + data;
      return formattedData;
    }
  }
}
