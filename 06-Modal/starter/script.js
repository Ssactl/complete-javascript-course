'use strict';

const modal=document.querySelector(".modal");
const overlay=document.querySelector(".overlay");
const btnCloseModal=document.querySelector(".close-modal");

//querySelector, only the matched first one get selecteds
const btnOpenModal=document.querySelectorAll(".show-modal");

const openModal=function(){
    console.log('Button clicked');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal=function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

for(let i=0;i<btnOpenModal.length;i++){
    console.log(btnOpenModal[i].textContents);
    btnOpenModal[i].addEventListener("click",openModal);
}

btnCloseModal.addEventListener('click',closeModal);

overlay.addEventListener('click',closeModal);


// keybord events are global events, 
// they do not happen on one specific elements
// so we usually listen on the whole document
document.addEventListener("keydown",function(event){
    console.log("A key was pressed");
    console.log(event);
    console.log(event.key)
    if(event.key==="Escape" && !modal.classList.contains("hidden")){     
     
            closeModal();
        
    }
});



