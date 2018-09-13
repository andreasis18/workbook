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


function disableEnableBtn(ids) {
  // traverses the array with IDs
  var nrids = ids.length;
  var pencet = 0;
  for(var i=0; i<nrids; i++) {
    // registers onclick event to each button
    if(document.getElementById(ids[i])) {
      document.getElementById(ids[i]).onclick = function() {
        this.setAttribute('disabled', 'disabled');     // disables the button by adding the 'disabled' attribute
        this.innerHTML = 'Disabled';        // changes the button text
        var idbtn = this.id;       // stores the button ID
        pencet++;
        // calls a function after 2 sec. (2000 milliseconds)
        setTimeout( function() {
          document.getElementById(idbtn).removeAttribute('disabled');         // removes the "disabled" attribute
          document.getElementById(idbtn).innerHTML = 'UPLOAD JAWABAN';        // changes tne button text
        }, 86400000 );
        if(pencet >=3){
            this.setAttribute('disabled', 'disabled');     // disables the button by adding the 'disabled' attribute
            this.innerHTML = 'Disabled'; 
        }
      }
    }
  }
}

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

    $$('.jabatan').on('click',function(){
        console.log("ha");
    });

    $$('#btnMasuk').on('click',function(){
    	var pilihan = document.getElementById("jabatan");
    	password = document.getElementById("password").value;
    	var username = document.getElementById("username");
		var jabatan = pilihan.options[pilihan.selectedIndex].value;
    	if(jabatan=='mahasiswa')
        {
            $$.post(directory,{opsi:"loginMhs", nrp:username.value,password:password
            },function(data){
                if(data=="berhasil") //cek ada atau tdk id server
                {
                    $$.post(directory,{opsi:"getBisTenda", nrp:username.value
                    },function(data){
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
                }
                else
                {
                    console.log(data);
                    myApp.alert("Data login tidak ditemukan","Error");
                }
                
            });
            
        }
    	else if(jabatan=='fasilitator')
        {
            $$.post(directory,{opsi:"loginFasilitator", username:username.value,password:password
            },function(data){
                if(data=="berhasil")
                {
                    mainView.router.loadPage('pilihGelombangFasilitator.html');
                    localStorage.setItem("password",JSON.stringify(password));
                    localStorage.setItem("username",JSON.stringify(username.value));
                    localStorage.setItem("jabatan",JSON.stringify('fasilitator'));
                }
                else if(data=="hehehe")
                {
                    mainView.router.loadPage('hehePage.html');
                    localStorage.setItem("password",JSON.stringify(password));
                    localStorage.setItem("username",JSON.stringify(username.value));
                    localStorage.setItem("jabatan",JSON.stringify('hehe'));
                }
                else
                {
                    myApp.alert("fail fas","Error");
                }
                
            });
            
        }
        else if(jabatan=='eval')
        {
            $$.post(directory,{opsi:"loginEval", username:username.value,password:password
            },function(data){
                if(data=="berhasil")
                {
                    mainView.router.loadPage('pilihGelombangEval.html');
                    localStorage.setItem("password",JSON.stringify(password));
                    localStorage.setItem("username",JSON.stringify(username.value));
                    localStorage.setItem("jabatan",JSON.stringify('eval'));
                }
                else
                {
                    myApp.alert("Dfail eval","Error");
                } 
            });
        }
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
    $$.post(directory,{opsi:"ambilPengumuman2"},function(data){
            //var gambar=JSON.parse(data);
        var gambar="";
        
        if(gambar=="")
        {
            $$('.swiper-wrapper').html("<div style=text-align:center; width:100%;><b><font size=5>Tidak Ada Pengumuman </font></b></div>")
        }
        for(var i=0;i<gambar.length;i++)
        {
            var gambarku="<img src="+gambar[i]+" style=width:100%; height:50%;>";
            var testSlide="<div class=swiper-slide>"+gambarku+"</div>";
            mySwiper1.appendSlide(testSlide);
        }
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
        $$('.deleteList').on('click', function(){
            myApp.confirm('Apakah anda yakin akan menghapus life list ini?', 'Apakah Anda Yakin?', function () {
                var id = trim($$(this).attr('id'), 's');
                var item = document.getElementById(id);
                var list = document.getElementById('LifeList');
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
                $$('.deleteList').on('click', function(){
                    var id = $$(this).attr('id').replace('s','');
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
               $$('#listTabelFormActionPlan').append('<a href="formActionPlanForm.html?idTabel='+result["action"][i]["id"]+'">'+
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
            console.log(data);
            myApp.alert("Detail Life List Berhasil disimpan.");
        });   
    });

    $$('.floating-button').on('click', function () {
       mainView.router.loadPage("formActionPlanForm.html?idLife="+idLife);
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
            });  
            mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        });
    }
    else{
        idTabel=page.query.idLife;
        $$('#btnSubmitTabel').on('click', function () {
            $$.post(directory,{opsi:'jawabActionPlan', nrp:localStorage.getItem('nrp_mhs'),  ids:idTabel, tasks:task.value, resources:resource.value, timelines:timeline.value, evidences:evidenceTabel.value, evaluations:evaluationTabel.value}, function(data){
                console.log(data);
            });  
            mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        });
    }

    $$('#btnDeleteActionPlanTabel').on('click', function () {
        $$.post(directory,{opsi:'deleteActionPlan',  ids:idTabel}, function(data){
            console.log(data);
        });  
        mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
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
        $$('.deleteLesson').on('click', function(){
            var ids = $$(this).attr('id').replace('s','');
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
                $$('.deleteLesson').on('click', function(){
                    var ids = $$(this).attr('id').replace('s','');
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
            mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
        });
    }
    else
    {
        $$('#btnSubmitPengalamanPribadi').on('click', function () {
            $$.post(directory,{opsi:'jawabPengalaman', nrp:localStorage.getItem('nrp_mhs'), situasis: situasi.value, strategis: strategi.value, emosis:emosi.value}, function(data){
                console.log(data);
            }); 
            mainView.router.back({url: page.view.history[page.view.history.length - 2],force: true,ignoreCache: true});
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

var jawabanFishboneBaru=[];

var idKepala=0;
var idSirip=0;
var bantuanFishForm=[];
var bantuanFishTabel=[];



myApp.onPageInit('fishboneTabel', function (page) {
   bantuanFishTabel=[]
    var idSirip=page.query.idSirip;
    $$('#judulFishboneTabel').html(jawabanFishboneBaru[idKepala][1][idSirip][0]);
    
    if(jawabanFishboneBaru[idKepala][1][idSirip][1])
        bantuanFishTabel=jawabanFishboneBaru[idKepala][1][idSirip][1];

    refreshFishboneDetailSupport();

    $$('#fabTabel').on('click', function () {
    myApp.prompt('Nomor '+(bantuanFishTabel.length+1), 'Fishbone Detail Support', function (value) {
        bantuanFishTabel.push(value); 
        refreshFishboneDetailSupport();
        jawabanFishboneBaru[idKepala][1][idSirip].splice(1,1,bantuanFishTabel);
        localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
    });
    });
})



function refreshFishboneDetailSupport()
{
    $$('#listSiripTabelFishbone').html("");
            for(var i=0;i<bantuanFishTabel.length;i++)
            {
                $$('#listSiripTabelFishbone').append(createChipFishboneDetailSupport(bantuanFishTabel[i],i));
                $$('#listSiripTabelFishbone').append("<br/>Tekan Pada Jawaban Untuk Edit<br/>");
                //$$('.listJawaban').append((i+1)+". "+jawabanLifelist[i]+"<br/>");
            }
}

function createChipFishboneDetailSupport(jawabane, aidine)
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
                jawabanFishboneBaru[idKepala][1][idSirip][1].splice(aidine,1);
                refreshFishboneDetailSupport();
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                chip.remove();

            });
        };

        chipLabel.onclick=function (e) {
            e.preventDefault();

            myApp.modal({
            title: 'Edit Nomor '+(aidine+1),
            text: 'Edit Jawaban :',
            afterText: '<input type="text" id="txtEditFishboneDetailSupport" class="modal-text-input" style="text-align: center;" value="'+jawabane+'"">',
            buttons: [{
            text: 'Cancel'
            }, {
            text: 'OK',
            onClick: function() {
                jawabanFishboneBaru[idKepala][1][idSirip][1].splice(aidine,1,$$('#txtEditFishboneDetailSupport').val());
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                refreshFishboneDetailSupport();
            }
            }]
            });
        };

        return chip;
    }

myApp.onPageInit('fishboneForm', function (page) {
    bantuanFishForm=[];
    idKepala=page.query.idKepala;
    if(jawabanFishboneBaru[idKepala][1])
        bantuanFishForm=jawabanFishboneBaru[idKepala][1];
    
    $$('#judulKepala').html(jawabanFishboneBaru[idKepala][0]);

    refreshFishboneSupport();

    $$('#fabForm').on('click', function () {
    myApp.prompt('Nomor '+(bantuanFishForm.length+1), 'Fishbone Support', function (value) {
        bantuanFishForm.push([value]);
        refreshFishboneSupport();
        jawabanFishboneBaru[idKepala].splice(1,1,bantuanFishForm);
        localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
    });
    });


})

function refreshFishboneSupport()
{
    $$('#listSiripFishbone').html("");
            for(var i=0;i<bantuanFishForm.length;i++)
            {
                $$('#listSiripFishbone').append(createChipFishboneSupport(bantuanFishForm[i][0],i));
                $$('#listSiripFishbone').append("<br/>Tekan Pada Jawaban Untuk Edit<br/>");
                $$('#listSiripFishbone').append('<a href="fishboneTabel.html?idSirip='+i+'" class="item-link item-content no-ripple">Masuk Detail Support '+bantuanFishForm[i][0]+'</a><br/>');
                //$$('.listJawaban').append((i+1)+". "+jawabanLifelist[i]+"<br/>");
            }
}

function createChipFishboneSupport(jawabane, aidine)
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
                jawabanFishboneBaru[idKepala][1].splice(aidine,1);
                refreshFishboneSupport();
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                chip.remove();

            });
        };

        chipLabel.onclick=function (e) {
            e.preventDefault();

            myApp.modal({
            title: 'Edit Nomor '+(aidine+1),
            text: 'Edit Jawaban :',
            afterText: '<input type="text" id="txtEditFishboneSirip" class="modal-text-input" style="text-align: center;" value="'+bantuanFishForm[aidine][0]+'"">',
            buttons: [{
            text: 'Cancel'
            }, {
            text: 'OK',
            onClick: function() {
                jawabanFishboneBaru[idKepala][1][aidine].splice(0,1,$$('#txtEditFishboneSirip').val());
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                refreshFishboneSupport();
            }
            }]
            });
        };

        return chip;
    }


myApp.onPageInit('fishbone', function (page) {

    refreshFishboneKepala();

    $$('#fabKepala').on('click', function () {
    myApp.prompt('Nomor '+(jawabanFishboneBaru.length+1), 'Fishbone Kepala', function (value) {
        jawabanFishboneBaru.push([value]);
        refreshFishboneKepala();
        localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
    });
    });
    
})


function refreshFishboneKepala()
{
    $$('#listKepalaFishbone').html("");
        for(var i=0;i<jawabanFishboneBaru.length;i++)
        {
            $$('#listKepalaFishbone').append(createChipFishboneKepala(jawabanFishboneBaru[i][0],i));
            $$('#listKepalaFishbone').append("<br/>Tekan Pada Jawaban Untuk Edit<br/>");
            $$('#listKepalaFishbone').append('<a href="fishboneForm.html?idKepala='+i+'" class="item-link item-content no-ripple">Masuk Support '+jawabanFishboneBaru[i][0]+'</a><br/>');
            
        }
}

function createChipFishboneKepala(jawabane, aidine)
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
                jawabanFishboneBaru.splice(aidine,1);
                refreshFishboneKepala();
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                chip.remove();

            });
        };

        chipLabel.onclick=function (e) {
            e.preventDefault();

            myApp.modal({
            title: 'Edit Nomor '+(aidine+1),
            text: 'Edit Jawaban :',
            afterText: '<input type="text" id="txtEditFishboneBaru" class="modal-text-input" style="text-align: center;" value="'+jawabanFishboneBaru[aidine][0]+'"">',
            buttons: [{
            text: 'Cancel'
            }, {
            text: 'OK',
            onClick: function() {
                jawabanFishboneBaru.splice(aidine,1,[$$('#txtEditFishboneBaru').val(),jawabanFishboneBaru[aidine][1]]);
                localStorage.setItem("jawabanFishboneBaru",JSON.stringify(jawabanFishboneBaru));
                refreshFishboneKepala();
            }
            }]
            });
        };

        return chip;
    }


myApp.onPageInit('pilihGelombangFasilitator', function (page) {
    var gelombang = document.getElementById('gelombang');
    var kelompok = document.getElementById('kelompok');
    var mhs = document.getElementById('mhs');

    $$.post(directory,{opsi:"getGelombangPadaPeriodeAktif"},function(data){
        $$('#pilihGelombang').html(data);
    });

    
    $$('#btnLogoutFasilitator').on('click', function () 
    {
        localStorage.removeItem('username');
        localStorage.removeItem('jabatan');
        mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
    });


    $$('#kelompok').on('change', function(){
        var namaKelompok = kelompok.options[kelompok.selectedIndex].text;
        indexKelompok=kelompok.options[kelompok.selectedIndex].value;
        $$("#passwordKelompok").attr("placeholder", "Ketik Password untuk " +namaKelompok );
        document.getElementById("passwordKelompok").style.visibility = "visible";
        document.getElementById("submitPasswordKelompok").style.visibility = "visible";
        document.getElementById("mhsHidden").style.visibility = "hidden";
        document.getElementById("untukCommentMhs").style.visibility = "hidden";
        
        $$('#mhs').html("");
        $$.post(directory,{opsi:"getMhsDalamKelompok", indexKelompok: indexKelompok},function(data){
            mhsFasilitator=JSON.parse(data);
            for(var i=0;i<mhsFasilitator.length;i++)
            {
                $$('#mhs').append("<option value="+mhsFasilitator[i][0]+">"+mhsFasilitator[i][0]+
                    " - "+mhsFasilitator[i][1]+
                    "</option>");
            }   
        });
    });

    $$('#mhs').on('change', function(){
        document.getElementById("fotoMhs").style.visibility = "visible";
        document.getElementById("bigDreamMhs").style.visibility = "visible";
        document.getElementById("lifelistMhs").style.visibility = "visible";
        document.getElementById("oMhs").style.visibility = "visible";
        document.getElementById("me1Mhs").style.visibility = "visible";
        document.getElementById("me2Mhs").style.visibility = "visible";
         document.getElementById("eMhs").style.visibility = "visible";
         document.getElementById("llMhs").style.visibility = "visible";
          document.getElementById("rmMhs").style.visibility = "visible";
          document.getElementById("apMhs").style.visibility = "visible";
           document.getElementById("aptMhs").style.visibility = "visible";
           document.getElementById("fishKMhs").style.visibility = "visible";
           document.getElementById("fishSMhs").style.visibility = "visible";
           document.getElementById("fishDSMhs").style.visibility = "visible";
        var nrpMhs=mhs.options[mhs.selectedIndex].value;
        $$('#fotoMhs').html("");
         $$('#fotoMhs').html("<img src=https://my.ubaya.ac.id/img/mhs/"+nrpMhs+"_m.jpg>");
        $$('#bigDreamMhs').html("");
        $$('#lifelistMhs').html("");
        $$('#oMhs').html("");
        $$('#me1Mhs').html("");
        $$('#me2Mhs').html("");
        $$('#eMhs').html("");
        $$('#llMhs').html("");
        $$('#rmMhs').html("");
        $$('#apMhs').html("");
        $$('#aptMhs').html("");
        $$('#fishKMhs').html("");
        $$('#fishSMhs').html("");
        $$('#fishDSMhs').html("");
        $$.post(directory,{opsi:"getSoalJwbMhsBigDream", nrpMhs: nrpMhs },function(data){
            var bigDreamMhs=JSON.parse(data);
            if(bigDreamMhs==""){
                $$('#bigDreamMhs').append("<div style=text-align:center;><b><font size=5>My Big Dream :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<bigDreamMhs.length;i++)
            {
                if(bigDreamMhs!=""){
                    $$('#bigDreamMhs').append("<div style=text-align:center;><b><font size=5>My Big Dream :</font></b></div><br/>"+
                                              "<div style=text-align:center;>"+bigDreamMhs[i][0]+"</div><br/><div style=text-align:center;>"+bigDreamMhs[i][1]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsLifelist", nrpMhs: nrpMhs },function(data){
            var lifelistMhs=JSON.parse(data);
            if(lifelistMhs==""){
                $$('#lifelistMhs').append("<div style=text-align:center;><b><font size=5>Lifelist :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<lifelistMhs.length;i++)
            {
                if(lifelistMhs!=""){
                    $$('#lifelistMhs').append("<div style=text-align:center;><b><font size=5>Lifelist :</font></b></div><br/>"+
                                              "<div style=text-align:center;>"+lifelistMhs[i][0]+"</div><br/><div style=text-align:center;>"+lifelistMhs[i][1]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsOutdoor", nrpMhs: nrpMhs },function(data){
            var oMhs=JSON.parse(data);
            if(oMhs==""){
                $$('#oMhs').append("<div style=text-align:center;><b><font size=5>Outdoor :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<oMhs.length;i++)
            {
                if(oMhs!="" ){
                    $$('#oMhs').append("<div style=text-align:center;><b><font size=5>Outdoor :</font></b></div><br/>"+
                                       "<div style=text-align:center;>"+oMhs[i][0]+"</div><br/><div style=text-align:center;>"+oMhs[i][1]+"</div><br/>")
                }
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsMe1", nrpMhs: nrpMhs },function(data){
            var me1Mhs=JSON.parse(data);
            if(me1Mhs==""){
                $$('#me1Mhs').append("<div style=text-align:center;><b><font size=5>Manajemen Emosi :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<me1Mhs.length;i++)
            {
                if(me1Mhs!="" ){
                    $$('#me1Mhs').append("<div style=text-align:center;><b><font size=5>Manajemen Emosi :</font></b></div><br/>"+
                                         "<div style=text-align:center;>"+me1Mhs[i][0]+"</div><br/><div style=text-align:center;>"+me1Mhs[i][4]+"</div><br/>"+
                                         "<div style=text-align:center;>"+me1Mhs[i][1]+"</div><br/><div style=text-align:center;>"+me1Mhs[i][5]+"</div><br/>"+
                                         "<div style=text-align:center;>"+me1Mhs[i][2]+"</div><br/><div style=text-align:center;>"+me1Mhs[i][6]+"</div><br/>"+
                                         "<div style=text-align:center;>"+me1Mhs[i][3]+"</div><br/><div style=text-align:center;>"+me1Mhs[i][7]+"</div><br/>")
                }
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsMe2", nrpMhs: nrpMhs },function(data){
            var me2Mhs=JSON.parse(data);
            if(me2Mhs==""){
                $$('#me2Mhs').append("<div style=text-align:center;><b><font size=5>Manajemen Emosi 2:</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<me2Mhs.length;i++)
            {
                if(me2Mhs!="" ){
                    $$('#me2Mhs').append("<div style=text-align:center;><b><font size=5>Manajemen Emosi 2 :</font></b></div><br/>"+
                                         "<div style=text-align:center;>"+me2Mhs[i][0]+"</div><br/><div style=text-align:center;>"+me2Mhs[i][3]+"</div><br/>"+
                                         "<div style=text-align:center;>"+me2Mhs[i][1]+"</div><br/><div style=text-align:center;>"+me2Mhs[i][4]+"</div><br/>"+
                                         "<div style=text-align:center;>"+me2Mhs[i][2]+"</div><br/><div style=text-align:center;>"+me2Mhs[i][5]+"</div><br/>")
                }
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsEntong", nrpMhs: nrpMhs },function(data){
            var eMhs=JSON.parse(data);
            if(eMhs==""){
                $$('#eMhs').append("<div style=text-align:center;><b><font size=5>Soal Entong :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<eMhs.length;i++)
            {
                if(eMhs!=""){
                    $$('#eMhs').append("<div style=text-align:center;><b><font size=5>Soal Entong "+(i+1)+"</font></b></div><br/>"+
                                              "<div style=text-align:center;>"+eMhs[i][0]+"</div><br/><div style=text-align:center;>"+eMhs[i][1]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsLessonLearned", nrpMhs: nrpMhs },function(data){
            var llMhs=JSON.parse(data);
            if(llMhs==""){
                $$('#llMhs').append("<div style=text-align:center;><b><font size=5>Lesson learned :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<llMhs.length;i++)
            {
                if(llMhs!=""){
                    $$('#llMhs').append("<div style=text-align:center;><b><font size=5>Lesson Learned :</font></b></div><br/>"+
                                              "<div style=text-align:center;>"+llMhs[i][0]+"</div><br/><div style=text-align:center;>"+llMhs[i][1]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsRm", nrpMhs: nrpMhs },function(data){
            var rmMhs=JSON.parse(data);
            if(rmMhs==""){
                $$('#rmMhs').append("<div style=text-align:center;><b><font size=5>Refleksi Mini :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<rmMhs.length;i++)
            {
                if(rmMhs!=""){
                    $$('#rmMhs').append("<div style=text-align:center;><b><font size=5>Refleksi mini "+(i+1)+"</font></b></div><br/>"+
                                              "<div style=text-align:center;>"+rmMhs[i][0]+"</div><br/><div style=text-align:center;>"+rmMhs[i][1]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsFormAp", nrpMhs: nrpMhs },function(data){
            var apMhs=JSON.parse(data);
            if(apMhs==""){
                $$('#apMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Form Action Plan :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<apMhs.length;i++)
            {
                 if(apMhs!="" ){
                    $$('#apMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Form Action Plan :</font></b></div><br/>"+
                                         "<div style=text-align:center;>Obstacle :</div><br/><div style=text-align:center;>"+apMhs[i][0]+"</div><br/>"+
                                         "<div style=text-align:center;>Evidence :</div><br/><div style=text-align:center;>"+apMhs[i][1]+"</div><br/>"+
                                         "<div style=text-align:center;>Evaluation :</div><br/><div style=text-align:center;>"+apMhs[i][2]+"</div><br/>"+
                                         "<div style=text-align:center;>Target :</div><br/><div style=text-align:center;>"+apMhs[i][3]+"</div><br/>"+
                                         "<div style=text-align:center;>Status :</div><br/><div style=text-align:center;>"+apMhs[i][4]+"</div><br/>")
                }
            }   
        });
        $$.post(directory,{opsi:"getSoalJwbMhsFormTableAp", nrpMhs: nrpMhs },function(data){
            var aptMhs=JSON.parse(data);
            if(aptMhs==""){
                $$('#aptMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Detail Form Action Plan :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<aptMhs.length;i++)
            {
                 if(aptMhs!="" ){
                    $$('#aptMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Detail Form Action Plan  :</font></b></div><br/>"+
                                         "<div style=text-align:center;>Task :</div><br/><div style=text-align:center;>"+aptMhs[i][0]+"</div><br/>"+
                                         "<div style=text-align:center;>Resource :</div><br/><div style=text-align:center;>"+aptMhs[i][1]+"</div><br/>"+
                                         "<div style=text-align:center;>Timeline :</div><br/><div style=text-align:center;>"+aptMhs[i][2]+"</div><br/>"+
                                         "<div style=text-align:center;>Evidence_Table :</div><br/><div style=text-align:center;>"+aptMhs[i][3]+"</div><br/>"+
                                         "<div style=text-align:center;>Evaluation_Table :</div><br/><div style=text-align:center;>"+aptMhs[i][4]+"</div><br/>")
                }
            }   
        });
        
        $$.post(directory,{opsi:"getSoalJwbMhsAllFishbone", nrpMhs: nrpMhs },function(data){
            var fishKMhs=JSON.parse(data);
            if(fishKMhs==""){
                $$('#fishKMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Fishbone :</font></b></div><br/><div style=text-align:center;>-</div><br/>")
            }
            for(var i=0;i<fishKMhs.length;i++)
            {
                if(fishKMhs!=""){
                    $$('#fishKMhs').append("<div style=text-align:center;><b><font size=5>Jawaban Fishbone :</font></b></div><br/>"+
                                            "<div style=text-align:center;>Kepala Fishbone :</div><br/><div style=text-align:center;>"+fishKMhs[i][0]+"</div><br/>"+
                                             "<div style=text-align:center;>Sirip Fishbone :</div><br/><div style=text-align:center;>"+fishKMhs[i][1]+"</div><br/>"+
                                             "<div style=text-align:center;>Detail Sirip Fishbone :</div><br/><div style=text-align:center;>"+fishKMhs[i][2]+"</div><br/>")
                }
            }   
        });

        var namaMhs = mhs.options[mhs.selectedIndex].text;
        $$("#commentUntukDiinsert").attr("placeholder", "Ketik Comment untuk " +namaMhs );
        document.getElementById("untukCommentMhs").style.visibility = "visible";

    });

    
    $$('#submitInsertComment').on('click',function(){
        
        var komen=$$("#commentUntukDiinsert").val();
        var indexMhs=mhs.options[mhs.selectedIndex].value;
        $$.post(directory,{opsi:"insertCommentMhs", indexMhs: indexMhs,komen:komen },function(data){
            if(data=="berhasil")
            {
                myApp.alert("Comment Berhasil Disimpan","Berhasil");
            }
            else
            {
                myApp.alert("Comment Tidak Tersimpan","Gagal");
            }
        });
    });
})

myApp.onPageInit('pilihKelompokFasilitator', function (page) {
    var idGelombang = page.query.idGelombang;
    $$.post(directory,{opsi:"getKelompokDariGelombang", id:idGelombang},function(data){
        $$('#pilihKelompok').html(data);
    });
})

myApp.onPageInit('pilihMahasiswaFasilitator', function (page) {
    var idKelompok = page.query.idKelompok;
    $$.post(directory,{opsi:"getMahasiswaDariKelompok", id:idKelompok},function(data){
        $$('#pilihMahasiswa').html(data);
    });
})

myApp.onPageInit('halamanMahasiswaFasilitator', function (page) {
    var nrp = page.query.idNrp;
    $$.post(directory,{opsi:"getDetailMhs", id:nrp},function(data){
        $$('#statusMahasiswa').html(data);
    });

    $$('#insertComment').on('click', function () {
        var komen=document.getElementById("comments"); 
        $$.post(directory,{opsi:'insertCommentMhs', idNrp:nrp, komens: komen.value}, function(data){
            console.log(data);
            myApp.alert("Comment berhasil disimpan.");
        });
    });    
})

myApp.onPageInit('detailJawabMahasiswaFasilitator', function (page) {
    var nrp = page.query.idNrp;
    var submodul = page.query.id_Submodul;
    
    $$.post(directory,{opsi:"getDetailJawabanMhs", ids:nrp, modul:submodul},function(data){
        $$('#blockAnswer').html(data);
    });
})

var indexKelompok=0;
myApp.onPageInit('pilihGelombangEval', function (page) {
    var gelombang = document.getElementById('gelombang');
    var kelompok = document.getElementById('kelompok');
    var mhs = document.getElementById('mhs');
    $$('#gelombang').html("");
    $$.post(directory,{opsi:"getGelombangPadaPeriodeAktif"},function(data){
        gelombangFasilitator=JSON.parse(data);
        for(var i=0;i<gelombangFasilitator.length;i++)
        {
            $$('#gelombang').append("<option value="+gelombangFasilitator[i][0]+"> Gelombang " 
                +gelombangFasilitator[i][1]+
                "</option>")
        }       
    });

    $$('#gelombang').on('change', function(){
        $$('#kelompok').html("");
        $$('#textKelompok').html("Belum Memilih Kelompok");
        document.getElementById("mhsHidden").style.visibility = "hidden";
        var indexGelombang = gelombang.options[gelombang.selectedIndex].value;
        $$.post(directory,{opsi:"getKelompokDariGelombang", idGelombang: indexGelombang},function(data){
            KelompokFasilitator=JSON.parse(data);
            for(var i=0;i<KelompokFasilitator.length;i++)
            {
                $$('#kelompok').append("<option value="+KelompokFasilitator[i][0]+"> Kelompok " 
                    +KelompokFasilitator[i][1]+
                    "</option>")
            }
            document.getElementById("kelompokHidden").style.visibility = "visible";     
        });
    });

    
    $$('#btnLogoutFasilitator').on('click', function () 
    {
        localStorage.removeItem('username');
        localStorage.removeItem('jabatan');
        mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
    });


    $$('#kelompok').on('change', function(){
        

        var namaKelompok = kelompok.options[kelompok.selectedIndex].text;
        indexKelompok=kelompok.options[kelompok.selectedIndex].value;
        document.getElementById("mhsHidden").style.visibility = "visible";
        
        $$('#mhs').html("");
        $$.post(directory,{opsi:"getMhsDalamKelompok", indexKelompok: indexKelompok},function(data){
            mhsFasilitator=JSON.parse(data);
            for(var i=0;i<mhsFasilitator.length;i++)
            {
                $$('#mhs').append("<option value="+mhsFasilitator[i][0]+">"+mhsFasilitator[i][0]+
                    " - "+mhsFasilitator[i][1]+
                    "</option>")
            }   
        });
    });
    var bigDreamMhs="";
    var lifelistMhs="";
    var oMhs="";
    var me1Mhs="";
    var me2Mhs="";
    var eMhs="";
    var llMhs="";
    var rmMhs="";
    var apMhs="";
    var aptMhs="";
    var fishKMhs="";
    $$('#mhs').on('change', function(){
        document.getElementById("halo").style.display = "none";
        document.getElementById("gelombang").style.display = "none";
        document.getElementById("kelompokHidden").style.display = "none";
        document.getElementById("textKelompok").style.display = "none";
        document.getElementById("kelompok").style.display = "none";
        document.getElementById("ilangPilihM").style.display = "none";

        document.getElementById("fotoMhs").style.visibility = "visible";
        document.getElementById("bigDreamMhs").style.visibility = "visible";
        document.getElementById("lifelistMhs").style.visibility = "visible";
        document.getElementById("oMhs").style.visibility = "visible";
        document.getElementById("me1Mhs").style.visibility = "visible";
        document.getElementById("me2Mhs").style.visibility = "visible";
         document.getElementById("eMhs").style.visibility = "visible";
         document.getElementById("llMhs").style.visibility = "visible";
          document.getElementById("rmMhs").style.visibility = "visible";
          document.getElementById("apMhs").style.visibility = "visible";
           document.getElementById("aptMhs").style.visibility = "visible";
           document.getElementById("fishKMhs").style.visibility = "visible";
           document.getElementById("fishSMhs").style.visibility = "visible";
        var nrpMhs=mhs.options[mhs.selectedIndex].value;
        $$('#fotoMhs').html("");
         $$('#fotoMhs').html("<div style='text-align:center;'><img src=https://my.ubaya.ac.id/img/mhs/"+nrpMhs+"_m.jpg></div>");
        $$('#bigDreamMhs').html("");
        $$('#lifelistMhs').html("");
        $$('#oMhs').html("");
        $$('#me1Mhs').html("");
        $$('#me2Mhs').html("");
        $$('#eMhs').html("");
        $$('#llMhs').html("");
        $$('#rmMhs').html("");
        $$('#apMhs').html("");
        $$('#aptMhs').html("");
        $$('#fishKMhs').html("");
        $$('#fishSMhs').html("");

        $$.post(directory,{opsi:"getSoalJwbMhsBigDream", nrpMhs: nrpMhs },function(data){
            bigDreamMhs=JSON.parse(data);
            if(bigDreamMhs!=""){
                $$('#bigDreamMhs').append("<br/><div style='text-align:left;'>Modul Big Dream<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#bigDreamMhs').append("<br/><div style='text-align:left;'>Modul Big Dream<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsLifelist", nrpMhs: nrpMhs },function(data){
            lifelistMhs=JSON.parse(data);
            if(lifelistMhs!=""){
                $$('#lifelistMhs').append("<div style='text-align:left;'>Modul Lifelist<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#lifelistMhs').append("<div style='text-align:left;'>Modul Lifelist<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsOutdoor", nrpMhs: nrpMhs },function(data){
            oMhs=JSON.parse(data);
            if(oMhs!=""){
                $$('#oMhs').append("<div style='text-align:left;'>Modul Outdoor<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#oMhs').append("<div style='text-align:left;'>Modul Outdoor<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }

        });
        $$.post(directory,{opsi:"getSoalJwbMhsMe1", nrpMhs: nrpMhs },function(data){
            me1Mhs=JSON.parse(data);
            if(me1Mhs!=""){
                $$('#me1Mhs').append("<div style='text-align:left;'>Modul Manajemen Emosi 1<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#me1Mhs').append("<div style='text-align:left;'>Modul Manajemen Emosi 2<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsMe2", nrpMhs: nrpMhs },function(data){
            me2Mhs=JSON.parse(data);
            if(me2Mhs!=""){
                $$('#me2Mhs').append("<div style='text-align:left;'>Modul Manajemen Emosi 2<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#me2Mhs').append("<div style='text-align:left;'>Modul Manajemen Emosi 2<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsEntong", nrpMhs: nrpMhs },function(data){
            eMhs=JSON.parse(data);
            if(eMhs!=""){
                $$('#eMhs').append("<div style='text-align:left;'>Modul Entong<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#eMhs').append("<div style='text-align:left;'>Modul Entong<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }  

        });
        $$.post(directory,{opsi:"getSoalJwbMhsLessonLearned", nrpMhs: nrpMhs },function(data){
            llMhs=JSON.parse(data);
            if(llMhs!=""){
                $$('#llMhs').append("<div style='text-align:left;'>Modul Lesson learned<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#llMhs').append("<div style='text-align:left;'>Modul Lesson Learned<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }  
        });
        $$.post(directory,{opsi:"getSoalJwbMhsRm", nrpMhs: nrpMhs },function(data){
            rmMhs=JSON.parse(data);
            if(rmMhs!=""){
                $$('#rmMhs').append("<div style='text-align:left;'>Modul Refleksi Mini<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            } 
            else{
                $$('#rmMhs').append("<div style='text-align:left;'>Modul Refleksi Mini<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsFormAp", nrpMhs: nrpMhs },function(data){
            apMhs=JSON.parse(data);
            if(apMhs!=""){
                $$('#apMhs').append("<div style='text-align:left;'>Modul Action Plan<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#apMhs').append("<div style='text-align:left;'>Modul Action Plan<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }
        });
        $$.post(directory,{opsi:"getSoalJwbMhsFormTableAp", nrpMhs: nrpMhs },function(data){
            aptMhs=JSON.parse(data);
            if(aptMhs!=""){
                $$('#aptMhs').append("<div style='text-align:left;'>Detail Action Plan<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
            else{
                $$('#aptMhs').append("<div style='text-align:left;'>Detail Action Plan<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            }

        });
        
        $$.post(directory,{opsi:"getSoalJwbMhsAllFishbone", nrpMhs: nrpMhs },function(data){
            fishKMhs=JSON.parse(data);
            if(fishKMhs!=""){
                $$('#fishKMhs').append("<div style='text-align:left;'>Modul Fishbone<span style='float:right;'><i class='icon f7-icons'>check_round_fill</i></span><hr></div>")
            }
             else{
                $$('#fishKMhs').append("<div style='text-align:left;'>Modul Fishbone<span style='float:right;'><i class='icon f7-icons'>close_round_fill</i></span><hr></div>")
            } 
        });

    if(bigDreamMhs!="" && lifelistMhs!="" && oMhs!="" && me1Mhs!=""&&me2Mhs!=""&&eMhs!=""&&llMhs!=""&&rmMhs!=""&&apMhs!=""&&aptMhs!=""&&fishKMhs!=""){
        $$('#fishSMhs').append("<div style='text-align:center;'>Mahasiswa ini lulus GPB</div>");
    }
    else{
        $$('#fishSMhs').append("<div style='text-align:center;'>Mahasiswa ini belum lulus GPB</div>");

    }
        

    });
    
   
})

