(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();


const taxSwitchToggle = document.getElementById("switchCheckDefault");

taxSwitchToggle.addEventListener("click", () => {
  let  taxinfo = document.getElementsByClassName("TAXINFO");
  for(info of taxinfo) {
    if(info.style.display == "inline"){
      info.style.display = "none"
    }else{
      info.style.display = "inline"
    }
  }
})