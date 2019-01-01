new Vue({
    el: '#CRUD',
    created(){
       this.getKeeps();
   },
   data:{
       keeps:[ ],
       newKeep: '',
       fillKeep:{ id:'', keep:'' },
       pagination:{
        'total': 0,
        'current_page':0,
        'per_page' :0,
        'last_page':0,
        'from':0,
        'to':0
       },
       errors: [],
       offset: 3,
   },

   computed:{
    isActived: function() {
        return this.pagination.current_page;
    },
    pagesNumber: function() {
        if(!this.pagination.to){
            return [];
        }

        var from = this.pagination.current_page - this.offset;
        if(from < 1){
            from = 1;
        }

        var to = from + (this.offset * 2);
        if(to >= this.pagination.last_page){
            to = this.pagination.last_page;
        }

        var pagesArray = [];
        while(from <= to){
            pagesArray.push(from);
            from++;
        }
        return pagesArray;
    }
   },
   methods:{
       getKeeps(page){
           var urlKeeps = 'tasks?page=' + page;

           axios.get(urlKeeps).then(response =>{
               this.keeps = response.data.tasks.data,
               this.pagination = response.data.pagination
           });
       },

       editKeep(keep){
        this.fillKeep.id = keep.id;
        this.fillKeep.keep = keep.keep;

        $('#edit').modal('show')
       },

       updateKeep(id){
        var url='tasks/' + id;

        axios.put(url, this.fillKeep).then(response => {
            this.getKeeps();
            this.fillKeep = {id:'',keep:''};
            this.errors= [];
            $('#edit').modal('hide');
            toastr.success('Tarea actualizado con exito');
        }).catch(error => {
            this.errors = error.response.data
        });
       },

       deleteKeep(keep){
           var url = 'tasks/'+keep.id;

           axios.delete(url).then(response => {
                this.getKeeps();
                toastr.error('Eliminado correctamente');
           });
       },

       createKeep(){
           var url='tasks/';
           axios.post(url, {
               keep: this.newKeep
           }).then(response => {
               this.getKeeps();
               this.newKeep='';
               this.errors= [];
               $('#create').modal('hide');
               toastr.success('Nueva tarea creada con exito');
           }).catch(error => {
               this.error = error.response.data
           })
       },
       changePage(page) {
        this.pagination.current_page = page;
        this.getKeeps(page);
    }
   }
})
