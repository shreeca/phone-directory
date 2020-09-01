import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from '../post.model';

@Component({
  selector: 'app-phone-directory',
  templateUrl: './phone-directory.component.html',
  styleUrls: ['./phone-directory.component.css']
})
export class PhoneDirectoryComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  @ViewChild('f') directoryForm: NgForm;
  // relationship = ['family', 'friend'];
  loadedPost: Post[] = [];
  // contactName = {
  //   username: '',
  //   PhoneNumber: ''
  // };
  submitted = false;

  onSubmit(postData: Post) {
    console.log(this.directoryForm);
    this.submitted = true;
    this.directoryForm.reset();
    this.http.post<{name: string}>('https://phone-directory-fa217.firebaseio.com/posts.json', postData)
      .subscribe(responseData => {
        // console.log(responseData);
      });
  }
  ngOnInit(){
    this.fetchPosts();
  }

  onFetchPosts(){
    this.fetchPosts();
  }

  onClearPosts(){

  }

  private fetchPosts(){
    this.http.get<{[key: string]: Post}>('https://phone-directory-fa217.firebaseio.com/posts.json')
      .pipe(map((responseData: {[key: string]: Post}) => {
      const postsArray: Post [] = [];
      for (const key in responseData){
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key], id: key});
        }
      }
      return postsArray;
    }))
      .subscribe(posts => {
      this.loadedPost = posts;
        // console.log(posts);
    });
}
}
