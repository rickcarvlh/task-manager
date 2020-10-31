import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  getLists() {
    return this.webReqService.get('lists');
  }

  getTask(listId: string) {
    // ! reason -> it's part of route comming from the backend
    return this.webReqService.get(`lists/${listId}/tasks`);
  }


  createList(title: string) {
    // we want send a web request creat a list
    return this.webReqService.post('lists', { title });
  }

  createTask(title: string, listId: string) {
    // we want send a web request creat a list
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }


}
