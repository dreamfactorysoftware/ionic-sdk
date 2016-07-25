import {Component} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {BaseHttpService} from '../../services/base-http';
import {Group} from '../../models/group';
import {GroupService} from '../../services/group';
import {ContactService} from '../../services/contact';
import {NavController, NavParams} from 'ionic-angular';
import {GroupCmp} from '../group/group';

@Component({
	selector: 'group-list',
	templateUrl: 'build/pages/group/group-list.html',
	providers: [GroupService, ContactService, BaseHttpService],
	directives: []
})

export class GroupListCmp {
	public groups: Group[] = [];
	shadowImage: string = 'https://image.freepik.com/free-icon/male-user-shadow_318-34042.png';

	constructor(private groupService: GroupService, private nav: NavController, navParams: NavParams) {
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

	remove(groupId) {
		var self = this;
		this.groupService.remove(groupId)
			.subscribe(() => {
				self.groups = self.groups.filter((item) => {
					return item.id != groupId
				});
			});
	}

	show(groupId) {
		this.nav.push(GroupCmp,{ id: groupId });
	}
}
