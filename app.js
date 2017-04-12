/* constants for all dom elements
*/
const toggleButton = document.querySelector(".toggle");
const list =document.querySelector(".list");
const listItems = document.querySelectorAll("li");
const listUl =document.querySelector("ul.trial");
const descriptionInput =document.querySelector("input.description");
const descriptionButton = document.querySelector("button.description");
const all = document.querySelectorAll(".description");
const heading =document.querySelector("#myHeading");
const descriptionPara = document.querySelector("p.description");
const buttonItem =document.querySelector(".addItemButton");
const inputItem =document.querySelector(".addItemInput");
const removeButton = document.querySelector(".removeItem");
const listUlChildren = listUl.children;


// add buttons(up,down,remove) to li added dynamically through  buttonItem (button)
// as well as lisitems already present in ul initially.

function addButtons(li) {
  let length= document.querySelectorAll("ul.trial li").length;
  let upButton = document.createElement("button");
  upButton.className="up";
  upButton.textContent="Up";
  let downButton = document.createElement("button");
  downButton.className="down";
  downButton.textContent="Down";
  let removeButtonElement = document.createElement("button");
  removeButtonElement.className="remove";
  removeButtonElement.textContent="Remove";

  // length> 1 because when no element is present, we need only remove button 
  //in new element to be added ,no need of up button
  if(!li.previousElementSibling && !li.nextElementSibling && length > 1 ){
    li.appendChild(upButton);
  }
  if(li.previousElementSibling)
    li.appendChild(upButton);
  if(li.nextElementSibling)
    li.appendChild(downButton);
  li.appendChild(removeButtonElement);
  
}

// add buttons to lisitems already present in ul
for(let i=0;i<listUlChildren.length;i++) {
  addButtons(listUlChildren[i]);
}

function removeButtons(li) {
  while(li.firstElementChild) {
    li.removeChild(li.firstElementChild);

  }
}

function refreshButtons(li) {
  removeButtons(li);
  addButtons(li);

}

listUl.addEventListener("click",(e) => {
      if(e.target.tagName=="BUTTON") {
            let li= e.target.parentNode;
            let ul=li.parentNode;
            let prevLi = li.previousElementSibling;
            let nextLi = li.nextElementSibling;
            if(e.target.className=="remove") {      
              ul.removeChild(li);
              if(!prevLi && nextLi)
              refreshButtons(nextLi);
              if(!nextLi && prevLi)
              refreshButtons(prevLi);

            }
          if(e.target.className=="up") {                       
            if(prevLi) {
             ul.insertBefore(li,prevLi);
             refreshButtons(prevLi);
             //1
            }                        
          }

          if(e.target.className=="down") {
            if(nextLi) {
               ul.insertBefore(nextLi,li);
               refreshButtons(nextLi);
               //2
            }                        
          }
          if(li) //check whether li is there,if in case it was deleted before.
          refreshButtons(li);//could have kept at 1 & 2  .But follow DRY principle, SO kept here.
      }
});

toggleButton.addEventListener("click", () => {
    if(list.style.display=== "none") {
      toggleButton.textContent="Hide list";
      list.style.display="block";
    }
    else {
       toggleButton.textContent="Show List";
       list.style.display="none";
                            
   }
});
                        
descriptionButton.addEventListener("click",() => {
  descriptionPara.innerHTML=descriptionInput.value+":";
  descriptionInput.value="";
});
  
buttonItem.addEventListener("click",()=> {
      let ul = document.querySelector("ul.trial");
      let li= document.createElement("li");
      li.textContent=inputItem.value;
      if(!(li.textContent=="")) {
        addButtons(li);
        ul.appendChild(li);
        if(li.previousElementSibling)               //when you are gonna add first item in list after deleting all items(1)
          refreshButtons(li.previousElementSibling); //check whether its there.(2 end)
        refreshButtons(li);      //for cases when a new li is added when only a single li is there in  (1)
        inputItem.value= "";     // ul. In that case when new li was added,it has only a remove button. (2 end)
        
      }
});
  

  