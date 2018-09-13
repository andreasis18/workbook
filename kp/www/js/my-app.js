    // Initialize app
var myApp = new Framework7({
    pushState: true,
    swipeBackPage: false,
    preloadPreviousPage: false,
    panel: {swipe:'left'},
    sortable: {
    moveElements: true
    }
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
//var directory= 'http://localhost/kp/server/projectkp.php';
var directory='http://admingpb.000webhostapp.com/projectkp.php'; //tmpat php aplikasi

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


function hapusLocalAll(){
    localStorage.removeItem('username');
    localStorage.removeItem('jabatan');
    localStorage.removeItem('tenda');
    localStorage.removeItem('bus');
    localStorage.removeItem('nama_kelompok');
    localStorage.removeItem('nama_mhs');
	localStorage.removeItem('nrp_mhs');
} //buat hapus smua local storage

var tenda=0;
var bus=0;
var nama_kelompok="";
var nama_mhs="";
var nrp_mhs="";


var gelombangFasilitator=["cek","koneksi","internet","keluar","dan","login","kembali","thanks"];
var KelompokFasilitator=["cek","koneksi","internet","keluar","dan","login","kembali","thanks"];
var mhsFasilitator=["cek","koneksi","internet","keluar","dan","login","kembali","thanks"];

var judulModul=[["MY BIG DREAM"],
["MY LIFE LIST"],
["OUTDOOR ACTIVITY"],
["STUDI KASUS"],
["PENGALAMAN PRIBADI"],
["PERSONAL DEVELOPMENT PLAN"],
["FISHBONE"],
["KISAH ENTONG"],
["LESSON LEARNED"],
["REFLEKSI MINI PROJECT"]
];

var nrp="";
var password="";


myApp.onPageInit('index', function (page) {
    $$('#myBigDreamSide').html(judulModul[0]);
    $$('#myLifeListSide').html(judulModul[1]);
    $$('#outdoorSide').html(judulModul[2]);
    $$('#manajemenEmosiSide').html(judulModul[3]);
    $$('#manajemenEmosi2Side').html(judulModul[4]);
    $$('#actionPlanSide').html(judulModul[5]);
    $$('#fishboneSide').html(judulModul[6]);
    $$('#kisahEntongSide').html(judulModul[7]);
    $$('#lessonLearnedSide').html(judulModul[8]);
    $$('#refleksiMiniSide').html(judulModul[9]);

    $$('#menuAwal').on('click',function(){
        mainView.router.loadPage("menu.html");
        myApp.closePanel();
    });

    $$('#myBigDreamSide').on('click',function(){
        mainView.router.loadPage("pilihBigDream.html");
        myApp.closePanel();
    });

    $$('#kisahEntongSide').on('click',function(){
        mainView.router.loadPage("pilihEntong.html");
        myApp.closePanel();
    });

    $$('#manajemenEmosiSide').on('click',function(){
        mainView.router.loadPage("pilihManajemenEmosi.html");
        myApp.closePanel();
    });

    $$('#refleksiMiniSide').on('click',function(){
        mainView.router.loadPage("refleksiMini.html");
        myApp.closePanel();
    });

    $$('#fishboneSide').on('click',function(){
        mainView.router.loadPage("fishbone.html");
        myApp.closePanel();
    });

    if(page='index'){
        if(JSON.parse(localStorage.getItem("username"))&&JSON.parse(localStorage.getItem("jabatan")))
        {
            if(JSON.parse(localStorage.getItem("jabatan"))=='fasilitator')
                mainView.router.loadPage('pilihGelombangFasilitator.html');
            else if(JSON.parse(localStorage.getItem("jabatan"))=='mahasiswa')
                mainView.router.loadPage('menu.html');            
        }
        else{
            myApp.hideNavbar($$('.navbar'));
        }
    }

    $$('#logout').on('click',function(){
        myApp.confirm('Anda akan logout dari aplikasi', 'Apakah Anda Yakin?', function () {
            hapusLocalAll();
            myApp.closePanel();
            mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
        });
    });

    $$('#btnMasuk').on('click',function(){
    	var pilihan = document.getElementById("jabatan");
    	password = document.getElementById("password").value;
    	var username = document.getElementById("username");
    	

        $$.post(directory,{opsi:"loginMhs", nrp:username.value,password:password},function(data){
            if(data=="berhasil") //cek ada atau tdk id server
            {
                $$.post(directory,{opsi:"getBisTenda", nrp:username.value},function(data){
                    var tendaBisTemp=JSON.parse(data);
                    mainView.router.loadPage('menu.html');
                    localStorage.setItem("tenda",JSON.stringify(tendaBisTemp['tenda']));
                    localStorage.setItem("bus",JSON.stringify(tendaBisTemp['bus']));
                    localStorage.setItem("nama_kelompok",JSON.stringify(tendaBisTemp['nama_kelompok']));
                    localStorage.setItem("nama_mhs",JSON.stringify(tendaBisTemp['nama']));
                    localStorage.setItem("nrp_mhs",JSON.stringify(tendaBisTemp['id_nrp']));
                    localStorage.setItem("password",JSON.stringify(password));
                    localStorage.setItem("username",JSON.stringify(username.value));
                    localStorage.setItem("jabatan",JSON.stringify('mahasiswa')); 
                });
                mainView.router.loadPage("menu.html");
            }
            else
            {
                console.log(data);
                myApp.alert("Data login tidak ditemukan","Error");
            }   
        })
    });
}).trigger();



myApp.onPageInit('menu', function (page) {
    myApp.showNavbar($$('.navbar'));
    var mySwiper1 = myApp.swiper('.swiper-container', {
                      pagination:'.swiper-pagination',
                      paginationHide: false,
                      autoplay:4000,
                      spaceBetween: 50
                    });
    
    
    if(JSON.parse(localStorage.getItem("username")))
    {
    	nrp=JSON.parse(localStorage.getItem("username"));
    }
    if(JSON.parse(localStorage.getItem("tenda")))
    {
        tenda=JSON.parse(localStorage.getItem("tenda"));
        bus=JSON.parse(localStorage.getItem("bus"));
        nama_kelompok=JSON.parse(localStorage.getItem("nama_kelompok"));
        nama_mhs=JSON.parse(localStorage.getItem("nama_mhs"));
    }

    if(JSON.parse(localStorage.getItem("password")))
    {
    	password=JSON.parse(localStorage.getItem("password"));
    }

    $$('#myBigDreamPilih').on('click',function(){
        mainView.router.loadPage("pilihBigDream.html");
    });

    $$('#kisahEntongPilih').on('click',function(){
        mainView.router.loadPage("pilihEntong.html");
    });

    $$('#manajemenEmosiPilih').on('click',function(){
        mainView.router.loadPage("pilihManajemenEmosi.html");
    });

    $$('#refleksiMini').on('click',function(){
        mainView.router.loadPage("refleksiMini.html");
    });

    $$('#fishbone').on('click',function(){
        mainView.router.loadPage("fishbone.html");
    });

    $$('#outdoor').on('click',function(){
        mainView.router.loadPage("outdoor.html");
    });

    $$('#namaMahasiswa').html(nama_mhs);
    $$('#fotoMahasiswa').html('<img src="https://my.ubaya.ac.id/img/mhs/160415093_m.jpg" width="60" height="80">');
    $$('#tempatTendaBis').html("Tenda: "+tenda+"<br/>Bus: "+bus+"<br/>Kelompok: "+nama_kelompok);
})

$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    myApp.onPageBack('menu',function(asd){
        if(JSON.parse(localStorage.getItem("username"))&&JSON.parse(localStorage.getItem("jabatan"))){
            console.log("heahahwe");
            navigator.app.exitApp();   
        }
    });
});

myApp.onPageInit('pilihBigDream', function (page) {
    $$.post(directory,{opsi:'ambilStatusBigDream', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        console.log(data);
        $$('#BigDreamList').html(data);
        $$('#masukMyBigDream').on('click', function () {
           mainView.router.loadPage("mybigdream.html");
        });
        $$('#masukTujuanHidup').on('click', function () {
            mainView.router.loadPage("tujuanhidup.html");
        });
        $$('#masukMyLifelist').on('click', function () {
            mainView.router.loadPage("mylifelist.html");
        });
        $$('#masukActionPlan').on('click', function () {
            mainView.router.loadPage("formActionPlan.html");
        });
    });
})

myApp.onPageInit('mybigdream', function (page) {
    var nrpMhs=localStorage.getItem('nrp_mhs');
    $$.post(directory,{opsi:'ambilBigDream', nrp:nrpMhs}, function(data){
        $$('#formBigDream').html(data);
        $$('#btnSubmitBigDream').on('click', function () {
            var jawabanean= document.getElementById("jawabBigDream").value;
            if(jawaban==""){
                myApp.alert('Tolong isi Big Dream');
            }
            else{
                $$.post(directory,{opsi:'jawabBigDream',nrp:nrpMhs,jawab:jawaban}, function(data){
                    console.log(data);
                });   
            }
            mainView.router.back({url: 'pilihBigDream.html',force: true,ignoreCache: true});
        });
        $$('#btnUploadBigDream').on('click', function () {
            var jawaban= document.getElementById("jawabBigDream").value;
            if(jawaban==""){
                myApp.alert('Tolong isi Big Dream');
            }
            else{
                $$.post(directory,{opsi:'updateBigDream',nrp:nrpMhs,jawab:jawaban}, function(data){
                    console.log(data);
                });
            }
            mainView.router.back({url: 'pilihBigDream.html',force: true,ignoreCache: true});
        });
    });  
    
})

myApp.onPageInit('myLifeList', function (page) {
    myApp.sortableOpen('.sortable');
    $$('#saveList').hide();
    $$('.sortable').on('sort', function (listEl, indexes) {
        $$('#saveList').show();
    });

    var codes =1;
    $$.post(directory,{opsi:'getLifeList', nrp:localStorage.getItem('nrp_mhs'), code:codes}, function(data){
        $$('#sortableLifeList').html(data);
        $$('.deleteList').on('click', function(event){

            var id = event.target.id.replace('s','');
            myApp.confirm('Apakah anda yakin akan menghapus life list ini?', 'Apakah Anda Yakin?', function () {
                var item = document.getElementById(id);
                var list = document.getElementById('sortableLifeList');
                list.removeChild(item);
                $$('#saveList').show();
            });
        });
    });
    $$('#insertLifeList').on('click', function () {
        var jawaban= document.getElementById("jawabLifeList").value;
        var length= $$('#sortableLifeList li').length;
        $$('#saveList').show();
        console.log(length);
        if(jawaban==""){
            myApp.alert('Tolong isi Life List');
        }
        else{
            if(length==''){
                length==0;
            }
            $$.post(directory,{opsi:'addLifeList', jawab:jawaban, count:length}, function(data){
                $$('#sortableLifeList').append(data);
                $$('#jawabLifeList').html("");
                $$('#jawabLifeList').focus();
                $$('.deleteList').on('click', function(event){
                     var id = event.target.id.replace('s','');
                    var item = document.getElementById(id);
                    var list = document.getElementById('sortableLifeList');
                    list.removeChild(item);
                });
            });   
        }
    });
    $$('#saveList').on('click', function(){
        var jawaban = [];

        $$('.listContent').each(function(){
          jawaban.push($$(this).text());
        })

        $$.post(directory,{opsi:'jawabLifeList', nrp:localStorage.getItem('nrp_mhs'), jawab:jawaban}, function(data){
            console.log(data);
            mainView.router.back({url: 'pilihBigDream.html',force: true,ignoreCache: true});
        });   
    });
})

myApp.onPageInit('formActionPlan', function (page) {
    var codes =2;
    $$.post(directory,{opsi:'getLifeList', nrp:localStorage.getItem('nrp_mhs'), code:codes}, function(data){
        console.log(data);
        $$('#listMyLifeList').html(data);
    });
})

myApp.onPageInit('formActionPlanDetail', function (page) {
    var timeline2 = myApp.calendar({
        input: '#calendar-events-tercapai',
        dateFormat: 'yyyy-mm-dd',
        monthPicker:true,
        yearPicker:true,
        closeOnSelect:true
    });

    var obstacle=document.getElementById("obstacle");
    var evidence=document.getElementById("evidence");
    var evaluation=document.getElementById("evaluation");
    var target=document.getElementById("calendar-events-tercapai");
    var idLife=page.query.idLifeList;

    $$.post(directory,{opsi:'getActionPlan', nrp:localStorage.getItem('nrp_mhs'), ids:idLife}, function(data){
        console.log(data);
        var result = JSON.parse(data);
        $$('#judulActionPlanForm').html(result["detail"]["list"]);
        obstacle.value=result["detail"]["obstacle"];
        evidence.value=result["detail"]["evidence"];
        evaluation.value=result["detail"]["evaluation"];
        if(result["detail"]["target"]!="0000-00-00")
            target.value=result["detail"]["target"];
        if(result["action"] !=undefined){
            for(var i=0;i<result["action"].length;i++)
            {   
               $$('#listTabelFormActionPlan').append('<a href="formActionPlanForm.html?idLifeList='+idLife+'&idTabel='+result["action"][i]["id"]+'">'+
                    '<div class="card-header" style="text-align:center;" >'+(i+1)+'</div>'+
                    '<div class="card-content">'+
                    '<div class="card-content-inner">'+
                    '<div>Task/Action : '+result["action"][i]["task"]+'</div>'+ 
                    '<div>Resources : '+result["action"][i]["resource"]+'</div>'+ 
                    '<div>Timeline : '+result["action"][i]["timeline"]+'</div>'+ 
                    '<div>Evidence of Success : '+result["action"][i]["evidence"]+'</div>'+
                    '<div>Evaluation Process : '+result["action"][i]["evaluation"]+'</div>'+
                    '</div>'+
                    '</div></a>');
            }
        }
    });  

    $$('#btnSubmit').on('click', function () {
        console.log(idLife);
        $$.post(directory,{opsi:'jawabDetailLifeList',  ids:idLife, targets:target.value, obstacles:obstacle.value, evidences:evidence.value, evaluations:evaluation.value}, function(data){
            myApp.alert("Detail Life List Berhasil disimpan.");
        });   
    });

    $$('.floating-button').on('click', function () {
       mainView.router.loadPage("formActionPlanForm.html?idLifeList="+idLife+"&idLife="+idLife);
    });
})

myApp.onPageInit('formActionPlanForm', function (page) {
    var task=document.getElementById("task");
    var resource=document.getElementById("resource");
    var evidenceTabel=document.getElementById("evidenceTabel");
    var evaluationTabel=document.getElementById("evaluationTabel");
    
    var timeline1 = myApp.calendar({
        input: '#calendar-events',
        dateFormat: 'yyyy-mm-dd',
        monthPicker:true,
        yearPicker:true,
        closeOnSelect:true
    });
    var timeline=document.getElementById("calendar-events");
    
    var idLife=page.query.idLifeList;
    var idTabel="";
    if(page.query.idTabel) // misal ada idtabel brarti buat edit, tampilno smua value lama
    {
        idTabel=page.query.idTabel;
        $$.post(directory,{opsi:'getDetailActionPlan', ids:idTabel}, function(data){
            console.log(data);
            var result = JSON.parse(data);
            task.value=result["task"];
            resource.value=result["resource"];
            timeline.value=result["timeline"];
            evidenceTabel.value=result["evidence"];
            evaluationTabel.value=result["evaluation"];
        });  
        document.getElementById("btnDeleteActionPlanTabel").style.visibility = "visible";

        $$('#btnSubmitTabel').on('click', function () {
            $$.post(directory,{opsi:'updateActionPlan',  ids:idTabel, tasks:task.value, resources:resource.value, timelines:timeline.value, evidences:evidenceTabel.value, evaluations:evaluationTabel.value}, function(data){
                console.log(data);
                mainView.router.back({url: 'formActionPlanDetail.html?idLifeList='+idLife,force: true,ignoreCache: true});
            });  
        });
    }
    else{
        idTabel=page.query.idLife;
        $$('#btnSubmitTabel').on('click', function () {
            $$.post(directory,{opsi:'jawabActionPlan', nrp:localStorage.getItem('nrp_mhs'),  ids:idTabel, tasks:task.value, resources:resource.value, timelines:timeline.value, evidences:evidenceTabel.value, evaluations:evaluationTabel.value}, function(data){
                console.log(data);
                console.log("submit");
                mainView.router.back({url: 'formActionPlanDetail.html?idLifeList='+idLife,force: true,ignoreCache: true});
            });  
        });
    }

    $$('#btnDeleteActionPlanTabel').on('click', function () {
        $$.post(directory,{opsi:'deleteActionPlan',  ids:idTabel}, function(data){
            console.log(data);
        });  
        mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
    });
    
})
myApp.onPageInit('tujuanHidup', function (page) {

    $$.post(directory,{opsi:'getTujuanHidup', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        $$('#listTujuan').html(data);
        $$('.deleteTujuan').on('click', function(event){
            var ids = event.target.id.replace('s','');
            myApp.confirm('Apakah anda yakin akan menghapus tujuan hidup ini?', 'Apakah Anda Yakin?', function () {
                var item = document.getElementById(ids);
                var list = document.getElementById('listTujuan');
                $$.post(directory,{opsi:'deleteTujuanHidup', id:ids}, function(data){
                    console.log(data);
                    list.removeChild(item);
                });   
            });
        });
    });

    $$('#insertTujuan').on('click', function () {
        var jawaban= document.getElementById("jawabTujuan").value;
            myApp.alert(jawaban);
        if(jawaban==""){
            myApp.alert('Tolong isi Tujuan Hidup');
        }
        else{
            $$.post(directory,{opsi:'addTujuan', nrp:localStorage.getItem('nrp_mhs'), jawab:jawaban}, function(data){
                $$('#listTujuan').append(data);
                $$('#jawabTujuan').html("");
                $$('#jawabTujuan').focus();
                $$('.deleteTujuan').on('click', function(event){
                    var ids = event.target.id.replace('s','');
                    myApp.confirm('Apakah anda yakin akan menghapus tujuan hidup ini?', 'Apakah Anda Yakin?', function () {
                        var item = document.getElementById(ids);
                        var list = document.getElementById('listTujuan');
                        list.removeChild(item);

                        $$.post(directory,{opsi:'deleteTujuanHidup', id:ids}, function(data){
                            console.log(data);
                        });   
                    });
                });
            });   
        }
    });
})

myApp.onPageInit('kisahEntong', function (page) {
    $$.post(directory,{opsi:'getKisahEntong', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        console.log(data);
        $$('#formKisahEntong').html(data);
    });

    $$('#btnSubmitKisahEntong').on('click', function () {
        var jawabanEntong=[];
        var idsoal=[];

        $$('.areajawab').each(function(){
          jawabanEntong.push($$(this).val());
          idsoal.push($$(this).attr('id'));
        })
        console.dir(jawabanEntong);

        $$.post(directory,{opsi:'jawabKisahEntong', nrp:localStorage.getItem('nrp_mhs'), jawab: jawabanEntong, id: idsoal}, function(data){
            console.log(data);
            mainView.router.back();
        });
    });    
})

myApp.onPageInit('lessonLearned', function (page) {
    $$('#saveLesson').hide();

    $$.post(directory,{opsi:'getLessonLearned', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        $$('#listJawabanLessonLearned').html(data);
        $$('.deleteLesson').on('click', function(event){
            var ids = event.target.id.replace('s','');
            var item = document.getElementById(ids);
            var list = document.getElementById('listJawabanLessonLearned');
            myApp.confirm('Apakah anda yakin akan menghapus Lesson Learned ini?', 'Apakah Anda Yakin?', function () {
                list.removeChild(item);

                $$.post(directory,{opsi:'deleteLessonLearned', id:ids}, function(data){
                    console.log(data);
                });   
            });
        });
    });

    $$('#insertLesson').on('click', function () {
        var jawaban= document.getElementById("jawabLesson").value;
        if(jawaban==""){
            myApp.alert('Tolong isi Lesson Learned');
        }
        else{
            $$.post(directory,{opsi:'addLessonLearned', nrp:localStorage.getItem('nrp_mhs'), jawab:jawaban}, function(data){
                $$('#listJawabanLessonLearned').append(data);
                $$('#jawabLesson').html("");
                $$('#jawabLesson').focus();
                $$('.deleteLesson').on('click', function(event){
                    var ids = event.target.id.replace('s','');
                    var item = document.getElementById(ids);
                    var list = document.getElementById('listJawabanLessonLearned');
                    myApp.confirm('Apakah anda yakin akan menghapus Lesson Learned ini?', 'Apakah Anda Yakin?', function () {
                        list.removeChild(item);

                        $$.post(directory,{opsi:'deleteLessonLearned', nrp:localStorage.getItem('nrp_mhs'), id:ids}, function(data){
                            console.log(data);
                        });   
                    });
                });
            });   
        }
    });
})

function createChipLessonLearned(jawabane, aidine)
{
    //chip
    var chip=document.createElement('div');
    chip.className='chip';

    //chip label
    var chipLabel=document.createElement('div');
    chipLabel.className='chip-label';
    chipLabel.appendChild(document.createTextNode(jawabane));

    //chip media
    var chipMedia=document.createElement('div');
    chipMedia.className='chip-media bg-teal';
    chipMedia.appendChild(document.createTextNode(aidine+1));

    //chip delete btn
    var deleteBtn=document.createElement('a');
    deleteBtn.setAttribute('href','#');
    deleteBtn.className='chip-delete';


    chip.appendChild(chipMedia);
    chip.appendChild(chipLabel);
    chip.appendChild(deleteBtn);

    //delete chip
    deleteBtn.onclick=function (e) {
        e.preventDefault();
        myApp.confirm('Hapus '+jawabane+"?","Yakin Hapus?", function () {
            jawabanLessonLearned.splice(aidine,1);
            localStorage.setItem("jawabanLessonLearned",JSON.stringify(jawabanLessonLearned));
            chip.remove();

        });
    };

    chipLabel.onclick=function (e) {
        e.preventDefault();

        myApp.modal({
        title: 'Edit Nomor '+(aidine+1),
        text: 'Edit Jawaban',
        afterText: '<input type="text" id="txtEditLessonLearned" class="modal-text-input" style="text-align: center;" value="'+jawabanLessonLearned[aidine]+'"">',
        buttons: [{
        text: 'Cancel'
        }, {
        text: 'OK',
        onClick: function() {
            jawabanLessonLearned.splice(aidine,1,$$('#txtEditLessonLearned').val());
            localStorage.setItem("jawabanLessonLearned",JSON.stringify(jawabanLessonLearned));
            refreshLessonLearned();
        }
        }, ]
        });
    };

    return chip;
}

myApp.onPageInit('pilihManajemenEmosi', function (page) {
    $$('#studikasus').on('click', function () {
       mainView.router.loadPage("studiKasus.html");
    });
    $$('#masukManajemenEmosi2').on('click', function () {
       mainView.router.loadPage("manajemenEmosi2.html");
    });
})

myApp.onPageInit('studiKasus', function (page) {
    $$('#formInput').on('click', function () {
        mainView.router.loadPage("studiKasusForm.html");
    });

    $$.post(directory,{opsi:'getStudiKasus', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        console.log(data);
        var result = JSON.parse(data);
        if(result["kasus"] != undefined){
            for(var i=0;i<result["kasus"].length;i++)
            {
                $$('#listKasus').append('<a href="studiKasusForm.html?idKasus='+result["kasus"][i]["id"]+'" >'+
                    '<div class="card">'+
                    '<div class="card-header" style="text-align:center;" >'+(i+1)+'</div>'+
                    '<div class="card-content">'+
                    '<div class="card-content-inner">'+
                    '<div>Situasi : '+result["kasus"][i]["situasi"]+'</div>'+ 
                    '<div>Pemikiran : '+result["kasus"][i]["pemikiran"]+'</div>'+ 
                    '<div>Emosi : '+result["kasus"][i]["emosi"]+'</div>'+ 
                    '<div>Perilaku : '+result["kasus"][i]["perilaku"]+'</div>'+ 
                    '</div>'+
                    '</div></a>');
            }
        }
    }); 
})

myApp.onPageInit('studiKasusForm', function (page) {
    var situasi=document.getElementById("situasi");
    var pemikiran=document.getElementById("pemikiran");
    var emosi=document.getElementById("emosi");
    var perilaku=document.getElementById("perilaku");

    if(page.query.idKasus)
    {
        var idStudiKasus=page.query.idKasus;

        $$.post(directory,{opsi:'getDetailStudiKasus', nrp:localStorage.getItem('nrp_mhs'), id:idStudiKasus}, function(data){
            console.log(data);
            var result = JSON.parse(data);
            situasi.value= result["kasus"]["situasi"];
            pemikiran.value=result["kasus"]["pemikiran"];
            emosi.value=result["kasus"]["emosi"];
            perilaku.value=result["kasus"]["perilaku"];
            document.getElementById("btnDeleteStudiKasus").style.visibility = "visible";
        }); 
        
        $$('#btnDeleteStudiKasus').on('click', function () {
             $$.post(directory,{opsi:'deleteStudiKasus',  id:idStudiKasus}, function(data){
                console.log(data);
            });  
            mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        });

        $$('#btnSubmitStudiKasus').on('click', function () {
             $$.post(directory,{opsi:'updateStudiKasus',  id:idStudiKasus, situasis: situasi.value, pemikirans: pemikiran.value, emosis:emosi.value, perilakus:perilaku.value}, function(data){
                console.log(data);
            });  
            mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        });
    }
    else
    {
        $$('#btnSubmitStudiKasus').on('click', function () {
            $$.post(directory,{opsi:'jawabStudiKasus', nrp:localStorage.getItem('nrp_mhs'), situasis: situasi.value, pemikirans: pemikiran.value, emosis:emosi.value, perilakus:perilaku.value}, function(data){
                console.log(data);
            }); 
            mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        });
    }

})

myApp.onPageInit('pengalamanPribadi', function (page) {
    $$('#formInput2').on('click', function () {
        mainView.router.loadPage("pengalamanPribadiForm.html");
    });

    $$.post(directory,{opsi:'getPengalaman', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        console.log(data);
        var result = JSON.parse(data);
        if(result["pengalaman"] != undefined){
            for(var i=0;i<result["pengalaman"].length;i++)
            {
                $$('#listPengalaman').append('<a href="pengalamanPribadiForm.html?idPengalaman='+result["pengalaman"][i]["id"]+'" >'+
                    '<div class="card">'+
                    '<div class="card-header" style="text-align:center;" >'+(i+1)+'</div>'+
                    '<div class="card-content">'+
                    '<div class="card-content-inner">'+
                    '<div>Emosi : '+result["pengalaman"][i]["emosi"]+'</div>'+ 
                    '<div>Situasi : '+result["pengalaman"][i]["situasi"]+'</div>'+ 
                    '<div>Strategi : '+result["pengalaman"][i]["strategi"]+'</div>'+ 
                    '</div>'+
                    '</div></a>');
            }
        }
    }); 
})

myApp.onPageInit('pengalamanPribadiForm', function (page) {
    var emosi=document.getElementById("emosi2");
    var situasi=document.getElementById("situasi2");
    var strategi=document.getElementById("strategi");
    $$('.page-on-left').remove();
    if(page.query.idPengalaman)
    {
        var idPengalaman=page.query.idPengalaman;

        $$.post(directory,{opsi:'getDetailPengalaman', nrp:localStorage.getItem('nrp_mhs'), id:idPengalaman}, function(data){
            console.log(data);
            var result = JSON.parse(data);
            emosi.value=result["pengalaman"]["emosi"];
            situasi.value= result["pengalaman"]["situasi"];
            strategi.value=result["pengalaman"]["strategi"];
            document.getElementById("btnDeletePengalamanPribadi").style.visibility = "visible";
        }); 
        
        $$('#btnDeletePengalamanPribadi').on('click', function () {
             $$.post(directory,{opsi:'deletePengalaman',  id:idPengalaman}, function(data){
                console.log(data);
            });  
            mainView.router.back({url: "pengalamanPribadi.html",force: true,ignoreCache: true});
        });

        $$('#btnSubmitPengalamanPribadi').on('click', function () {
             $$.post(directory,{opsi:'updatePengalaman',  id:idPengalaman, situasis: situasi.value, strategis: strategi.value, emosis:emosi.value}, function(data){
                console.log(data);
            });  
            mainView.router.back({url: "pengalamanPribadi.html",force: true,ignoreCache: true});
        });
    }
    else
    {
        $$('#btnSubmitPengalamanPribadi').on('click', function () {
            $$.post(directory,{opsi:'jawabPengalaman', nrp:localStorage.getItem('nrp_mhs'), situasis: situasi.value, strategis: strategi.value, emosis:emosi.value}, function(data){
                console.log(data);
            }); 
            mainView.router.back({url: "pengalamanPribadi.html",force: true,ignoreCache: true});
        });
    }
})

myApp.onPageInit('refleksiMini', function (page) {
    $$.post(directory,{opsi:'getRefleksi', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        console.log(data);
        $$('#formRefleksiMini').html(data);
    });

    $$('#btnSubmitRefleksiMini').on('click', function () {
        var jawabanEntong=[];
        var idsoal=[];

        $$('.areajawab').each(function(){
          jawabanEntong.push($$(this).val());
          idsoal.push($$(this).attr('id'));
        })

        $$.post(directory,{opsi:'jawabRefleksi', nrp:localStorage.getItem('nrp_mhs'), jawab: jawabanEntong, id: idsoal}, function(data){
            console.log(data);
            mainView.router.back();
        });
    });    

    $$('#btnSubmitRefleksiMini').on('click', function () {
        jawabanRefleksiMini=[];
        for(var i=0;i<soalRefleksiMini.length;i++)
        {
            var id=document.getElementsByTagName("textarea").item(i).id;
            var jawaban=document.getElementsByTagName("textarea").item(i).value;
            jawabanRefleksiMini.push([id,jawaban]);
        }

        localStorage.setItem("jawabanRefleksiMini",JSON.stringify(jawabanRefleksiMini));
        mainView.router.back();
    });
    
})

myApp.onPageInit('fishbone', function (page) {
    $$.post(directory,{opsi:'getFishbone', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        $$('#listKepala').html(data);
    });
    $$('#addKepala').on('click', function () {
        myApp.prompt('', 'Fishbone Kepala', function (value) {
            $$.post(directory,{opsi:'jawabFishbone', nrp:localStorage.getItem('nrp_mhs'), jawab:value}, function(data){
                $$('#listKepala').append(data);
            });
        });
    });    
})

myApp.onPageInit('fishboneSupport', function (page) {
    var ids = page.query.idKepala;
    $$.post(directory,{opsi:'getFishboneSupport', id:ids}, function(data){
        $$('#listSupport').html(data);
    });

    $$('#addSupport').on('click', function () {
        myApp.prompt('', 'Fishbone Support', function (value) {
            $$.post(directory,{opsi:'jawabFishboneSupport', id:ids, jawab:value}, function(data){
                $$('#listSupport').append(data);
            });
        });
    });
})

myApp.onPageInit('fishboneSupportDetail', function (page) {
    var ids = page.query.idSupport;
    $$.post(directory,{opsi:'getFishboneSupportDetail', id:ids}, function(data){
        $$('#listSupportDetail').html(data);
    });
    $$('#addSupportDetail').on('click', function () {
        myApp.prompt('', 'Fishbone Support Detail', function (value) {
             $$.post(directory,{opsi:'jawabFishboneSupportDetail', id:ids, jawab:value}, function(data){
                $$('#listSupportDetail').append(data);
            });
        });
    });
})