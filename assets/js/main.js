const domain = 'https://hereis.myyuichiroyamajitododemo.com';
const username = 'rachel.green@gmail.com';
const password = 'e2KZ75xTcYZKy5o8';
const defUserId = '3';
const defIndex = '0';

new Vue({
    el: '#app',
    data() {
        return {
            members: [],
            tasks: [],
            activeUserId: defUserId,
            isUserSelected: defIndex,
            isCheckboxChecked: null,
            taskId: '',
            taskTitle: '',
            taskContent: '',
            editTaskTitle: '',
            editTaskContent: '',
            taskStatus: '',
            taskStatusUpdate: false,
        }
    },
    methods: {
        //--------------------
        // V-ON ACTIONS
        //--------------------
        clickMember(index, id){
            console.log('【ENTER】 clickMember()');
            this.activeUserId = id;
            if(this.isUserSelected === index){
                this.isUserSelected = null;
            }else{
                this.isUserSelected = index;
            }
            this.callApiGetTasks(this.activeUserId);
            console.log('【EXIT】 clickMember()');
        },
        clickAddBtn(){
            console.log('【ENTER】 clickMember()');
            if(!this.taskTitle){
                alert('タスクの追加にタイトルの入力は必須です');
                return;
            }
            this.callApiAddTask();
            console.log('【EXIT】 clickCheckbox()');
        },
        clickCheckbox(index, taskId, event) {
            console.log('【ENTER】 clickCheckbox()');
            this.taskId = taskId;
            if(event.target.checked){
                this.isCheckboxChecked = index;
                this.taskStatus = 1;
            }else{
                this.isCheckboxChecked = null;
                this.taskStatus = 0;
            }
            this.taskStatusUpdate = true;
            this.callApiUpdateTask();
            console.log('【EXIT】 clickCheckbox()');
        },
        clickTaskTitle(taskId, taskTitle, taskContent){
            console.log('【ENTER】 clickTaskTitle()');
            this.taskId = taskId;
            this.editTaskTitle = taskTitle;
            this.editTaskContent = taskContent;
            // this.taskStatus = event.target.parentNode.firstChild.checked;
            $('.modal-init').click();
            console.log('【EXIT】 clickTaskTitle()');
        },
        clickSaveChanges(){
            console.log('【ENTER】 clickSaveChanges()');
            if(!this.editTaskTitle){
                alert('タスクタイトルの入力は必須です');
                return;
            }
            $('.cancel').click();
            this.taskStatusUpdate = false;
            this.callApiUpdateTask();
            console.log('【EXIT】 clickSaveChanges()');
        },
        clickRemoveBtn(taskId, event){
            console.log('【ENTER】 clickRemoveBtn()');
            this.taskId = taskId;
            let parentNode = event.target.parentNode;
            parentNode.remove();
            this.callApiDeleteTask();
            console.log('【EXIT】 clickRemoveBtn()');
        },
        //--------------------
        // API CALL
        //--------------------
        callApiGetUsers(){
            console.log('【ENTER】 callApiGetUsers()');
            axios.get(domain + '/api/users', {
                auth: {username: username, password: password}
            })
            .then(response => (this.members = response.data.data)
            )
            console.log('【EXIT】 callApiGetUsers()');
        },
        callApiGetTasks(){
            console.log('【ENTER】 callApiGetTasks()');
            console.log('user_id:' + this.activeUserId); 
            axios.get(domain + '/api/todo', {
                auth: {username: username, password: password},
                params: {user_id: this.activeUserId}
            })
            .then(response => (this.tasks = response.data.data))
            console.log('【EXIT】 callApiGetTasks()');
        },
        callApiAddTask(){
            console.log('【ENTER】 callApiAddTask()');

            let params = new URLSearchParams();
            params.append('user_id', this.activeUserId);
            params.append('task_title', this.taskTitle);
            params.append('task_content', this.taskContent);
            console.log('user_id:' + this.activeUserId + ' task_title:' + this.taskTitle + ' task_content:' + this.taskContent);

            axios.post(domain + '/api/todo', params, {
                auth: {username: username, password: password}
            })
            .then(response => (this.tasks = response.data.data))

            this.taskTitle = '';
            this.taskContent = '';
            console.log('【EXIT】 callApiAddTask()');
        },
        callApiUpdateTask(){
            console.log('【ENTER】 callApiUpdateTask()');

            let params = new URLSearchParams();
            params.append('user_id', this.activeUserId);
            if(this.taskStatusUpdate){
                params.append('task_status', this.taskStatus);
                console.log('user_id:' + this.userId + 'task_status' + this.taskStatus);
            }else{
                params.append('task_title', this.editTaskTitle);
                params.append('task_content', this.editTaskContent);
                console.log('task_id:' + this.taskId + 'user_id:' + this.activeUserId + ' task_title:' + this.editTaskTitle + ' task_content:' + this.editTaskContent);
            }

            axios.put(domain + '/api/todo/' + this.taskId, params, {
                auth: {username: username, password: password}
            })
            .then(response => (this.tasks = response.data.data))

            console.log('【EXIT】 callApiUpdateTask()');
        },
        callApiDeleteTask(){
            console.log('【ENTER】 callApiDeleteTask()');

            let params = new URLSearchParams();
            params.append('user_id', this.activeUserId);
            console.log('task_id:' + this.taskId + ' user_id:' + this.activeUserId);

            axios.request({
                method: 'delete',
                url: domain + '/api/todo/' + this.taskId,
                auth: {username: username, password: password},
                data: {'user_id': this.activeUserId}
            })
            .then(response => (this.tasks = response.data.data))

            console.log('【EXIT】 callApiDeleteTask()');
        }
    },
    mounted () {
        this.callApiGetUsers();
        this.callApiGetTasks();
    }
})