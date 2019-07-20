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
var directory='http://administratorgpb.000webhostapp.com/projectkp.php'; //tmpat php aplikasi

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


 
function DownloaderError(err) {
    console.log("download error: " + err);
    alert("download error: " + err);
}
 
function DownloaderSuccess() {
    console.log("yay!");
}
function hapusLocalAll(){
    localStorage.removeItem('GPBusername');
    localStorage.removeItem('GPBtenda');
    localStorage.removeItem('GPBbus');
    localStorage.removeItem('GPBnama_kelompok');
    localStorage.removeItem('GPBnama_mhs');
	localStorage.removeItem('GPBnrp_mhs');
} //buat hapus smua local storage

var tenda=0;
var bus=0;
var nama_kelompok="";
var nama_mhs="";

var nrpMhs="";
var password="";


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


$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    myApp.onPageBack('menu',function(asd){
        if(JSON.parse(localStorage.getItem("GPBusername"))&&JSON.parse(localStorage.getItem("jabatan"))){
            console.log("heahahwe");
            navigator.app.exitApp();   
        }
    });
});

myApp.onPageInit('index', function (page) {
    $$('#menuAwal').on('click',function(){
        mainView.router.loadPage("menu.html");
        myApp.closePanel();
    });

    $$('#profile').on('click',function(){
        mainView.router.loadPage("profile.html");
        myApp.closePanel();
    });

    $$('#pengumuman').on('click',function(){
        mainView.router.loadPage("pengumuman.html");
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

    $$('#driverPassengerSide').on('click',function(){
        mainView.router.loadPage("driverPassenger.html");
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
    if(JSON.parse(localStorage.getItem("GPBusername")))
    {
        mainView.router.loadPage('menu.html'); 
    }
    else{
        myApp.hideNavbar($$('.navbar'));
    }

    $$('#changePassword').on('click', function(){
        mainView.router.loadPage("changePassword.html");
        myApp.closePanel();
    });

    $$('#logout').on('click',function(){
        myApp.confirm('Anda akan logout dari aplikasi', 'Apakah Anda Yakin?', function () {
            hapusLocalAll();
            myApp.closePanel();
            navigator.app.exitApp();
            //mainView.router.back({url: 'index.html',force: true,ignoreCache: true});
        });
    });

    $$('#btnMasuk').on('click',function(){
    	password = document.getElementById("password").value;
    	var username = document.getElementById("username");
        document.addEventListener("deviceready", function(){
            if(checkConnection())
            {
                $$.post(directory,{opsi:"loginMhs", nrp:username.value,password:password},function(data){
                    if(data=="berhasil") //cek ada atau tdk id server
                    {
                        $$.post(directory,{opsi:"getBisTenda", nrp:username.value},function(data){
                            var tendaBisTemp=JSON.parse(data);
                            mainView.router.loadPage('menu.html');
                            localStorage.setItem("GPBtenda",JSON.stringify(tendaBisTemp['tenda']));
                            localStorage.setItem("GPBbus",JSON.stringify(tendaBisTemp['bus']));
                            localStorage.setItem("GPBnama_kelompok",JSON.stringify(tendaBisTemp['nama_kelompok']));
                            localStorage.setItem("GPBnama_mhs",JSON.stringify(tendaBisTemp['nama']));
                            localStorage.setItem("GPBusername",JSON.stringify(username.value));
                        });         
                        mainView.router.loadPage("menu.html");
                    }
                    else
                    {
                        console.log(data);
                        myApp.alert("Data login tidak ditemukan","Error");
                    }   
                })
            }
            else
            {
                myApp.alert("Tidak ada koneksi Internet, coba lagi");
            }
        }, false); 	
        
    });
}).trigger();

myApp.onPageInit('changePassword', function(page){
    setGlobal();
    document.addEventListener("deviceready", function(){
        console.log("READYYYY");
        if(checkConnection())
        {
            
            $$('#btnChange').on('click',function(){
                var old = document.getElementById('old').value;
                var newp = document.getElementById('new').value;
                var confirm = document.getElementById('confirm').value;
                if(old != "" && newp !="" && confirm != "")
                {
                    if(newp == confirm)
                    {
                        $$.post(directory,{opsi:"changePassword", id:nrpMhs, old:old, new:newp},function(data){
                           if(data=="gagal")
                            {
                                myApp.alert("password salah");
                            }
                            else
                            {
                                myApp.alert("password berhasil diganti");
                                old.value="";
                                newp.value="";
                                confirm.value="";
                            }
                        });     
                    }
                    else
                    {
                        myApp.alert("Konfirmasi password berbeda dengan password baru");
                    }
                }
                else
                {
                    myApp.alert("Tolong isi data dengan lengkap");
                }
            });

            $$('.overlay, .overlay-message').hide();
        }
        else
        {
            $$('.overlay-message').html("Tidak ada koneksi Internet");   
        }
    }, false); 
})

myApp.onPageInit('menu', function (page) {
    setGlobal();
    //router.clearPreviousHistory();
    //localStorage.removeItem(nrpMhs+"LifeList");
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

    document.addEventListener("deviceready", function(){
        setGlobal();
        if(checkConnection())
        {
            $$.post(directory,{opsi:"getPengumuman"}, function(data){
                var result=JSON.parse(data);
                if(result!="")
                {
                    $$(".judul").html(result["judul"]);
                    $$(".contentPengumuman").html(result["content"]);
                    $$(".contentPengumuman").on("click", function(){
                        mainView.router.loadPage("pengumumanDetail.html?idPengumuman="+result["id_pengumuman"]);
                    });
                }
                else
                {
                    $$('.blockPengumuman').html("<p id='noticePengumuman'>Tidak ada Pengumuman</p>");
                }
                $$('.overlay, .overlay-message').hide();
            });
            $$.post(directory,{opsi:"getStatusPengumpulan", id:nrpMhs},function(data){
                $$('#statusPengumpulan').html(data);
            });
        }
        else
        {
            $$('.blockPengumuman').html("<p id='noticePengumuman'>Tidak Terhubung ke Internet, Tidak Bisa Mengambil Pengumuman</p>");
            $$('.overlay, .overlay-message').hide();
        }
    }, false);      
})

myApp.onPageBack('menu',function(asd){
    navigator.app.exitApp();
})

myApp.onPageInit('pengumuman', function (page) {
    setGlobal();
    document.addEventListener("deviceready", function(){
        if(checkConnection())
        {
            $$.post(directory,{opsi:"getAllPengumuman"},function(data){
                var result=JSON.parse(data);
                if(result!="")
                {
                    var temp="";
                    for(var i=0;i<result.length;i++)
                    {
                        temp+='<div class="card card-outline">'+
                                  '<div class="card-header judul">'+result[i]["judul"]+'</div>'+
                                  '<div class="card-content contentPengumuman">'+result[i]["content"]+'</div>'+
                                  '<div class="card-footer"><div></div><a href="pengumumanDetail.html?idPengumuman='+result[i]["id_pengumuman"]+'"><p>Read More</p></a></div>'+
                                '</div>';
                    }
                    $$('#listPengumuman').html(temp);

                    $$('.overlay, .overlay-message').hide();
                }
                else
                {
                    $$('.overlay-message').html("Tidak ada Pengumuman");
                }
            }); 
        }
        else
        {
            $$('.overlay-message').html("Tidak ada koneksi Internet");
        }
    }, false); 
})

myApp.onPageInit('pengumumanDetail', function (page) {
    setGlobal();
    document.addEventListener("deviceready", function(){
        if(checkConnection())
        {
            function success(entry) {
                alert("New Path: " + entry.fullPath);
            }

            function fail(error) {
                alert(error.code);
            }
            var fileTransfer = new FileTransfer();
            var uri = "";
            $$.post(directory,{opsi:"getDetailPengumuman", id:page.query.idPengumuman},function(data){
                var result=JSON.parse(data);
                if(result!="")
                {
                    if(result["attachment"]!=""){
                        $$('#listPengumuman').html('<div class="card card-outline">'+
                                                  '<div class="card-header judul">'+result["judul"]+'</div>'+
                                                  '<div class="card-content">'+result["content"]+'</div>'+
                                                  '<div class="card-footer"><a id="test" href="">Attachment : '+result["attachment"]+'</a></div>'+
                                                '</div>');   
                        $$('#test').click(function(){
                            uri = encodeURI("https://administratorgpb.000webhostapp.com/downloadPengumuman/"+result["attachment"]);
                            fileTransfer.download(
                                uri,
                                cordova.file.externalDataDirectory+result["attachment"],
                                function(entry) {
                                    window.resolveLocalFileSystemURL(
                                      entry.toURL(),
                                      function(fileEntry){
                                            var parentEntry = "file:///storage/emulated/0/Download";
                                            // move the file to a new directory and rename it
                                            alert("Download berhasil, file disimpan di folder "+entry.toURL()+"/"+result["attachment"]);
                                           fileEntry.moveTo(parentEntry, result["attachment"], success,fail);
                                      },
                                      errorCallback);
                                    var errorCallback = function(e) {
    
                                        alert("Error: " + e)
                                        
                                    }
                                },
                                function(error) {
                                    alert(uri+" "+error.code);
                                    console.log("download error source " + error.source);
                                    console.log("download error target " + error.target);
                                    console.log("download error code" + error.code);
                                },
                                false,
                                {
                                    headers: {
                                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                                    }
                                }
                            );
                             
                            
                            // $$.get("https://administratorgpb.000webhostapp.com/downloadPengumuman/05262019-121154khs_160415093.pdf",function(data){
                            //     alert(data);
                            // });      
                        });
                    }
                    else{
                         $$('#listPengumuman').html('<div class="card card-outline">'+
                                                  '<div class="card-header judul">'+result["judul"]+'</div>'+
                                                  '<div class="card-content">'+result["content"]+'</div>'+
                                                '</div>');      
                    }

                    $$('.overlay, .overlay-message').hide();
                }
                else
                {
                    $$('.overlay-message').html("Tidak ada Pengumuman");
                }
            }); 
        }
        else
        {
            $$('.overlay-message').html("Tidak ada koneksi Internet");
        }
    }, false); 
    
})

myApp.onPageInit('profile', function (page) {
    setGlobal();
    document.addEventListener("deviceready", function(){
        console.log("READYYYY");
        if(checkConnection())
        {
            $$.post(directory,{opsi:"getBisTenda", nrp:nrpMhs},function(data){
                var result=JSON.parse(data);

                $$('#namaMahasiswa').html(nama_mhs+' - '+nrpMhs);

                if(nrpMhs!="1234" && nrpMhs!="4321")
                {
                    $$('#fotoMahasiswa').html('<img src="https://my.ubaya.ac.id/img/mhs/'+nrpMhs+'_m.jpg" width="20%" height="10%"></img>');   
                }
                else
                {
                    $$('#fotoMahasiswa').html('<img src="https://my.ubaya.ac.id/img/mhs/160415093_m.jpg" width="20%" height="10%"></img>');
                }
                $$('#namaGelombang').html('Gelombang - '+result['nama_gelombang']);
                $$('#namaKelompok').html('Kelompok - '+result['nama_kelompok']);
                $$('#namaBus').html('Bus - '+result['bus']);
                $$('#namaTenda').html('Tenda - '+result['tenda']);
            });        
            $$('.overlay, .overlay-message').hide();
        }
        else
        {
            $$('.overlay-message').html("Tidak ada koneksi Internet");   
        }
    }, false); 
    
})

myApp.onPageInit('profileDetail', function (page) {
    setGlobal();
    var detail = page.query.detail;
    var result="";

    document.addEventListener("deviceready", function(){
        console.log("READYYYY");
        if(checkConnection())
        {
            if(detail=="Gelombang")
            {
                $$.post(directory,{opsi:"getTemanGelombang", nrp:nrpMhs},function(data){
                    result=JSON.parse(data);
                    getTabel(result);
                    $$("#blockTitle").html("Gelombang")
                });           
            }
            else if(detail=="Kelompok")
            {
                $$.post(directory,{opsi:"getTemanKelompok", nrp:nrpMhs},function(data){
                    result=JSON.parse(data);
                    getTabel(result);
                    $$("#blockTitle").html("Kelompok")
                }); 
            }
            else if(detail=="Bus")
            {
                $$.post(directory,{opsi:"getTemanBus", nrp:nrpMhs},function(data){
                    result=JSON.parse(data);
                    getTabel(result);
                    $$("#blockTitle").html("Bus")
                }); 
            }
            else if(detail=="Tenda")
            {
                $$.post(directory,{opsi:"getTemanTenda", nrp:nrpMhs},function(data){
                    result=JSON.parse(data);
                    getTabel(result);
                    $$("#blockTitle").html("Tenda")
                }); 
            }

            $$('.overlay, .overlay-message').hide();
        }
        else
        {
            $$('.overlay-message').html("Tidak ada koneksi Internet");   
        }
    }, false); 
})

function getTabel(result){
    if(result!="")
    {
        var temp="";
        for(var i =0;i<result.length;i++)
        {
            temp+="<tr>"+
                    "<td class='numeric-cell'>"+result[i]["nrp"]+
                    "</td>"+
                    "<td class='label-cell'>"+result[i]["nama"]+
                    "</td>"+
                "</tr>";
        }   
        $$("#tabelTeman").html(temp);
    }    
}

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

function checkLocal(modul)
{
    if(localStorage.getItem(nrpMhs+modul))
    {
        return JSON.parse(localStorage.getItem(nrpMhs+modul));
    }
    else
    {
        return false;
    }
}

function getComment($submodul){
    $$.post(directory,{opsi:'getComment', id:nrpMhs, modul: $submodul}, function(data){
        if(data!='')
        {
            var comment= "Catatan : "+data;
            $$('.comment').html(comment);   
        }
    });   
}
myApp.onPageInit('driverPassenger', function (page) {
    setGlobal();
    local= checkLocal("driverPassenger");

    if(checkConnection())
    {
        if(local!=false)
        {
            myApp.confirm('Ada data lokal yang tersimpan, upload jawaban ke server?', 'Sinkron data?', function () {
                $$.post(directory,{opsi:'jawabDriverPassenger', nrp:nrpMhs, jawab: local["jawaban"], id: local["idSoal"]}, function(data){
                    console.log(data);
                });   
                localStorage.removeItem(nrpMhs+"driverPassenger");
                mainView.router.refreshPage();
            }, function () {
                localStorage.removeItem(nrpMhs+"driverPassenger");
                mainView.router.refreshPage();
            });
        }
        else
        {
            $$.post(directory,{opsi:'getDriverPassenger', nrp:nrpMhs}, function(data){
                console.log(data);
                $$('#formDriverPassenger').html(data);
                $$('.overlay, .overlay-message').hide();
            });   
            getComment(11);
        }
    }
    else
    {
        var soalDriverPassenger=[{id_soal:38,soal:"Anto terpaksa mengikuti GPB karena diwajibkan. Ia hanya mengenal sedikit sekali peserta GPB. Ia merasa jengkel karena Ubaya mengharuskan ia untuk ikut GPB. Di sesi awal ia sudah mulai merasa malas untuk terlibat."},
            {id_soal:42,soal:"soalkosong"},
            {id_soal:39,soal:"Bella memasuki fakultas X di Ubaya akan tetapi sebetulnya ia tidak tahu dia akan menjadi apa di masa depan. Ia merasa ketakutan mendengar banyaknya mata kuliah yang harus ia ambil dan banyaknya tugas yang harus dikerjakan. Sebagai akibatnya ia mulai lebih banyak keluar untuk jalanjalan ke mal-mal, cangkruk dengan teman-temannya."},
            {id_soal:43,soal:"soalkosong"},
            {id_soal:40,soal:"Chika adalah mahasiswa baru Ubaya yang berasal dari kota Palu, Sulawesi. Di SMAnya di kota Palu ia adalah siswa populer dan berprestasi. Akan tetapi di Ubaya dan di kota Surabaya ia betul-betul merasa asing dan tidak ada teman. Ia merasa bahwa logat bicaranya beda sendiri dari temanteman fakultas dan kos-kosannya. Ia bahkan curiga bahwa teman-teman fakultasnya membicarakan tentang dia dengan menggunakan bahasa Jawa, yang tidak ia pahami"},
            {id_soal:44,soal:"soalkosong"},
            {id_soal:41,soal:"Dudung adalah mahasiswa Ubaya yang sangat doyan bermain video game. Begitu doyannya Dudung dengan video game sampai ia menghabiskan waktu berjam-jam setiap hari bermain game. Akibatnya studi Dudung di Ubaya terganggu. Nilai-nilainya anjlok karena ia tak pernah belajar akibat waktunya dihabiskan bermain video game. Ia sadar bahwa ia bermasalah, tapi ia merasa tak bisa melepaskan diri dari kebiasaannya tersebut."},
            {id_soal:45,soal:"soalkosong."}
        ];
        var temp ="";
        //localStorage.removeItem(nrpMhs+"kisahEntong");

        for (var i = 0; i <soalDriverPassenger.length; i+=2) {
            temp+='<div class="card">'+
                            '<div class="card-header" >'+soalDriverPassenger[i]["soal"]+'</div>'+
                            '<div class="card-content">'+
                                '<div class="card-content-inner">'+
                                    '<p>Driver :</p>'+
                                    '<textarea class="areajawab" rows="3" style="height:auto; width:100%" id='+soalDriverPassenger[i]["id_soal"]+'>';
                if(local!=false){
                    temp += local["jawaban"][i];
                }

                temp+=             '</textarea>'+
                                    '<p>Passenger :</p>'+
                                    '<textarea class="areajawab" rows="3" style="height:auto; width:100%" id='+soalDriverPassenger[i+1]["id_soal"]+'>';
                if(local!=false){
                    temp += local["jawaban"][i+1];
                }

                temp+=             '</textarea>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
        }

        $$('#formDriverPassenger').html(temp);

        $$('.overlay, .overlay-message').hide();
    }

    $$('#btnSubmitDriverPassenger').on('click', function () {
        var jawabanAwal=[];
        var idsoal=[];

        $$('.areajawab').each(function(){
          jawabanAwal.push($$(this).val());
          idsoal.push($$(this).attr('id'));
        })
        if(checkConnection())
        {
            $$.post(directory,{opsi:'jawabDriverPassenger', nrp:nrpMhs, jawab: jawabanAwal, id: idsoal}, function(data){
                console.log(data);
                mainView.router.back();
            });   
        }
        else
        {
            myApp.alert("Tidak ada internet, data disimpan secara lokal");   
            var tempArr={jawaban:jawabanAwal, idSoal:idsoal};
            localStorage.setItem(nrpMhs+"driverPassenger",JSON.stringify(tempArr));
            mainView.router.back();
        }
    });    
})

myApp.onPageInit('mybigdream', function (page) {
    setGlobal();

    document.addEventListener("deviceready", function(){
        var local = checkLocal("BigDream");
        if(checkConnection())
        {
            $$.post(directory,{opsi:'ambilBigDream', nrp:nrpMhs}, function(data){
                if(data!="")
                {
                    if(local!=false)
                    {
                        if(local==data)
                        {
                            $$('#jawabBigDream').html(data);   
                        }
                        else
                        {
                            myApp.confirm('Ada data lokal yang tersimpan, apakah anda ingin menggunakan data lokal?', 'Sinkron data?', function () {
                                $$.post(directory,{opsi:'jawabBigDream',nrp:nrpMhs,jawab:local}, function(data){
                                    console.log(data);
                                    $$('#jawabBigDream').html(local);          
                                });   
                            }, function () {
                                $$('#jawabBigDream').html(data);  
                                localStorage.removeItem(nrpMhs+"BigDream");

                            });
                        }   
                    }
                    else
                    {
                        $$('#jawabBigDream').html(data);
                    }   
                }
                else
                {
                    if(local!=false)
                    {
                        $$('#jawabBigDream').html("haha");   
                    }
                }
                $$('.overlay, .overlay-message').hide();
            });  
            getComment(1);
        }
        else
        {
            if(local!=false)
            {
                $$('#jawabBigDream').html(local);   
            }
            $$('.overlay, .overlay-message').hide();
        }
        
        $$('#btnSubmitBigDream').on('click', function () {

            var jawaban= document.getElementById("jawabBigDream").value;

            if(jawaban==""){
                myApp.alert('Tolong isi Big Dream');
            }
            else{
                if(checkConnection())
                {
                    $$.post(directory,{opsi:'jawabBigDream',nrp:nrpMhs,jawab:jawaban}, function(data){
                        console.log(data);
                        mainView.router.back({url: 'pilihBigDream.html',force: true,ignoreCache: true});
                    });   
                }
                else
                {
                    myApp.alert("Tidak ada internet, data disimpan secara lokal");
                    localStorage.setItem(nrpMhs+"BigDream", JSON.stringify(jawaban));
                    mainView.router.back({url: 'pilihBigDream.html',force: true,ignoreCache: true});
                }
            }
            
        });
    }, false); 
})

myApp.onPageInit('tujuanHidup', function (page) {
    setGlobal();
    //localStorage.removeItem(nrpMhs+"TujuanHidup");
    document.addEventListener("deviceready", function(){
        var local = checkLocal("TujuanHidup");
        if(checkConnection())
        {
            getComment(10);
            if(local!=false)
            {
                myApp.confirm('Ada data lokal yang tersimpan, upload jawaban ke server?', 'Sinkron data?', function () {
                    for (var i = 0; i <local.length; i++) 
                    {
                        $$.post(directory,{opsi:'addTujuan', nrp:nrpMhs, jawab:local[i]["tujuan"]}, function(data){
                            $$('#listTujuan').append(data);
                        });   
                    }  
                    localStorage.removeItem(nrpMhs+"TujuanHidup");
                    mainView.router.refreshPage();
                }, function () {
                    localStorage.removeItem(nrpMhs+"TujuanHidup");
                });
            }

            $$.post(directory,{opsi:'getTujuanHidup', nrp:nrpMhs}, function(data){
                if(data!="")
                {
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
                    $$('.deleteTujuan').on('click', function(event){
                        var ids = event.target.id.replace('s','');
                        myApp.confirm('Apakah anda yakin akan menghapus tujuan hidup ini?', 'Apakah Anda Yakin?', function () {
                            if(checkConnection())
                            {
                                var item = document.getElementById(ids);
                                var list = document.getElementById('listTujuan');
                                $$.post(directory,{opsi:'deleteTujuanHidup', id:ids}, function(data){
                                    console.log(data);
                                    list.removeChild(item);
                                });      
                            }   
                            else
                            {
                                alert("Tidak ada koneksi Internet, coba lagi");
                            }
                        });
                    }); 
                }    
            });

            
            $$('.overlay, .overlay-message').hide();
        }
        else
        {
            if(local!=false)
            {
                for (var i = 0; i <local.length; i++) 
                {
                    local[i]["id_tujuan"]=i;
                    $$('#listTujuan').append('<li id="'+i+'">'+
                                              '<div class="item-content">'+
                                                '<div class="item-media"><i class="f7-icons deleteTujuan" id="'+i+'s">close</i></div>'+
                                                '<div class="item-inner">'+
                                                  '<div class="item-title listContent">'+local[i]["tujuan"]+'</div>'+
                                                '</div>'+
                                              '</div>'+
                                            '</li>');   
                }
                $$('.deleteTujuan').on('click', function(event){
                    var ids = event.target.id.replace('s','');
                    myApp.confirm('Apakah anda yakin akan menghapus tujuan hidup ini?', 'Apakah Anda Yakin?', function () {
                        var item = document.getElementById(ids);
                        var list = document.getElementById('listTujuan');

                        local.splice(ids,1);
                        localStorage.setItem(nrpMhs+"TujuanHidup",JSON.stringify(local));
                        list.removeChild(item);
                    });
                });
            }
            $$('.overlay, .overlay-message').hide();
        }
        
        $$('#insertTujuan').on('click', function () {
            var jawaban= document.getElementById("jawabTujuan").value;
            if(jawaban=="")
            {
                myApp.alert('Tolong isi Tujuan Hidup');
            }
            else
            {
                if(checkConnection())
                {
                    $$.post(directory,{opsi:'addTujuan', nrp:nrpMhs, jawab:jawaban}, function(data){
                        $$('#listTujuan').append(data);
                        $$('#jawabTujuan').html("");
                        $$('#jawabTujuan').focus();
                        $$('.deleteTujuan').on('click', function(event){
                            var ids = event.target.id.replace('s','');
                            myApp.confirm('Apakah anda yakin akan menghapus tujuan hidup ini?', 'Apakah Anda Yakin?', function () {
                                if(checkConnection())
                                {
                                    var item = document.getElementById(ids);
                                    var list = document.getElementById('listTujuan');
                                    $$.post(directory,{opsi:'deleteTujuanHidup', id:ids}, function(data){
                                        console.log(data);
                                        list.removeChild(item);
                                    });      
                                }
                                else
                                {
                                    alert("Tidak ada koneksi Internet, coba lagi");
                                }
                            });
                        });
                    });   
                }
                else
                {
                    myApp.alert("Tidak ada internet, data disimpan secara lokal");
                    var temp = {tujuan:jawaban};
                    if(local!=false)
                    {
                        local.push(temp);
                        localStorage.setItem(nrpMhs+"TujuanHidup", JSON.stringify(local));   
                    }
                    else
                    {
                        var tempArr = [];
                        tempArr.push(temp);
                        localStorage.setItem(nrpMhs+"TujuanHidup", JSON.stringify(tempArr));   
                    }
                    mainView.router.refreshPage();
                }
            }
        });
    });
})

function sinkronLifeListActionPlan()
{
    myApp.confirm('Ada data lokal yang tersimpan, upload jawaban ke server?', 'Sinkron data?', function () {
        var local = checkLocal("LifeList");
        if(local!=false)
        {
            for (var i = 0; i < local.length; i++) {
                var action = [];
                if(local[i]["action_plan"]!=undefined)  
                {
                    action= local[i]["action_plan"];
                } 
                $$.post(directory,{opsi:'jawabLifeList', length:900+i, id:"", nrp:nrpMhs, lists:local[i]["list"], targets:local[i]["target"], obstacles:local[i]["obstacle"], evidences:local[i]["evidence"], evaluations:local[i]["evaluation"]}, function(data){

                    for (var j = 0; j <action.length; j++) {
                        $$.post(directory,{opsi:'jawabActionPlan', nrp:nrpMhs,  ids:data, tasks:action[j]["task"], resources:action[j]["resource"], timelines:action[j]["timeline"]}, function(data){
                            
                        }); 
                    }   
                });  
            }
            localStorage.removeItem(nrpMhs+"LifeList");
            mainView.router.refreshPage();  
        }
    }, function () {
        localStorage.removeItem(nrpMhs+"LifeList");
    });
}

myApp.onPageInit('myLifeList', function (page) {
    setGlobal();
    document.addEventListener("deviceready", function(){
        var local = checkLocal("LifeList");
        //localStorage.removeItem(nrpMhs+"LifeList");

        $$('#saveList').hide();
        
        $$('.addLife').on('click', function(){
            var length= $$('#sortableLifeList li').length;
            mainView.router.loadPage('mylifelistDetail.html?length='+length);
        });
        if(checkConnection())
        {
            myApp.sortableOpen('.sortable');
            $$('.sortable').on('sort', function (listEl, indexes) {
                $$('#saveList').show();
            });
            if(local!=false)
            {
                sinkronLifeListActionPlan();
                mainView.router.refreshPage();  
            }
            getComment(2);
            $$.post(directory,{opsi:'getLifeList', nrp:nrpMhs}, function(data){
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
                        if(checkConnection())
                        {
                            var item = document.getElementById(ids);
                            var list = document.getElementById('sortableLifeList');
                            list.removeChild(item);
                            $$.post(directory,{opsi:'deleteLifeList', nrp:nrpMhs, id:ids}, function(data){
                                console.log(data);
                            });   
                        }
                        else
                        {
                            myApp.alert("Tidak ada koneksi Internet, coba lagi");
                        }
                    });
                });
            });
            $$('.overlay, .overlay-message').hide();
        }
        else
        {
            if(local!=false)
            {
                for (var i = 0; i <local.length; i++) 
                {
                    $$('#sortableLifeList').append('<li class="listContent" id="'+i+'">'+
                                                          '<div class="sortable-handler"></div>'+
                                                          '<div class="item-content">'+
                                                            '<div class="item-media"><i class="f7-icons deleteList" id="'+i+'s">close</i></div>'+
                                                            '<div class="item-inner">'+
                                                              '<a href="mylifelistDetail.html?idList='+local[i]["id"]+'&length='+local.length+'"><div class="item-title ">'+local[i]["list"]+'</div></a>'+
                                                            '</div>'+
                                                          '</div>'+
                                                        '</li>');
                }
                $$('.deleteList').on('click', function(event){
                    var ids = event.target.id.replace('s','');
                    myApp.confirm('Apakah anda yakin akan menghapus tujuan hidup ini?', 'Apakah Anda Yakin?', function () {
                        var item = document.getElementById(ids);
                        var list = document.getElementById('sortableLifeList');

                        local.splice(ids,1);
                        localStorage.setItem(nrpMhs+"LifeList",JSON.stringify(local));
                        list.removeChild(item);
                    });
                });
                $$(".tempButton").hide();
            }
            else
            {
                $$('.floating-button').hide();
                $$('.instruction').hide();
            }
            $$('.overlay, .overlay-message').hide();
        } 
    });
    
    $$('#saveList').on('click', function(){
        var jawaban = [];

        $$('.listContent').each(function(){
          jawaban.push($$(this).attr('id'));
        })

        if(checkConnection())
        {
            $$.post(directory,{opsi:'updatePrioritas', nrp:nrpMhs, jawab:jawaban}, function(data){
                myApp.alert("Prioritas baru tersimpan");
                console.log(jawaban);
                $$('#saveList').hide();
            }); 
        }
        else
        {
           myApp.alert("Tidak ada koneksi Internet, coba lagi");
        }  
    });
})

myApp.onPageInit('mylifelistDetail', function (page) {
    setGlobal();
    // document.addEventListener("deviceready", function(){

    //     var timeline2 = myApp.calendar({
    //         input: '#calendar-events-tercapai',
    //         dateFormat: 'yyyy-mm-dd',
    //         monthPicker: true,
    //         yearPicker: true
    //     });
    //     var calendarDefault = myApp.calendar({
    //         input: '#calendar-default',
    //     }); 
    // })

    var today = new Date();
   
    var pickerInline = myApp.picker({
        input: '#picker-date',
        toolbar: false,
        rotateEffect: true,
     
        value: [today.getFullYear(), today.getMonth(), today.getDate()],

        onChange: function (picker, values, displayValues) {
            console.log(picker.value[0]+"   "+picker.value[1]);
            var daysInMonth = new Date(picker.value[0], picker.value[1]*1 + 1, 0).getDate();
            if (values[2] > daysInMonth) {
                picker.cols[2].setValue(daysInMonth);
            }
        },
        formatValue: function (p, values, displayValues) {
            var month = values[1];
            month++;
            if(month<10){
                month = "0"+month;
            }
            return values[0] + '-' + month + '-' + values[2];
        },
        cols: [
            // Years
            {
                values: (function () {
                    var arr = [];
                    for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Months
            {
                values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                displayValues: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
                textAlign: 'left'
            },
            // Days
            {
                values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            }
        ]
    });   

    

    var obstacle=document.getElementById("obstacle");
    var list=document.getElementById("lifelist");
    var evidence=document.getElementById("evidence");
    var evaluation=document.getElementById("evaluation");
    var target=document.getElementById("picker-date");
    var idList="";
    var local = checkLocal("LifeList");
    if(page.query.idList)
    {
        idList = page.query.idList;
        if(checkConnection())
        {
            $$.post(directory,{opsi:'getLifeListDetail', id:page.query.idList}, function(data){
                console.log(data);
                var result = JSON.parse(data);
                list.value = result["list"];
                obstacle.value = result["obstacle"];
                evidence.value = result["evidence"];
                evaluation.value = result["evaluation"];
                target.value = result["target"];
            });    
        }  
        else if(local!=false)
        {
            list.value = local[idList]["list"];
            obstacle.value = local[idList]["obstacle"];
            evidence.value = local[idList]["evidence"];
            evaluation.value = local[idList]["evaluation"];
            target.value = local[idList]["target"];
        }
        $$('.overlay, .overlay-message').hide();

    }
    else
    {
        $$('.overlay, .overlay-message').hide();
    }

    $$('#btnSubmit').on('click', function(){
        if(list.value !=''&&target.value!=""&&obstacle.value!=""&&evidence.value!=""&&evaluation.value!="")
        {
            if(checkConnection())
            {
                $$.post(directory,{opsi:'jawabLifeList', length:page.query.length, id:idList, nrp:nrpMhs, lists:list.value, targets:target.value, obstacles:obstacle.value, evidences:evidence.value, evaluations:evaluation.value}, function(data){
                    console.log(data);
                    if(data!=0)
                    {
                        mainView.router.back({url: 'mylifelist.html',force: true,ignoreCache: true});
                    }
                }); 
            }
            else
            {
                myApp.alert("Tidak ada internet, data disimpan secara lokal");
                var temp = {length:page.query.length, id:idList, nrp:nrpMhs, list:list.value, target:target.value, obstacle:obstacle.value, evidence:evidence.value, evaluation:evaluation.value};
                if(local!=false)
                {
                    if(idList!="" && local[idList]!=undefined)
                    {
                        local[idList] = temp;   
                    }
                    else
                    {
                        temp["id"] = local.length;
                        local[local.length] = temp;   
                    }
                    localStorage.setItem(nrpMhs+"LifeList", JSON.stringify(local));   
                }
                else
                {
                    var tempArr = [];
                    temp["id"] = 0;
                    tempArr.push(temp);
                    localStorage.setItem(nrpMhs+"LifeList", JSON.stringify(tempArr));   
                }
                mainView.router.back({url:'mylifelist.html',force: true, ignoreCache:true});
            }
   
        }  
        else{
            myApp.alert("Tolong isi Detail Life List");
        }
    });
})

myApp.onPageInit('formActionPlan', function (page) {
    setGlobal();
    var local = checkLocal("LifeList");

    if(checkConnection())
    {
        if(local!=false)
        {
            sinkronLifeListActionPlan();   
            mainView.router.refreshPage();           
        }
        getComment(3);
        $$.post(directory,{opsi:'getLifeList', nrp:nrpMhs}, function(data){
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
    }
    else
    {
        if(local!=false)
        {   
            for(var i=0;i<local.length;i++){
                $$('#listMyLifeList').append('<li id="'+i+'">'+
                                                '<a href="formActionPlanDetail.html?idLifeList='+i+'&LifeList='+local[i]["list"]+'">'+
                                                '<div class="item-content">'+
                                                    '<div class="item-inner">'+
                                                      '<div class="item-title">'+local[i]["list"]+'</div>'+
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
    }
})

myApp.onPageInit('formActionPlanDetail', function (page) {
    setGlobal();
    var idLife=page.query.idLifeList;
    $$('#judulActionPlanForm').html(page.query.LifeList);
    var local = checkLocal("LifeList");
    if(checkConnection())
    {
        if(local!=false)
        {
            sinkronLifeListActionPlan();
        }
        else
        {
            $$.post(directory,{opsi:'getActionPlan', nrp:nrpMhs, ids:idLife}, function(data){
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
        } 
    }
    else
    {
        if(local!=false)
        {
            local = local[idLife]["action_plan"];
            if(local!=undefined)
            {
                for(var i=0;i<local.length;i++)
                {   
                   $$('#listTabelFormActionPlan').append('<div class="card">'+
                        '<a href="formActionPlanForm.html?idLifeList='+idLife+'&idTabel='+i+'&LifeList="'+page.query.LifeList+'>'+
                        '<div class="card-header" style="text-align:center;" >'+(i+1)+'</div>'+
                        '<div class="card-content">'+
                            '<div class="card-content-inner">'+
                                '<div>Task/Action : '+local[i]["task"]+'</div>'+ 
                                '<div>Resources : '+local[i]["resource"]+'</div>'+ 
                                '<div>Timeline : '+local[i]["timeline"]+'</div>'+ 
                            '</div>'+
                        '</div></a></div>');
                }
                $$('.overlay, .overlay-message, .tempButton').hide();
            }
            else
            {
                $$('.overlay, .overlay-message, .floating-button').hide();
            }
        }
        else
        {
            $$('.overlay, .overlay-message, .floating-button').hide();
        }
    }

    $$('.addPlan').on('click', function () {
       mainView.router.loadPage("formActionPlanForm.html?idLifeList="+idLife+"&idLife="+idLife+"&LifeList="+page.query.LifeList);
    });        
})

myApp.onPageInit('formActionPlanForm', function (page) {
    setGlobal();
    var task=document.getElementById("task");
    var resource=document.getElementById("resource");
    
    // var timeline1 = myApp.calendar({
    //     input: '#calendar-events',
    //     dateFormat: 'yyyy-mm-dd',
    //     monthPicker:true,
    //     yearPicker:true,
    //     closeOnSelect:true
    // });
    var today = new Date();
    var pickerInline = myApp.picker({
        input: '#picker-date',
        toolbar: false,
        rotateEffect: true,
     
        value: [today.getFullYear(), today.getMonth(), today.getDate()],

        onChange: function (picker, values, displayValues) {
            var daysInMonth = new Date(picker.value[0], picker.value[1]*1 + 1, 0).getDate();
            if (values[2] > daysInMonth) {
                picker.cols[2].setValue(daysInMonth);
            }
        },
        formatValue: function (p, values, displayValues) {
            var month = values[1];
            if(month<10){
                month = "0"+month;
            }
            return values[0] + '-' + month + '-' + values[2];
        },
        cols: [
            // Years
            {
                values: (function () {
                    var arr = [];
                    for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Months
            {
                values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                displayValues: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
                textAlign: 'left'
            },
            // Days
            {
                values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            }
        ]
    });   
    var timeline=document.getElementById("picker-date");
    var local=checkLocal("LifeList");
    var action="";
    var idLife=page.query.idLifeList;
    var idTabel="";
    if(page.query.idTabel) // misal ada idtabel brarti buat edit, tampilno smua value lama
    {
        idTabel=page.query.idTabel;
        if(checkConnection())
        {
            if(local!=false)
            {
                sinkronLifeListActionPlan();
            }
            else
            {
                $$.post(directory,{opsi:'getDetailActionPlan', ids:idTabel}, function(data){
                    console.log(data);
                    var result = JSON.parse(data);
                    task.value=result["task"];
                    resource.value=result["resource"];
                    timeline.value=result["timeline"];
                    $$('.overlay, .overlay-message').hide();
                });         
                document.getElementById("btnDeleteActionPlanTabel").style.visibility = "visible";
            }
        }
        else
        {
            if(local!=false && local[idLife]["action_plan"][idTabel]!=undefined)
            {
                action=local[idLife]["action_plan"][idTabel];
                task.value=action["task"];
                resource.value=action["resource"];
                timeline.value=action["timeline"];
                $$('.overlay, .overlay-message').hide();
                document.getElementById("btnDeleteActionPlanTabel").style.visibility = "visible";
            }
            else
            {
                $$('.overlay, .overlay-message').hide();
                mainView.router.back({url:"formActionPlan.html", force:true, ignoreCache:true});
            }
        }

        $$('#btnSubmitTabel').on('click', function () {
            if(checkConnection())
            {
                $$.post(directory,{opsi:'updateActionPlan',nrp:nrpMhs, ids:idTabel, tasks:task.value, resources:resource.value, timelines:timeline.value}, function(data){
                    console.log(data);
                    mainView.router.back({url: 'formActionPlanDetail.html?idLifeList='+idLife+'&LifeList='+page.query.LifeList,force: true,ignoreCache: true});
                });    
            } 
            else
            {
                if(local!=false)
                {
                    action["task"]=task.value;
                    action["resource"]=resource.value;
                    action["timeline"]=timeline.value;
                    local[idLife]["action_plan"][idTabel] = action;
                    localStorage.setItem(nrpMhs+"LifeList", JSON.stringify(local));
                    myApp.alert("Perubahan berhasil disimpan");
                    //mainView.router.back({url: 'formActionPlanDetail.html?idLifeList='+idLife+'&LifeList='+page.query.LifeList,force: true,ignoreCache: true});
                }
                else
                {
                    mainView.router.back({url: 'formActionPlan.html',force: true,ignoreCache: true});
                }
            }
        });
    }
    else{
        idTabel=page.query.idLife;

        $$('#btnSubmitTabel').on('click', function () {
            if(checkConnection())
            {
                $$.post(directory,{opsi:'jawabActionPlan', nrp:nrpMhs,  ids:idTabel, tasks:task.value, resources:resource.value, timelines:timeline.value}, function(data){
                    console.log(data);
                    mainView.router.back({url: 'formActionPlanDetail.html?idLifeList='+idLife+'&LifeList='+page.query.LifeList,force: true,ignoreCache: true});
                });  
            }
            else
            {
                if(local!=false)   
                {
                    var temp = {task: task.value, resource:resource.value, timeline:timeline.value};
                    if(local[idLife]["action_plan"]!=undefined)
                    {
                        temp["id"] = local[idLife]["action_plan"].length;
                        local[idLife]["action_plan"].push(temp);
                    }
                    else
                    {
                        var tempArr = [];
                        temp["id"]=0;
                        tempArr.push(temp);
                        local[idLife]["action_plan"]=tempArr;
                    }
                    localStorage.setItem(nrpMhs+"LifeList", JSON.stringify(local));
                    mainView.router.back({url: 'formActionPlanDetail.html?idLifeList='+idLife+'&LifeList='+page.query.LifeList,force: true,ignoreCache: true});
                }
                else
                {
                    mainView.router.back({url:'formActionPlan.html', force:true,ignoreCache:true});
                }
            }
        });
        
        $$('.overlay, .overlay-message').hide();
    }

    $$('#btnDeleteActionPlanTabel').on('click', function () {
        if(checkConnection())
        {
            myApp.confirm('Apakah anda yakin akan menghapus Action Plan ini?', 'Apakah Anda Yakin?', function () {
                $$.post(directory,{opsi:'deleteActionPlan',  ids:idTabel}, function(data){
                    console.log(data);
                });  
                mainView.router.back({url:'formActionPlanDetail.html?idLifeList='+idLife+'&LifeList='+page.query.LifeList,force: true,ignoreCache: true});
            });   
        }
        else
        {
            if(action!="")
            {
                local[idLife]["action_plan"].splice(idTabel,1);
                localStorage.setItem(nrpMhs+"LifeList", JSON.stringify(local));
            }
            mainView.router.back({url:'formActionPlan.html'});
        }
    });
})

myApp.onPageInit('kisahEntong', function (page) {
    setGlobal();
    local= checkLocal("kisahEntong");
    if(checkConnection())
    {
        if(local!=false)
        {
            myApp.confirm('Ada data lokal yang tersimpan, upload jawaban ke server?', 'Sinkron data?', function () {
                $$.post(directory,{opsi:'jawabKisahEntong', nrp:nrpMhs, jawab: local["jawaban"], id: local["idSoal"]}, function(data){
                    console.log(data);
                });   
                localStorage.removeItem(nrpMhs+"kisahEntong");
                mainView.router.refreshPage();
            }, function () {
                localStorage.removeItem(nrpMhs+"kisahEntong");
                mainView.router.refreshPage();
            });
        }
        else
        {
            $$.post(directory,{opsi:'getKisahEntong', nrp:nrpMhs}, function(data){
                console.log(data);
                $$('#formKisahEntong').html(data);
                $$('.overlay, .overlay-message').hide();
            });   
            getComment(4);
        }
    }
    else
    {
        var soalEntong=[{id_soal:22,soal:"Yang kupikirkan tentang impian masa depan dan kondisi nenek yang dicintai si Entong"},
            {id_soal:23,soal:"Emosi yang kurasakan seandainya aku menghadapi dilema si Entong"},
            {id_soal:24,soal:"Potensi positif atau kekuatan yang kumiliki yang dapat kugunakan untuk menyelesaikan kondisi dilematis si Entong"},
            {id_soal:25,soal:"Potensi negatif atau keterbatasan yang kumiliki yang dapat menghalangi proses penyelesaian kondisi dilematis si Entong"},
            {id_soal:26,soal:"Tiga Hal positif yang dapat kutemukan dari kisah di entong"}
        ];
        var temp ="";
        //localStorage.removeItem(nrpMhs+"kisahEntong");
        for (var i = 0; i <soalEntong.length; i++) {
            temp+='<div class="card">'+
                            '<div class="card-header" >'+soalEntong[i]["soal"]+'</div>'+
                            '<div class="card-content">'+
                                '<div class="card-content-inner">'+
                                    '<textarea class="areajawab" rows="3" style="height:auto; width:100%" id='+soalEntong[i]["id_soal"]+'>';
                if(local!=false){
                    temp += local["jawaban"][i];
                }

                temp+=             '</textarea>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
        }
        $$('#formKisahEntong').html(temp);
        $$('.overlay, .overlay-message').hide();
    }

    $$('#btnSubmitKisahEntong').on('click', function () {
        var jawabanEntong=[];
        var idsoal=[];

        $$('.areajawab').each(function(){
          jawabanEntong.push($$(this).val());
          idsoal.push($$(this).attr('id'));
        })
        console.dir(jawabanEntong);

        if(checkConnection())
        {
            $$.post(directory,{opsi:'jawabKisahEntong', nrp:nrpMhs, jawab: jawabanEntong, id: idsoal}, function(data){
                console.log(data);
                mainView.router.back();
            });   
        }
        else
        {
            myApp.alert("Tidak ada internet, data disimpan secara lokal");   
            var tempArr={jawaban:jawabanEntong, idSoal:idsoal};
            localStorage.setItem(nrpMhs+"kisahEntong",JSON.stringify(tempArr));
            mainView.router.back();
        }
    });    
})

myApp.onPageInit('lessonLearned', function (page) {
    setGlobal();
    $$('#saveLesson').hide();
    local= checkLocal("lessonLearned");
    if(checkConnection())
    {
        if(local!=false)
        {
            myApp.confirm('Ada data lokal yang tersimpan, upload jawaban ke server?', 'Sinkron data?', function () {
                for(var i=0;i<local.length;i++)
                {
                    $$.post(directory,{opsi:'addLessonLearned', nrp:nrpMhs, jawab:local[i]["jawab"]}, function(data){
                    });   
                }
                localStorage.removeItem(nrpMhs+"lessonLearned");
                mainView.router.refreshPage();
            }, function () {
                localStorage.removeItem(nrpMhs+"lessonLearned");
            });
        }
        getComment(5);
        $$.post(directory,{opsi:'getLessonLearned', nrp:nrpMhs}, function(data){
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
    }
    else
    {
        if(local!=false)
        {
            var temp ="";
            for(var i=0;i<local.length;i++)
            {
                temp+='<li id="'+i+'">'+
                              '<div class="item-content">'+
                                '<div class="item-media"><i class="f7-icons deleteLesson" id="'+i+'s">close</i></div>'+
                                '<div class="item-inner">'+
                                  '<div class="item-title listContent">'+local[i]["jawab"]+'</div>'+
                                '</div>'+
                              '</div>'+
                            '</li>';   
            }
            $$('#listJawabanLessonLearned').html(temp);
            $$('.deleteLesson').on('click', function(event){
                var ids = event.target.id.replace('s','');
                var item = document.getElementById(ids);
                var list = document.getElementById('listJawabanLessonLearned');
                myApp.confirm('Apakah anda yakin akan menghapus Lesson Learned ini?', 'Apakah Anda Yakin?', function () {
                    local.splice(ids,1);
                    list.removeChild(item);
                    localStorage.setItem(nrpMhs+"lessonLearned",JSON.stringify(local));
                });
            });
        }
        $$('.overlay, .overlay-message').hide();
    }

    $$('#insertLesson').on('click', function () {
        var jawaban= document.getElementById("jawabLesson").value;
        if(jawaban==""){
            myApp.alert('Tolong isi Lesson Learned');
        }
        else{
            if(checkConnection())
            {
                $$.post(directory,{opsi:'addLessonLearned', nrp:nrpMhs, jawab:jawaban}, function(data){
                    $$('#listJawabanLessonLearned').append(data);
                    $$('#jawabLesson').html("");
                    $$('#jawabLesson').focus();
                    $$('.deleteLesson').on('click', function(event){
                        var ids = event.target.id.replace('s','');
                        var item = document.getElementById(ids);
                        var list = document.getElementById('listJawabanLessonLearned');
                        myApp.confirm('Apakah anda yakin akan menghapus Lesson Learned ini?', 'Apakah Anda Yakin?', function () {
                            list.removeChild(item);

                            $$.post(directory,{opsi:'deleteLessonLearned', nrp:nrpMhs, id:ids}, function(data){
                                console.log(data);
                            });   
                        });
                    });
                });   
            }
            else
            {
                myApp.alert("Tidak ada internet, data disimpan secara lokal");   
                if(local!=false)
                {
                    local.push({jawab:jawaban});
                }
                else
                {
                    local = [{jawab:jawaban}];
                }
                localStorage.setItem(nrpMhs+"lessonLearned",JSON.stringify(local));
                mainView.router.refreshPage();
            }
        }
    });
})

myApp.onPageInit('pilihManajemenEmosi', function (page) {
    //belum diisi
})

myApp.onPageInit('studiKasus', function (page) {
    setGlobal();
    local = checkLocal("studiKasus");
    $$('.addStudi').on('click', function () {
        mainView.router.loadPage("studiKasusForm.html");
    });

    if(checkConnection())
    {
        if(local!=false)
        {
            myApp.confirm('Ada data lokal yang tersimpan, upload jawaban ke server?', 'Sinkron data?', function () {
                for (var i = 0; i <local.length; i++) {
                    $$.post(directory,{opsi:'jawabStudiKasus', nrp:nrpMhs, situasis: local[i]["situasi"], pemikirans: local[i]["pemikiran"], emosis:local[i]["emosi"], perilakus:local[i]["perilaku"]}, function(data){
                        console.log(data);
                    });    
                } 
                localStorage.removeItem(nrpMhs+"studiKasus");
                mainView.router.refreshPage();
            }, function () {
                localStorage.removeItem(nrpMhs+"studiKasus");
            });
        }
        getComment(6);
        $$.post(directory,{opsi:'getStudiKasus', nrp:nrpMhs}, function(data){
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
    }
    else
    {
        if(local!=false)
        {
            for(var i=0;i<local.length;i++)
            {
                $$('#listKasus').append('<a href="studiKasusForm.html?idKasus='+i+'" >'+
                    '<div class="card">'+
                    '<div class="card-header" style="text-align:center;" >'+(i+1)+'</div>'+
                    '<div class="card-content">'+
                    '<div class="card-content-inner">'+
                    '<div>Situasi : '+local[i]["situasi"]+'</div>'+ 
                    '<div>Pemikiran : '+local[i]["pemikiran"]+'</div>'+ 
                    '<div>Emosi : '+local[i]["emosi"]+'</div>'+ 
                    '<div>Perilaku : '+local[i]["perilaku"]+'</div>'+ 
                    '</div>'+
                    '</div></a>');
            }   
            $$('.overlay, .overlay-message, .tempButton').hide();    
        }
        else
        {
            $$('.overlay, .overlay-message, .floating-button').hide();    
        }
    }
})

myApp.onPageInit('studiKasusForm', function (page) {
    setGlobal();
    var situasi=document.getElementById("situasi");
    var pemikiran=document.getElementById("pemikiran");
    var emosi=document.getElementById("emosi");
    var perilaku=document.getElementById("perilaku");
    var local = checkLocal("studiKasus");
    if(page.query.idKasus)
    {
        var idStudiKasus=page.query.idKasus;
        if(checkConnection())
        {
            $$.post(directory,{opsi:'getDetailStudiKasus', nrp:nrpMhs, id:idStudiKasus}, function(data){
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
                    if(checkConnection())
                    {
                         $$.post(directory,{opsi:'deleteStudiKasus',  id:idStudiKasus}, function(data){
                            console.log(data);
                            mainView.router.back();
                        });    
                    } 
                    else
                    {
                        myApp.alert("Tidak ada koneksi Internet, coba lagi");
                    }
                });
            });   
        }
        else
        {
            if(local!=false)
            {
                situasi.value= local[idStudiKasus]["situasi"];
                pemikiran.value=local[idStudiKasus]["pemikiran"];
                emosi.value=local[idStudiKasus]["emosi"];
                perilaku.value=local[idStudiKasus]["perilaku"];
                document.getElementById("btnDeleteStudiKasus").style.visibility = "visible";
                $$('.overlay, .overlay-message').hide();

                $$('#btnDeleteStudiKasus').on('click', function () {
                    myApp.confirm('Apakah anda yakin akan menghapus Studi Kasus ini?', 'Apakah Anda Yakin?', function () {
                        local.splice(idStudiKasus,1);
                        localStorage.setItem(nrpMhs+"studiKasus",JSON.stringify(local));
                        mainView.router.back();
                    });
                });   
            }
        }

        $$('#btnSubmitStudiKasus').on('click', function () {
            if(checkConnection())
            {
                $$.post(directory,{opsi:'updateStudiKasus',  id:idStudiKasus, situasis: situasi.value, pemikirans: pemikiran.value, emosis:emosi.value, perilakus:perilaku.value}, function(data){
                    console.log(data);
                });    
            }
            else
            {
                if(local!=false)
                {
                    if(local[idStudiKasus]!=undefined)
                    {
                        local[idStudiKasus] = {situasi:situasi.value, pemikiran: pemikiran.value, emosi:emosi.value, perilaku:perilaku.value};
                        localStorage.setItem(nrpMhs+"studiKasus", JSON.stringify(local));
                    }
                }   
            } 
            mainView.router.back({url:"studiKasus.html",force: true,ignoreCache: true});
        });
    }
    else
    {
        $$('.overlay, .overlay-message').hide();

        $$('#btnSubmitStudiKasus').on('click', function () {
            if(checkConnection())
            {
                $$.post(directory,{opsi:'jawabStudiKasus', nrp:nrpMhs, situasis: situasi.value, pemikirans: pemikiran.value, emosis:emosi.value, perilakus:perilaku.value}, function(data){
                    console.log(data);
                }); 
            }
            else
            {
                myApp.alert("Tidak ada internet, data disimpan secara lokal");  
                if(local!=false)
                {
                    local.push({situasi:situasi.value, pemikiran: pemikiran.value, emosi:emosi.value, perilaku:perilaku.value});
                }
                else
                {
                    local = [{situasi:situasi.value, pemikiran: pemikiran.value, emosi:emosi.value, perilaku:perilaku.value}];
                }
                localStorage.setItem(nrpMhs+"studiKasus", JSON.stringify(local));
            }
            mainView.router.back({url: "studiKasus.html",force: true,ignoreCache: true});
        });
    }
})

myApp.onPageInit('pengalamanPribadi', function (page) {
    setGlobal();
    local = checkLocal("pengalamanPribadi");
    $$('.addPengalaman').on('click', function () {
        mainView.router.loadPage("pengalamanPribadiForm.html");
    });

    if(checkConnection())
    {
        if(local!=false)
        {
            myApp.confirm('Ada data lokal yang tersimpan, upload jawaban ke server?', 'Sinkron data?', function () {
                for (var i = 0; i <local.length; i++) {
                    $$.post(directory,{opsi:'jawabPengalaman', nrp:nrpMhs, situasis: local[i]["situasi"], strategis: local[i]["strategi"], emosis:local[i]["emosi"]}, function(data){
                        console.log(data);
                    });   
                } 
                localStorage.removeItem(nrpMhs+"pengalamanPribadi");
                mainView.router.refreshPage();
            }, function () {
                localStorage.removeItem(nrpMhs+"pengalamanPribadi");
            });
        }
        getComment(7);
        $$.post(directory,{opsi:'getPengalaman', nrp:nrpMhs}, function(data){
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
    }
    else
    {
        if(local!=false)
        {
            for(var i=0;i<local.length;i++)
            {
                $$('#listPengalaman').append('<a href="pengalamanPribadiForm.html?idPengalaman='+i+'" >'+
                            '<div class="card">'+
                            '<div class="card-header" style="text-align:center;" >'+(i+1)+'</div>'+
                            '<div class="card-content">'+
                            '<div class="card-content-inner">'+
                            '<div>Emosi : '+local[i]["emosi"]+'</div>'+ 
                            '<div>Situasi : '+local[i]["situasi"]+'</div>'+ 
                            '<div>Strategi : '+local[i]["strategi"]+'</div>'+ 
                            '</div>'+
                            '</div></a>');
            }   
            $$('.overlay, .overlay-message, .tempButton').hide();    
        }
        else
        {
            $$('.overlay, .overlay-message, .floating-button').hide();    
        }
    }
})

myApp.onPageInit('pengalamanPribadiForm', function (page) {
    setGlobal();
    var emosi=document.getElementById("emosi2");
    var situasi=document.getElementById("situasi2");
    var strategi=document.getElementById("strategi");
    $$('.page-on-left').remove();
    var local = checkLocal("pengalamanPribadi");
    if(page.query.idPengalaman)
    {
        var idPengalaman=page.query.idPengalaman;
        if(checkConnection())
        {

            $$.post(directory,{opsi:'getDetailPengalaman', nrp:nrpMhs, id:idPengalaman}, function(data){
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
                    if(checkConnection())
                    {
                        $$.post(directory,{opsi:'deletePengalaman',  id:idPengalaman}, function(data){
                            console.log(data);
                        });  
                    }
                    else
                    {
                        myApp.alert("Tidak ada koneksi Internet, coba lagi");
                    }
                    mainView.router.back({url: "pengalamanPribadi.html",force: true,ignoreCache: true});
                });
            });    
        }
        else
        {
            if(local!=false)
            {
                emosi.value=local[idPengalaman]["emosi"];
                situasi.value= local[idPengalaman]["situasi"];
                strategi.value=local[idPengalaman]["strategi"];
                document.getElementById("btnDeletePengalamanPribadi").style.visibility = "visible";
                $$('#btnDeletePengalamanPribadi').on('click', function () {
                    myApp.confirm('Apakah anda yakin akan menghapus Pengalaman Pribadi ini?', 'Apakah Anda Yakin?', function () {
                        local.splice(idPengalaman,1);
                        localStorage.setItem(nrpMhs+"pengalamanPribadi",JSON.stringify(local));
                        mainView.router.back({url: "pengalamanPribadi.html",force: true,ignoreCache: true});
                    });
                });    
            }
            $$('.overlay, .overlay-message').hide();
        }

        $$('#btnSubmitPengalamanPribadi').on('click', function () {
            if(checkConnection())
            {
                $$.post(directory,{opsi:'updatePengalaman',nrp:nrpMhs,  id:idPengalaman, situasis: situasi.value, strategis: strategi.value, emosis:emosi.value}, function(data){
                    console.log(data);
                });   
            }
            else
            {
                myApp.alert("Tidak ada internet, data disimpan secara lokal");  
                if(local!=false)
                {
                    if(local[idPengalaman]!=undefined)
                    {
                        local[idPengalaman] = {situasi:situasi.value, strategi:strategi.value, emosi:emosi.value};
                        localStorage.setItem(nrpMhs+"studiKasus", JSON.stringify(local));
                    }
                }   
            } 
            mainView.router.back({url: "pengalamanPribadi.html",force: true,ignoreCache: true});
        });
    }
    else
    {
        $$('.overlay, .overlay-message').hide();
        $$('#btnSubmitPengalamanPribadi').on('click', function () {
            if(checkConnection())
            {
                $$.post(directory,{opsi:'jawabPengalaman', nrp:nrpMhs, situasis: situasi.value, strategis: strategi.value, emosis:emosi.value}, function(data){
                    console.log(data);
                }); 
            }
            else
            {
                if(local!=false)
                {
                    local.push({situasi:situasi.value, strategi:strategi.value, emosi:emosi.value});
                }
                else
                {
                    local = [{situasi:situasi.value, strategi:strategi.value, emosi:emosi.value}];
                }
                localStorage.setItem(nrpMhs+"pengalamanPribadi", JSON.stringify(local));
            }
            mainView.router.back({url: "pengalamanPribadi.html",force: true,ignoreCache: true});
        });
    }
})

myApp.onPageInit('refleksiMini', function (page) {
    setGlobal();
    local= checkLocal("refleksiMini");
    if(checkConnection())
    {

        if(local!=false)
        {
            myApp.confirm('Ada data lokal yang tersimpan, upload jawaban ke server?', 'Sinkron data?', function () {
                $$.post(directory,{opsi:'jawabRefleksi', nrp:nrpMhs, jawab: local["jawaban"], id: local["idSoal"]}, function(data){
                    console.log(data);
                });   
                localStorage.removeItem(nrpMhs+"refleksiMini");
                mainView.router.refreshPage();
            }, function () {
                localStorage.removeItem(nrpMhs+"refleksiMini");
            });
        }
        getComment(8);
        $$.post(directory,{opsi:'getRefleksi', nrp:nrpMhs}, function(data){
            console.log(data);
            $$('#formRefleksiMini').html(data);
            $$('.overlay, .overlay-message').hide();
        });  
    }
    else
    {
        var soalRefleksi=[{id_soal:30,soal:"Yang kulakukan untuk menjalankan peranku dalam kelompok"},
            {id_soal:31,soal:"Yang kurasakan terkait pembagian peran dalam kelompokku"},
            {id_soal:32,soal:"Pandanganku terkait strategi yang dipakai dalam kelompok untuk menyelesaikan projek"},
            {id_soal:33,soal:"Kontribusiku dalam menyelesaikan kegiatan"},
            {id_soal:34,soal:"Yang kupelajari tentang diriku selama proses berlangsung"},
            {id_soal:35,soal:"Yang kupelajari tentang kelompokku selama proses berlangsung"}
        ];
        var temp ="";
        //localStorage.removeItem(nrpMhs+"kisahEntong");
        for (var i = 0; i <soalRefleksi.length; i++) {
            temp+='<div class="card">'+
                            '<div class="card-header" >'+soalRefleksi[i]["soal"]+'</div>'+
                            '<div class="card-content">'+
                                '<div class="card-content-inner">'+
                                    '<textarea class="areajawab" rows="3" style="height:auto; width:100%" id='+soalRefleksi[i]["id_soal"]+'>';
                if(local!=false){
                    temp += local["jawaban"][i];
                }

                temp+=             '</textarea>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
        }
        $$('#formRefleksiMini').html(temp);
        $$('.overlay, .overlay-message').hide();
    }

    $$('#btnSubmitRefleksiMini').on('click', function () {
        var jawabanRefleksi=[];
        var idsoal=[];

        $$('.areajawab').each(function(){
          jawabanRefleksi.push($$(this).val());
          idsoal.push($$(this).attr('id'));
        })

        if(checkConnection())
        {
            $$.post(directory,{opsi:'jawabRefleksi', nrp:nrpMhs, jawab: jawabanRefleksi, id: idsoal}, function(data){
                console.log(data);
                mainView.router.back();
            });
        }
        else
        {
            myApp.alert("Tidak ada internet, data disimpan secara lokal");   
            var tempArr={jawaban:jawabanRefleksi, idSoal:idsoal};
            localStorage.setItem(nrpMhs+"refleksiMini",JSON.stringify(tempArr));
            mainView.router.back();
        }
    });    
})

function sinkronFishbone()
{
    myApp.confirm('Ada data lokal yang tersimpan, upload jawaban ke server?', 'Sinkron data?', function () {
        var local = checkLocal("fishbone");
        if(local!=false)
        {
            for (var i = 0; i < local.length; i++) {
                var support = [];
                if(local[i]["support"]!=undefined)  
                {
                    support= local[i]["support"];
                } 
                $$.post(directory,{opsi:'jawabFishbone', nrp:nrpMhs, jawab:local[i]["kepala"]}, function(data){
                   
                    var idk=data;
                    for (var j = 0; j < support.length; j++) {
                        var detail=[];
                        if(support[j]["detail"]!=undefined)  
                        {
                            detail= support[j]["detail"];
                        }
                        $$.post(directory,{opsi:'jawabFishboneSupport', nrp:nrpMhs, id:idk, jawab:support[j]["jawab_support"]}, function(data){
                            
                            var ids=data;
                            for (var k = 0; k<detail.length; k++) {
                                $$.post(directory,{opsi:'jawabFishboneSupportDetail', nrp:nrpMhs, id:ids, jawab:detail[k]["jawab_detail"]}, function(data){
                                    
                                }); 
                            }
                        }); 
                    }   
                });  
            }
            localStorage.removeItem(nrpMhs+"fishbone");
            mainView.router.refreshPage();
        }
    }, function () {
        localStorage.removeItem(nrpMhs+"fishbone");
    });
}

myApp.onPageInit('fishbone', function (page) {
    setGlobal();
    var local = checkLocal("fishbone");
    if(checkConnection())
    {
        if(local!=false)
        {
            sinkronFishbone();
            mainView.router.refreshPage();      
        }
        getComment(9);
        $$.post(directory,{opsi:'getFishbone', nrp:nrpMhs}, function(data){
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
                                '<font color="4d88ff"><p id="'+result[i]["id_kepala"]+'" class="editKepala">'+result[i]["nama_kepala"]+'</p></font>'+
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
    }
    else
    {
        if(local!=false)
        {
            var temp="";
            for(var i=0; i<local.length;i++)
            {
                temp+='<div class="card">'+
                          '<div class="card-header">'+
                            '<i id="'+i+'s" class="f7-icons deleteKepala">close</i>'+
                            '<font color="4d88ff"><p id="'+i+'" class="editKepala">'+local[i]["kepala"]+'</p></font>'+
                            '<a href="fishboneSupport.html?idKepala='+i+'&namaKepala='+local[i]["kepala"]+'"><i class="f7-icons">chevron_right</i></a>'+
                            '</div>'+
                        '<div class="card-content">'+
                        '<ul>';
                if(local[i]["support"]!=undefined)
                {
                    for(var j=0;j<local[i]["support"].length;j++)
                    {
                        temp+='<li class="item-content">'+
                                '<div class="item-inner">'+
                                  local[i]["support"][j]["jawab_support"]+
                                '</div>'+
                                '<ul>';
                        if(local[i]["support"][j]["detail"]!=undefined)
                        {
                            for(var k=0;k<local[i]["support"][j]["detail"].length;k++)
                            {
                                temp+='<li class="item-content">'+
                                        '<div>'+
                                          local[i]["support"][j]["detail"][k]["jawab_detail"]+
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

            $$('.deleteKepala').on('click', function(event) {
                var ids = event.target.id.replace('s','');
                myApp.confirm('Apakah anda yakin akan menghapus Kepala Fishbone beserta isinya?', 'Apakah Anda Yakin?', function () {
                    local.splice(ids,1);
                    localStorage.setItem(nrpMhs+"fishbone",JSON.stringify(local));
                    mainView.router.refreshPage();
                });
            });    

            $$('.editKepala').on('click', function (event) {
                var ids=$$(this).attr("id");
                myApp.prompt('', 'Edit', function (value) {
                    if(value!='')
                    {
                        local[ids]["kepala"] = value;
                        localStorage.setItem(nrpMhs+"fishbone",JSON.stringify(local));
                        mainView.router.refreshPage();
                    }
                });
            });  
            $$('.overlay, .overlay-message, .tempButton').hide();
        }
        else
        {
            $$('.overlay, .overlay-message, .floating-button').hide();
        }

    }

    $$('.addKepala').on('click', function () {
        myApp.prompt('', 'Fishbone Kepala', function (value) {
            if(value!='')
            {
                if(checkConnection())
                {
                    $$.post(directory,{opsi:'jawabFishbone', nrp:nrpMhs, jawab:value}, function(data){
                        console.log(data);
                        mainView.router.refreshPage();
                    });    
                }  
                else
                {
                    if(local!=false)
                    {
                        local.push({kepala:value});
                    }
                    else
                    {
                        local= [{kepala:value}];
                    }
                    localStorage.setItem(nrpMhs+"fishbone",JSON.stringify(local));
                    mainView.router.refreshPage();
                }
            }
        });
    });    
})

myApp.onPageInit('fishboneSupport', function (page) {
    setGlobal();
    var ids = page.query.idKepala;
    var nama = page.query.namaKepala;
    var local = checkLocal("fishbone");
    $$("#judulFishboneKepala").html(nama);
    if(checkConnection())
    {
        if(local!=false)
        {
            sinkronFishbone();
            mainView.router.refreshPage();      
        }
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
                                '<font color="4d88ff"><p id="'+result[i]["id_support"]+'" class="editSupport">'+result[i]["nama_support"]+'</p></font>'+
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
                            $$.post(directory,{opsi:'editFishboneSupport',nrp:nrpMhs, id:ids, jawab:value}, function(data){
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
    }
    else
    {
        if(local!=false)
        {
            if(local[ids]["support"]!=undefined)
            {
                var temp="";
                for(var i=0; i<local[ids]["support"].length;i++)
                {
                    temp+='<div class="card">'+
                              '<div class="card-header">'+
                                '<i id="'+i+'s" class="f7-icons deleteSupport">close</i>'+
                                '<font color="4d88ff"><p id="'+i+'" class="editSupport">'+local[ids]["support"][i]["jawab_support"]+'</p></font>'+
                                '<a href="fishboneSupportDetail.html?idKepala='+ids+'&idSupport='+i+'&namaSupport='+local[ids]["support"][i]["jawab_support"]+'"><i class="f7-icons">chevron_right</i></a>'+
                                '</div>'+
                            '<div class="card-content">'+
                            '<ul>';

                    if(local[ids]["support"][i]["detail"]!=undefined)
                    {
                        for(var j=0;j<local[ids]["support"][i]["detail"].length;j++)
                        {
                            temp+='<li class="item-content">'+
                                    '<div class="item-inner">'+
                                      local[ids]["support"][i]["detail"][j]["jawab_detail"]+
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
                        if(local[page.query.idKepala]["support"]!=undefined)
                        {
                            local[page.query.idKepala]["support"].splice(ids,1);
                            localStorage.setItem(nrpMhs+"fishbone",JSON.stringify(local));
                            mainView.router.refreshPage();
                        }
                        else
                        {
                            myApp.alert("Tidak ada Koneksi Internet");
                            mainView.router.back();
                        }
                    });
                });    

                $$('.editSupport').on('click', function (event) {
                    var ids=$$(this).attr("id");
                    myApp.prompt('', 'Edit', function (value) {
                        if(value!='')
                        {
                            if(local[page.query.idKepala]["support"]!=undefined)
                            {
                                local[page.query.idKepala]["support"][ids]["jawab_support"]=value;
                                localStorage.setItem(nrpMhs+"fishbone",JSON.stringify(local));
                                mainView.router.refreshPage();
                            }
                            else
                            {
                                myApp.alert("Tidak ada Koneksi Internet");
                                mainView.router.back();
                            }     
                        }
                    });
                });
            }
            else
            {
                $$('.overlay, .overlay-message, .floating-button').hide();       
            }
        }
        else
        {
            mainView.router.back();
        }
    }

    $$('.addSupport').on('click', function () {
        myApp.prompt('', 'Fishbone Support', function (value) {
            if(value!='')
            {
                if(checkConnection())
                {
                    $$.post(directory,{opsi:'jawabFishboneSupport', nrp:nrpMhs,id:ids, jawab:value}, function(data){
                        mainView.router.refreshPage();
                    });   
                }
                else
                {
                    if(local!=false)
                    {
                        if(local[ids]["support"]!=undefined)
                        {
                            local[ids]["support"].push({jawab_support:value});
                        }
                        else
                        {
                            local[ids]["support"]=[{jawab_support:value}];   
                        }
                    }
                    else
                    {
                        myApp.alert("Tidak ada Koneksi Internet");
                        mainView.router.back();
                    }
                    localStorage.setItem(nrpMhs+"fishbone",JSON.stringify(local));
                    mainView.router.refreshPage();
                }
            }
        });
    });
})

myApp.onPageInit('fishboneSupportDetail', function (page) {
    setGlobal();
    var idk = page.query.idKepala;
    var ids = page.query.idSupport;
    var nama = page.query.namaSupport;
    $$("#judulFishboneSupport").html(nama);
    var local=checkLocal("fishbone");
    if(checkConnection())
    {
        if(local!=false)
        {
            sinkronFishbone();
            mainView.router.back();
        }
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
                                '<font color="4d88ff"><p id="'+result[i]["id_detail_support"]+'" class="editSupportDetail">'+result[i]["nama_detail_support"]+'</p></font>'+
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
                            $$.post(directory,{opsi:'editFishboneSupportDetail',nrp:nrpMhs, id:ids, jawab:value}, function(data){
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
    }
    else
    {
        if(local!=false)
        {
            if(local[idk]["support"][ids]["detail"]!=undefined)
            {
                var temp="";
                var result = local[idk]["support"][ids]["detail"];
                for(var i=0; i<result.length;i++)
                {
                    temp+='<div class="card">'+
                              '<div class="card-header">'+
                                '<i id="'+i+'s" class="f7-icons deleteSupportDetail">close</i>'+
                                '<font color="4d88ff"><p id="'+i+'" class="editSupportDetail">'+result[i]["jawab_detail"]+'</p></font>'+
                                '<p></p>'+
                                '</div>'+
                            '</div>';
                }
                $$('#listSupportDetail').append(temp);
                $$('.deleteSupportDetail').on('click', function(event) {
                    var id = event.target.id.replace('s','');
                    myApp.confirm('Apakah anda yakin akan menghapus Detail Support Fishbone?', 'Apakah Anda Yakin?', function () {
                        if(local[idk]["support"][ids]["detail"]!=undefined)
                        {
                            local[idk]["support"][ids]["detail"].splice(id,1);
                            localStorage.setItem(nrpMhs+"fishbone",JSON.stringify(local));
                            mainView.router.refreshPage();
                        }
                        else
                        {
                            myApp.alert("Tidak ada Koneksi Internet");
                            mainView.router.back();
                        }
                    });
                });    

                $$('.editSupportDetail').on('click', function (event) {
                    var id=$$(this).attr("id");
                    myApp.prompt('', 'Edit', function (value) {
                        if(value!='')
                        {
                            if(local[idk]["support"][ids]["detail"]!=undefined)
                            {
                                local[idk]["support"][ids]["detail"][id]["jawab_detail"]=value;
                                localStorage.setItem(nrpMhs+"fishbone",JSON.stringify(local));
                                mainView.router.refreshPage();
                            }
                            else
                            {
                                myApp.alert("Tidak ada Koneksi Internet");
                                mainView.router.back();
                            }     
                        }
                    });
                });  
                $$('.overlay, .overlay-message, .tempButton').hide();
            }
            else
            {
                $$('.overlay, .overlay-message, .floating-button').hide();
            }
        }
        else
        {
            mainView.router.back();
        }
    }
    $$('.addSupportDetail').on('click', function () {
        myApp.prompt('', 'Fishbone Support Detail', function (value) {
            if(value!='')
            {
                if(checkConnection())
                {
                    $$.post(directory,{opsi:'jawabFishboneSupportDetail',nrp:nrpMhs, id:ids, jawab:value}, function(data){
                        mainView.router.refreshPage();
                    }); 
                }
                else
                {
                    if(local[idk]["support"][ids]["detail"]!=undefined)
                    {
                        local[idk]["support"][ids]["detail"].push({jawab_detail:value});
                    }
                    else
                    {
                        local[idk]["support"][ids]["detail"]=[{jawab_detail:value}];   
                    }
                    localStorage.setItem(nrpMhs+"fishbone",JSON.stringify(local));
                    mainView.router.refreshPage();
                }
            }
        });
    });
})


function setGlobal()
{
    if(JSON.parse(localStorage.getItem("GPBusername")))
    {
        nrpMhs=JSON.parse(localStorage.getItem("GPBusername"));
        nama_mhs=JSON.parse(localStorage.getItem("GPBnama_mhs"));
    }
}

function checkConnection()
{
    var networkState = navigator.connection.type;
    console.log(networkState);  
    if(networkState == "none" )
    // if(networkState == "none" || networkState =="unknown")
    {
        return false;
    }
    else
    {
        return true;
    }
}
