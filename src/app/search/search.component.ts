import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  searchTearm:string ="";
  constructor(private route:ActivatedRoute , private router:Router) { }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      if (params['searchTearm'])
      this.searchTearm = params['searchTearm'];
    })
  }

  search():void{
    if(this.searchTearm)
    this.router.navigateByUrl('/search/' + this.searchTearm)
  }
}
