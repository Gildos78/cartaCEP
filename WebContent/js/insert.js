
function openButton(evt, cityName) {
	  var i, tabcontent, tablinks;
	  tabcontent = document.getElementsByClassName("tabcontent");
	  for (i = 0; i < tabcontent.length; i++) {
	    tabcontent[i].style.display = "none";
	  }
	  tablinks = document.getElementsByClassName("tablinks");
	  for (i = 0; i < tablinks.length; i++) {
	    tablinks[i].className = tablinks[i].className.replace(" active", "");
	  }
	  document.getElementById(cityName).style.display = "block";
	  evt.currentTarget.className += " active";
	}
function mask(o, f) {
	  setTimeout(function() {
	    var v = mphone(o.value);
	    if (v != o.value) {
	      o.value = v;
	    }
	  }, 1);
	}

	function mphone(v) {
	  var r = v.replace(/\D/g, "");
	  r = r.replace(/^0/, "");
	  if (r.length > 10) {
	    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
	  } else if (r.length > 5) {
	    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
	  } else if (r.length > 2) {
	    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
	  } else {
	    r = r.replace(/^(\d*)/, "($1");
	  }
	  return r;
	}