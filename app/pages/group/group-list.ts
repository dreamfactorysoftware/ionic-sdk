import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { BaseHttpService } from '../../services/base-http';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group';
import { ContactService } from '../../services/contact';
import { NavController, NavParams } from 'ionic-angular';
import { GroupCmp } from '../group/group';
import { LoginCmp } from '../login/login';
import { OrderByPipe  } from "../../models/OrderBy"

@Component({
    templateUrl: 'build/pages/group/group-list.html',
    providers: [GroupService, ContactService, BaseHttpService],
    pipes: [OrderByPipe]
})

export class GroupListCmp {
    public groups: Group[] = [];
    shadowImage: string = 'https://image.freepik.com/free-icon/male-user-shadow_318-34042.png';

    constructor(private groupService: GroupService, private nav: NavController, navParams: NavParams) {
        var token = localStorage.getItem('session_token');
        if (token =='' || token == null) {
            this.logout(); 
        }
        this.getList();
    }

    getList() {
        let self = this;
        let params = new URLSearchParams();
        params.set('order', 'name+ASC');
        this.groupService.query(params)
            .subscribe((groups: Group[]) => {
                self.groups = groups
            });
    }
    logout() {
        localStorage.setItem('session_token', '');
        this.nav.setRoot(LoginCmp);
    }
    remove(groupId) {
        var token = localStorage.getItem('session_token');
        if (token =='' || token == null) {
            this.logout(); 
        }
        var self = this;
        this.groupService.remove(groupId)
            .subscribe(() => {
                self.groups = self.groups.filter((item) => {
                    return item.id != groupId
                });
            });
    }

    show(groupId) {
        this.nav.push(GroupCmp, { id: groupId });
    }

    createGroup() {
        this.nav.push(GroupCmp);
    }
}
