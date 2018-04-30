
new Vue({
  el: '#app',
  data: {
    noHp: '',
    email: '',
    noHpSliced: '',
    hasil: ''
  },
  methods:{
    validasiEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validasiNoHp: function (noHp) {
      var re = /^\d+$/;
      return re.test(noHp);
    },
    filterNoHp: function () {
      this.noHpSliced = this.noHp.slice(0, 4);
      if (this.noHpSliced === '0811' || this.noHpSliced === '0812' || this.noHpSliced === '0813'
        || this.noHpSliced === '0821' || this.noHpSliced === '0822' || this.noHpSliced === '0823'
        || this.noHpSliced === '0851' || this.noHpSliced === '0852' || this.noHpSliced === '0853') {
        this.hasil = 'Telkomsel';
      } else if (this.noHpSliced === '0814' || this.noHpSliced === '0815' || this.noHpSliced === '0816'
        || this.noHpSliced === '0858' || this.noHpSliced === '0855' || this.noHpSliced === '0856'
        || this.noHpSliced === '0857') {
        this.hasil = 'Indosat';
      } else if (this.noHpSliced === '0817' || this.noHpSliced === '0818' || this.noHpSliced === '0819'
        || this.noHpSliced === '0859' || this.noHpSliced === '0877' || this.noHpSliced === '0878') {
        this.hasil = 'XL';
      } else if (this.noHpSliced === '0831' || this.noHpSliced === '0832' || this.noHpSliced === '0833'
        || this.noHpSliced === '0838') {
        this.hasil = 'Axis';
      } else if (this.noHpSliced === '0895' || this.noHpSliced === '0896' || this.noHpSliced === '0897'
        || this.noHpSliced === '0898' || this.noHpSliced === '0899') {
        this.hasil = 'Three';
      } else if (this.noHpSliced === '0881' || this.noHpSliced === '0882' || this.noHpSliced === '0883'
        || this.noHpSliced === '0884' || this.noHpSliced === '0885' || this.noHpSliced === '0886'
        || this.noHpSliced === '0887' || this.noHpSliced === '0888' || this.noHpSliced === '0889') {
        this.hasil = 'Smartfren';
      } else if (this.noHpSliced === '0998' || this.noHpSliced === '0999') {
        this.hasil = 'Bolt';
      } else {
        swal({
          title: 'Peringatan',
          text: 'Nomor HP yang dimasukkan salah!',
          icon: 'warning'
        }).then((focus) => {
          this.$refs.noHpBox.focus();
        });
      }
    },
    kirimEmail: function () {
      if (this.noHp && this.email) {
        if (this.validasiNoHp(this.noHp)) {
          this.filterNoHp();
          if (this.hasil) {
            if (this.validasiEmail(this.email)) {
              Email.send("gen781@gmail.com",
              	this.email,
              	"E-Loket Test",
              	"Nomor HP " + this.noHp + " adalah kartu " + this.hasil,
              	{
                  token: "396cee01-6916-406d-8a03-3958d137d4c6",
                  callback: (done) => {
                    swal({
                      title: 'Informasi',
                      text: 'Data sudah terkirim!',
                      icon: 'info'
                    }).then((focus) => {
                      this.noHp="";
                      this.email="";
                      this.hasil="";
                      this.$refs.noHpBox.focus();
                    });
                  }
                }
              );
            } else {
              swal({
                title: 'Peringatan',
                text: 'Alamat email salah!',
                icon: 'warning'
              }).then((focus) => {
                this.$refs.emailBox.focus();
              });
            }
          }
        } else {
          swal({
            title: 'Peringatan',
            text: 'Nomor HP yang dimasukkan salah!',
            icon: 'warning'
          }).then((focus) => {
            this.$refs.noHpBox.focus();
          });
        }
      }
    }
  }
});

(function ($) {
  "use strict";

  var input = $('.validate-input .input100');

  $('.validate-form').on('submit',function(){
    var check = true;
    for(var i=0; i<input.length; i++) {
      if(validate(input[i]) == false){
        showValidate(input[i]);
        check=false;
      }
    }
    return check;
  });

  $('.validate-form .input100').each(function(){
    $(this).focus(function(){
      hideValidate(this);
    });
  });

  function validate (input) {
    if($(input).val().trim() == ''){
      return false;
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('alert-validate');
  }

})(jQuery);
