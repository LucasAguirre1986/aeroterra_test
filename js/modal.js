// Controla / Manipula el dom del modal
let btnSiguiente = document.querySelector('#siguiente')

btnSiguiente.addEventListener('click',function(){
    $('.nav-tabs a[href="#profile"]').click();
})
