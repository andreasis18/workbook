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
var directory= 'http://localhost/kp/server/projectkp.php';
//var directory='http://admingpb.000webhostapp.com/projectkp.php'; //tmpat php aplikasi

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


function hapusLocalAll(){
    localStorage.removeItem('username');
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

    if(JSON.parse(localStorage.getItem("username")))
    {
        mainView.router.loadPage('menu.html'); 
    }
    else{
        myApp.hideNavbar($$('.navbar'));
    }

    $$('#logout').on('click',function(){
        myApp.confirm('Anda akan logout dari aplikasi', 'Apakah Anda Yakin?', function () {
            hapusLocalAll();
            myApp.closePanel();
            mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
        });
    });

    $$('#btnMasuk').on('click',function(){
        console.log("asfdsa");
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
                    localStorage.setItem("username",JSON.stringify(username.value));
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
    $$('.overlay, .overlay-message').hide();
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
    $$('#masukMyBigDream').on('click', function () {
       mainView.router.loadPage("mybigdream.html");
    });
    $$('#masukTujuanHidup').on('click', function () {
        mainView.router.loadPage("tujuanhidup.html");
    });
    $$('#masukMyLifeList').on('click', function () {
        mainView.router.loadPage("mylifelist.html");
    });
    $$('#masukMyActionPlan').on('click', function () {
        mainView.router.loadPage("formActionPlan.html");
    });
})

myApp.onPageInit('mybigdream', function (page) {
    var nrpMhs=localStorage.getItem('nrp_mhs');
    $$.post(directory,{opsi:'ambilBigDream', nrp:nrpMhs}, function(data){
        if(data!=""){
            $$('#formBigDream').html(data);   
        }
        $$('.overlay, .overlay-message').hide();
        $$('#btnSubmitBigDream').on('click', function () {
            var jawaban= document.getElementById("jawabBigDream").value;
            if(jawaban==""){
                myApp.alert('Tolong isi Big Dream');
            }
            else{
                $$.post(directory,{opsi:'jawabBigDream',nrp:nrpMhs,jawab:jawaban}, function(data){
                    console.log(data);
                    mainView.router.back({url: 'pilihBigDream.html',force: true,ignoreCache: true});
                });   
            }
        });
    });  
})

myApp.onPageInit('tujuanHidup', function (page) {
    $$.post(directory,{opsi:'getTujuanHidup', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        var result = JSON.parse(data);
        for (var i = 0; i <result.length; i++) 
        {
            $$('#listTujuan').append('<li id="'+result[i]["id_tujuan"]+'">'+
                                      '<div class="item-content">'+
                                        '<div class="item-media"><i class="f7-icons deleteTujuan" id="'+result[i]["id_tujuan"]+'s">close</i></div>'+
                                        '<div class="item-inner">'+
                                          '<div class="item-title listContent">'+result[i]["tujuan"]+'</div>'+
                                        '</div>'+
                                      '</div>'+
                                    '</li>');   
        }
        $$('.overlay, .overlay-message').hide();
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

myApp.onPageInit('myLifeList', function (page) {
    myApp.sortableOpen('.sortable');
    $$('#saveList').hide();
    $$('.sortable').on('sort', function (listEl, indexes) {
        $$('#saveList').show();
    });
    $$('.addLife').on('click', function(){
        var length= $$('#sortableLifeList li').length;
        mainView.router.loadPage('mylifelistDetail.html?length='+length);
    });
    $$.post(directory,{opsi:'getLifeList', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        console.log(data);
        var result = JSON.parse(data);
        if(result!=""){
            $$('.tempButton').hide();
            for(var i=0;i<result.length;i++)
            {
                $$('#sortableLifeList').append('<li class="listContent" id="'+result[i]["id_lifelist"]+'">'+
                                                  '<div class="sortable-handler"></div>'+
                                                  '<div class="item-content">'+
                                                    '<div class="item-media"><i class="f7-icons deleteList" id="'+result[i]["id_lifelist"]+'s">close</i></div>'+
                                                    '<div class="item-inner">'+
                                                      '<a href="mylifelistDetail.html?idList='+result[i]["id_lifelist"]+'&length='+result.length+'"><div class="item-title ">'+result[i]["list"]+'</div></a>'+
                                                    '</div>'+
                                                  '</div>'+
                                                '</li>');
            }
        }
        else{
            $$('.floating-button').hide();
            $$('.instruction').hide();
        }

        $$('.overlay, .overlay-message').hide();
        $$('.deleteList').on('click', function(event){
            var ids = event.target.id.replace('s','');
            console.log(ids);
            myApp.confirm('Apakah anda yakin akan menghapus life list ini?', 'Apakah Anda Yakin?', function () {
                var item = document.getElementById(ids);
                var list = document.getElementById('sortableLifeList');
                list.removeChild(item);
                $$.post(directory,{opsi:'deleteLifeList', nrp:localStorage.getItem('nrp_mhs'), id:ids}, function(data){
                    console.log(data);
                });
            });
        });
    });
    $$('#saveList').on('click', function(){
        var jawaban = [];

        $$('.listContent').each(function(){
          jawaban.push($$(this).attr('id'));
        })

        $$.post(directory,{opsi:'updatePrioritas', nrp:localStorage.getItem('nrp_mhs'), jawab:jawaban}, function(data){
            myApp.alert("Prioritas baru tersimpan");
            console.log(jawaban);
            $$('#saveList').hide();
        });   
    });
})

myApp.onPageInit('mylifelistDetail', function (page) {
    var timeline2 = myApp.calendar({
        input: '#calendar-events-tercapai',
        dateFormat: 'yyyy-mm-dd',
        monthPicker:true,
        yearPicker:true,
        closeOnSelect:true
    });

    var obstacle=document.getElementById("obstacle");
    var list=document.getElementById("lifelist");
    var evidence=document.getElementById("evidence");
    var evaluation=document.getElementById("evaluation");
    var target=document.getElementById("calendar-events-tercapai");
    var idList="";
    if(page.query.idList)
    {
        idList = page.query.idList;
        $$.post(directory,{opsi:'getLifeListDetail', id:page.query.idList}, function(data){
            console.log(data);
            var result = JSON.parse(data);
            list.value = result["list"];
            obstacle.value = result["obstacle"];
            evidence.value = result["evidence"];
            evaluation.value = result["evaluation"];
            target.value = result["target"];
            $$('.overlay, .overlay-message').hide();
        });   
    }
    else
    {
        $$('.overlay, .overlay-message').hide();
    }

    $$('#btnSubmit').on('click', function(){
        if(list.value !=''&&target.value!=""&&obstacle.value!=""&&evidence.value!=""&&evaluation.value!="")
        {

            $$.post(directory,{opsi:'jawabLifeList', length:page.query.length, id:idList, nrp:localStorage.getItem('nrp_mhs'), lists:list.value, targets:target.value, obstacles:obstacle.value, evidences:evidence.value, evaluations:evaluation.value}, function(data){
                console.log(data);
                if(data==1)
                {
                    mainView.router.back({url: 'mylifelist.html',force: true,ignoreCache: true});
                }
            });    
        }  
        else{
            myApp.alert("Tolong isi Detail Life List");
        }
    });
})

myApp.onPageInit('formActionPlan', function (page) {
    $$.post(directory,{opsi:'getLifeList', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        console.log(data);
        var result = JSON.parse(data);
        if(result!="")
        {
            for(var i=0;i<result.length;i++){
                $$('#listMyLifeList').append('<li id="'+result[i]["id_lifelist"]+'">'+
                                              '<a  href="formActionPlanDetail.html?idLifeList='+result[i]["id_lifelist"]+'&LifeList='+result[i]["list"]+'">'+
                                                '<div class="item-content">'+
                                                    '<div class="item-inner">'+
                                                      '<div class="item-title">'+result[i]["list"]+'</div>'+
                                                    '</div>'+
                                                    '<i class="f7-icons">eye</i>'+
                                                  '</div>'+
                                                '</a>'+
                                            '</li>');
            }
        }
        else
        {
            $$('#listMyLifeList').append('<li>'+
                                            '<div class="item-content">'+
                                                '<div class="item-inner">'+
                                                  '<div class="item-title" style="text-align:center;">Isi Life List terlebih dahulu untuk mengisi Action Plan</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</li>');
        }
        $$('.overlay, .overlay-message').hide();
    });
})

myApp.onPageInit('formActionPlanDetail', function (page) {
    var idLife=page.query.idLifeList;
    $$('#judulActionPlanForm').html(page.query.LifeList);
    $$.post(directory,{opsi:'getActionPlan', nrp:localStorage.getItem('nrp_mhs'), ids:idLife}, function(data){
        console.log(data);
        var result = JSON.parse(data);
        if(result!="")
        {
            if(result["action"] !=undefined){
                for(var i=0;i<result["action"].length;i++)
                {   
                   $$('#listTabelFormActionPlan').append('<div class="card">'+
                        '<a href="formActionPlanForm.html?idLifeList='+idLife+'&idTabel='+result["action"][i]["id"]+'&LifeList="'+page.query.LifeList+'>'+
                        '<div class="card-header" style="text-align:center;" >'+(i+1)+'</div>'+
                        '<div class="card-content">'+
                            '<div class="card-content-inner">'+
                                '<div>Task/Action : '+result["action"][i]["task"]+'</div>'+ 
                                '<div>Resources : '+result["action"][i]["resource"]+'</div>'+ 
                                '<div>Timeline : '+result["action"][i]["timeline"]+'</div>'+ 
                                '<div>Evidence of Success : '+result["action"][i]["evidence"]+'</div>'+
                                '<div>Evaluation Process : '+result["action"][i]["evaluation"]+'</div>'+
                            '</div>'+
                        '</div></a></div>');
                }
            }
            $$('.overlay, .overlay-message, .tempButton').hide();
        }
        else
        { 
            $$('.overlay, .overlay-message, .floating-button').hide();
        }
        
    });  

    $$('.addPlan').on('click', function () {
       mainView.router.loadPage("formActionPlanForm.html?idLifeList="+idLife+"&idLife="+idLife+"&LifeList="+page.query.LifeList);
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
            $$('.overlay, .overlay-message').hide();
        });  
        document.getElementById("btnDeleteActionPlanTabel").style.visibility = "visible";

        $$('#btnSubmitTabel').on('click', function () {
            $$.post(directory,{opsi:'updateActionPlan',  ids:idTabel, tasks:task.value, resources:resource.value, timelines:timeline.value, evidences:evidenceTabel.value, evaluations:evaluationTabel.value}, function(data){
                console.log(data);
                mainView.router.back({url: 'formActionPlanDetail.html?idLifeList='+idLife+'&LifeList='+page.query.LifeList,force: true,ignoreCache: true});
            });  
        });
    }
    else{
        idTabel=page.query.idLife;
        $$('#btnSubmitTabel').on('click', function () {
            $$.post(directory,{opsi:'jawabActionPlan', nrp:localStorage.getItem('nrp_mhs'),  ids:idTabel, tasks:task.value, resources:resource.value, timelines:timeline.value, evidences:evidenceTabel.value, evaluations:evaluationTabel.value}, function(data){
                console.log(data);
                mainView.router.back({url: 'formActionPlanDetail.html?idLifeList='+idLife+'&LifeList='+page.query.LifeList,force: true,ignoreCache: true});
            });  
        });
        $$('.overlay, .overlay-message').hide();
    }

    $$('#btnDeleteActionPlanTabel').on('click', function () {
        myApp.confirm('Apakah anda yakin akan menghapus Action Plan ini?', 'Apakah Anda Yakin?', function () {
            $$.post(directory,{opsi:'deleteActionPlan',  ids:idTabel}, function(data){
                console.log(data);
            });  
            mainView.router.back({url:`formActionPlanDetail.html?idLifeList='+idLife+'&LifeList='+page.query.LifeList`,force: true,ignoreCache: true});
        });
    });
})


myApp.onPageInit('kisahEntong', function (page) {
    $$.post(directory,{opsi:'getKisahEntong', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        console.log(data);
        $$('#formKisahEntong').html(data);
        $$('.overlay, .overlay-message').hide();
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
        $$('.overlay, .overlay-message').hide();
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

myApp.onPageInit('pilihManajemenEmosi', function (page) {
    //belum diisi
})

myApp.onPageInit('studiKasus', function (page) {
    $$('.addStudi').on('click', function () {
        mainView.router.loadPage("studiKasusForm.html");
    });

    $$.post(directory,{opsi:'getStudiKasus', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        console.log(data);
        var result = JSON.parse(data);
        if(result!="")
        {
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
            $$('.overlay, .overlay-message, .tempButton').hide();    
        }
        else
        {
            $$('.overlay, .overlay-message, .floating-button').hide();    
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
            $$('.overlay, .overlay-message').hide();
        }); 
        
        $$('#btnDeleteStudiKasus').on('click', function () {
            myApp.confirm('Apakah anda yakin akan menghapus Studi Kasus ini?', 'Apakah Anda Yakin?', function () {
                 $$.post(directory,{opsi:'deleteStudiKasus',  id:idStudiKasus}, function(data){
                    console.log(data);
                });  
                mainView.router.back({url: "studiKasus.html",force: true,ignoreCache: true});
            });
        });

        $$('#btnSubmitStudiKasus').on('click', function () {
             $$.post(directory,{opsi:'updateStudiKasus',  id:idStudiKasus, situasis: situasi.value, pemikirans: pemikiran.value, emosis:emosi.value, perilakus:perilaku.value}, function(data){
                console.log(data);
            });  
            mainView.router.back({url:"studiKasus.html",force: true,ignoreCache: true});
        });
    }
    else
    {
        $$('.overlay, .overlay-message').hide();
        $$('#btnSubmitStudiKasus').on('click', function () {
            $$.post(directory,{opsi:'jawabStudiKasus', nrp:localStorage.getItem('nrp_mhs'), situasis: situasi.value, pemikirans: pemikiran.value, emosis:emosi.value, perilakus:perilaku.value}, function(data){
                console.log(data);
            }); 
            mainView.router.back({url: "studiKasus.html",force: true,ignoreCache: true});
        });
    }

})

myApp.onPageInit('pengalamanPribadi', function (page) {
    $$('.addPengalaman').on('click', function () {
        mainView.router.loadPage("pengalamanPribadiForm.html");
    });

    $$.post(directory,{opsi:'getPengalaman', nrp:localStorage.getItem('nrp_mhs')}, function(data){
        console.log(data);
        var result = JSON.parse(data);
        if(result!="")
        {
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
            $$('.overlay, .overlay-message, .tempButton').hide();
        }
        else
        {
            $$('.overlay, .overlay-message, .floating-button').hide();   
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
            $$('.overlay, .overlay-message').hide();
        }); 
        
        $$('#btnDeletePengalamanPribadi').on('click', function () {
            myApp.confirm('Apakah anda yakin akan menghapus Pengalaman Pribadi ini?', 'Apakah Anda Yakin?', function () {
                $$.post(directory,{opsi:'deletePengalaman',  id:idPengalaman}, function(data){
                    console.log(data);
                });  
                mainView.router.back({url: "pengalamanPribadi.html",force: true,ignoreCache: true});
            });
             
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
        $$('.overlay, .overlay-message').hide();
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
        $$('.overlay, .overlay-message').hide();
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
        console.log(data);
        var result = JSON.parse(data);
        if(result!="")
        {   
            var temp="";
            for(var i=0; i<result.length;i++)
            {
                temp+='<div class="card">'+
                          '<div class="card-header">'+
                            '<i id="'+result[i]["id_kepala"]+'s" class="f7-icons deleteKepala">close</i>'+
                            '<p id="'+result[i]["id_kepala"]+'" class="editKepala">'+result[i]["nama_kepala"]+'</p>'+
                            '<a href="fishboneSupport.html?idKepala='+result[i]["id_kepala"]+'&namaKepala='+result[i]["nama_kepala"]+'"><i class="f7-icons">chevron_right</i></a>'+
                            '</div>'+
                        '<div class="card-content">'+
                        '<ul>';
                if(result[i]["support"]!=undefined)
                {
                    for(var j=0;j<result[i]["support"][i].length;j++)
                    {
                        temp+='<li class="item-content">'+
                                '<div class="item-inner">'+
                                  result[i]["support"][i][j]["nama_support"]+
                                '</div>'+
                                '<ul>';
                        if(result[i]["support_detail"]!=undefined&&result[i]["support_detail"][j]!=undefined)
                        {
                            for(var k=0;k<result[i]["support_detail"][j].length;k++)
                            {
                                temp+='<li class="item-content">'+
                                        '<div>'+
                                          result[i]["support_detail"][j][k]["nama_detail_support"]+
                                        '</div>'+
                                    '</li>';
                            }
                        }
                        temp+='</ul></li>';
                    }
                }
                temp+='</ul></div></div>';
            }
            $$('#listKepala').append(temp);
            $$('.overlay, .overlay-message, .tempButton').hide();

            $$('.deleteKepala').on('click', function(event) {
                var ids = event.target.id.replace('s','');
                myApp.confirm('Apakah anda yakin akan menghapus Kepala Fishbone beserta isinya?', 'Apakah Anda Yakin?', function () {
                    $$.post(directory,{opsi:'deleteFishbone', id:ids}, function(data){
                        console.log(data);
                        mainView.router.refreshPage();
                    });   
                });
            });    

            $$('.editKepala').on('click', function (event) {
                var ids=$$(this).attr("id");
                myApp.prompt('', 'Edit', function (value) {
                    if(value!='')
                    {
                        $$.post(directory,{opsi:'editFishboneKepala', id:ids, jawab:value}, function(data){
                            console.log(data);
                            mainView.router.refreshPage();
                        });   
                    }
                });
            });  
        }
        else
        {
            $$('.overlay, .overlay-message, .floating-button').hide();
        }

    });


    $$('.addKepala').on('click', function () {
        myApp.prompt('', 'Fishbone Kepala', function (value) {
            if(value!='')
            {
                $$.post(directory,{opsi:'jawabFishbone', nrp:localStorage.getItem('nrp_mhs'), jawab:value}, function(data){
                    console.log(data);
                    mainView.router.refreshPage();
                });   
            }
        });
    });    
})

myApp.onPageInit('fishboneSupport', function (page) {
    var ids = page.query.idKepala;
    var nama = page.query.namaKepala;
    $$("#judulFishboneKepala").html(nama);
    $$.post(directory,{opsi:'getFishboneSupport', id:ids}, function(data){
        var result = JSON.parse(data);
        if(result!="")
        {   
            var temp="";
            for(var i=0; i<result.length;i++)
            {
                temp+='<div class="card">'+
                          '<div class="card-header">'+
                            '<i id="'+result[i]["id_support"]+'s" class="f7-icons deleteSupport">close</i>'+
                            '<p id="'+result[i]["id_support"]+'" class="editSupport">'+result[i]["nama_support"]+'</p>'+
                            '<a href="fishboneSupportDetail.html?idSupport='+result[i]["id_support"]+'&namaSupport='+result[i]["nama_support"]+'"><i class="f7-icons">chevron_right</i></a>'+
                            '</div>'+
                        '<div class="card-content">'+
                        '<ul>';
                if(result[i]["support_detail"]!=undefined&&result[i]["support_detail"][i]!=undefined)
                {
                    for(var j=0;j<result[i]["support_detail"][i].length;j++)
                    {
                        temp+='<li class="item-content">'+
                                '<div class="item-inner">'+
                                  result[i]["support_detail"][i][j]["nama_detail_support"]+
                                '</div>'+
                                '</li>';
                    }
                }
                temp+='</ul></div></div>';
            }
            $$('#listSupport').append(temp);
            $$('.overlay, .overlay-message, .tempButton').hide();

            $$('.deleteSupport').on('click', function(event) {
                var ids = event.target.id.replace('s','');
                myApp.confirm('Apakah anda yakin akan menghapus Support Fishbone beserta isinya?', 'Apakah Anda Yakin?', function () {
                    $$.post(directory,{opsi:'deleteFishboneSupport', id:ids}, function(data){
                        console.log(data);
                        mainView.router.refreshPage();
                    });   
                });
            });    

            $$('.editSupport').on('click', function (event) {
                var ids=$$(this).attr("id");
                myApp.prompt('', 'Edit', function (value) {
                    if(value!='')
                    {
                        $$.post(directory,{opsi:'editFishboneSupport', id:ids, jawab:value}, function(data){
                            console.log(data);
                            mainView.router.refreshPage();
                        });   
                    }
                });
            });  
        }
        else
        {
            $$('.overlay, .overlay-message, .floating-button').hide();
        }
    });

    $$('.addSupport').on('click', function () {
        myApp.prompt('', 'Fishbone Support', function (value) {
            if(value!='')
            {
                $$.post(directory,{opsi:'jawabFishboneSupport', id:ids, jawab:value}, function(data){
                    mainView.router.refreshPage();
                });
            }
        });
    });
})

myApp.onPageInit('fishboneSupportDetail', function (page) {
    var ids = page.query.idSupport;
    var nama = page.query.namaSupport;
    $$("#judulFishboneSupport").html(nama);
    $$.post(directory,{opsi:'getFishboneSupportDetail', id:ids}, function(data){
        var result = JSON.parse(data);
        if(result!="")
        {   
            var temp="";
            for(var i=0; i<result.length;i++)
            {
                temp+='<div class="card">'+
                          '<div class="card-header">'+
                            '<i id="'+result[i]["id_detail_support"]+'s" class="f7-icons deleteSupportDetail">close</i>'+
                            '<p id="'+result[i]["id_detail_support"]+'" class="editSupportDetail">'+result[i]["nama_detail_support"]+'</p>'+
                            '<p></p>'+
                            '</div>'+
                        '</div>';
            }
            $$('#listSupportDetail').append(temp);
            $$('.overlay, .overlay-message, .tempButton').hide();

            $$('.deleteSupportDetail').on('click', function(event) {
                var ids = event.target.id.replace('s','');
                myApp.confirm('Apakah anda yakin akan menghapus Detail Support Fishbone?', 'Apakah Anda Yakin?', function () {
                    $$.post(directory,{opsi:'deleteFishboneSupportDetail', id:ids}, function(data){
                        console.log(data);
                        mainView.router.refreshPage();
                    });   
                });
            });    

            $$('.editSupportDetail').on('click', function (event) {
                var ids=$$(this).attr("id");
                myApp.prompt('', 'Edit', function (value) {
                    if(value!='')
                    {
                        $$.post(directory,{opsi:'editFishboneSupportDetail', id:ids, jawab:value}, function(data){
                            console.log(data);
                            mainView.router.refreshPage();
                        });   
                    }
                });
            });  
        }
        else
        {
            $$('.overlay, .overlay-message, .floating-button').hide();
        }
    });
    $$('.addSupportDetail').on('click', function () {
        myApp.prompt('', 'Fishbone Support Detail', function (value) {
            if(value!='')
            {
                $$.post(directory,{opsi:'jawabFishboneSupportDetail', id:ids, jawab:value}, function(data){
                    mainView.router.refreshPage();
                });   
            }
        });
    });
})
