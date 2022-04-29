import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todoList = []
  
  today: number = Date.now();

  constructor(public modalCtlr: ModalController, public todoService:TodoService, private socialSharing: SocialSharing) { 
    this.getAllTask()
  }
  ngOnInit(){

  }

shareTwitter(){
    this.socialSharing.shareViaTwitter('Home of NativeScript', 'https://www.nativescript.org/')
}

/**async shareEmail(){
  this.socialSharing.shareViaEmail('See the New Task on my To Do List!', 'To Do List Task').then(() => {
  }).catch(e => {

  })

 }**/
shareFacebook(){
  this.socialSharing.shareViaFacebook("Facebook", null, null).then(() => {
  }).catch(e => {

  })
 }


  async addNewItem() {
    const modal = await this.modalCtlr.create({
      component: AddNewTaskPage,
    })
    modal.onDidDismiss().then(newTask =>{
      this.getAllTask()
    })
    return await modal.present()
  }

  getAllTask(){
    this.todoList = this.todoService.getAllTasks()
    console.log(this.todoService.getAllTasks());
  }

  delete(key) { 
    this.todoService.deleteTask(key)
    this.getAllTask()
  }

  async update(selectedTask){
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    })

    modal.onDidDismiss().then(()=>{
      this.getAllTask()
    })
    
    return await modal.present()
  }
}
function sShare() {
  throw new Error('Function not implemented.');
}

