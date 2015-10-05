document.addEventListener('DOMContentLoaded',function(){

  var regForm = document.getElementById('reg-form');
  var regText = document.getElementById('reg-text');
  var regWrap = document.getElementById('reg-wrap');

  if(location.search) regText.value = location.search.split('r=').pop() || '';

  regForm.addEventListener('submit',function(e){
    e.preventDefault();
    var serial = regText.value;
    if(!serial || serial.length < 20) return alert('Please enter a valid serial number.');

    //generate JWT registration code
    var oHeader = {alg: 'HS256', typ: 'JWT'};
    var tNow = KJUR.jws.IntDate.get('now');
    var oPayload = {
      author: 'http://www.itslennysfault.com',
      serial: serial,
      product: 'Final Markdown',
      createdAt: tNow
    };
    var sHeader = JSON.stringify(oHeader);
    var sPayload = JSON.stringify(oPayload);
    var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, '5461636f2050617274792121212121');
    console.log('isValid',isValid);
    regWrap.innerHTML = '<h3>Registration Complete!</h3><b>Registration Code:</b> <textarea class="form-control" rows="4">' + sJWT + '</textarea><div class="help-text">Copy this code into Final Markdown to register.</div>';
  })

});
