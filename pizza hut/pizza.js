function tampilkanSemuaMenu() {
  $.getJSON("data/pizza.json", function (data) {
    let menu = data.menu;
    $.each(menu, function (i, data) {
      $("#daftar-menu").append(
        `<div class="col-md-4"><div class="card mb-3"><img src="img/pizza/${data.gambar}" 
        class="card-img-top" alt="" /><div class="card-body"><h5 class="card-title">${data.nama}</h5><p class="card-text">${data.deskripsi}
        </p><h5 class="card-title"> Rp.${data.harga}</h5><a href="#" class="btn btn-primary">pesan</a></div></div></div>`
      );
    });
  });
}

tampilkanSemuaMenu();

$(".nav-link").on("click", function () {
  $(".nav-link").removeClass("active"); // menghapus active ketika klik nav link jadi awalnya hilang semua lalu tambah sesuai dengan yang di klik
  $(this).addClass("active"); // this ini apa apa yang di click di navlink akan ditambahkan active

  let kategori = $(this).html(); // memnafaatkan kategori karena akan dimasukan ke h1 all menu nav yang di klik semua tampilkan isinya
  console.log(kategori);
  $("h1").html(kategori); // memasukan kategori ke h1
  if (kategori == "All menu") {
    tampilkanSemuaMenu();
    return;
  }
  $.getJSON("data/pizza.json", function (data) {
    let menu = data.menu;
    let content = " ";

    $.each(menu, function (i, data) {
      if (data.kategori == kategori.toLowerCase()) {
        // data.kategori ini sudah masuk ke menu dan data mempresentasikan element tiap dari menu jika data.kategori itu sama dengan kategori diatas karena kategori atas misal pizza sama dengan yang di klik pizza kategori atas maka funtion data itu mempresentasikan pizza dan melakukan perulangan pizza dan param data itu dimasuki data dari pizza
        content +=
          '<div class="col-md-4"><div class="card mb-3"><img src="img/pizza/' +
          data.gambar +
          '" class="card-img-top" alt="" /><div class="card-body"><h5 class="card-title ">' +
          data.nama +
          '</h5><p class="card-text">' +
          data.deskripsi +
          '</p><h5 class="card-title"> Rp.' +
          data.harga +
          '</h5><a href="#" class="btn btn-primary">pesan</a></div></div></div>';
      }
    });
    $("#daftar-menu").html(content);
  });
});
