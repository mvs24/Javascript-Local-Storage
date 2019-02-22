// global variables
    const addItemsAction=document.querySelector(".addItems-action");
    const input=document.querySelector(".addItems-input");
    const submit=document.querySelector(".addItems-submit");
    const list=document.querySelector(".grocery-list");
    const displayItemsAction=document.querySelector(".displayItems-action");
    const clear=document.querySelector(".displayItems-clear");
    


    // event  isteners
    document.addEventListener("DOMContentLoaded",displayStorage);
    
    submit.addEventListener("click",addItem);
    clear.addEventListener("click",removeItems);
    list.addEventListener("click",removeSingleItem);
    
    
    
    //functions
    function addItem(event){
        event.preventDefault();
        let value=input.value;
       
        if(value===""){
            showAction(addItemsAction,"Please add grocery item",false);
        }
        else{
            showAction(addItemsAction,`${value} added to the list`,true);
          createItem(value);
          updateStorage(value);
        }
    }

    function showAction(element,text,value){
        if(value===true){
            element.classList.add("success");
            element.innerText=text;
            input.value="";
            setTimeout(()=>{
                element.classList.remove("success");
            },3000);
        }
        else{
            element.classList.add("alert");
            element.innerText=text;
            setTimeout(()=>{
                element.classList.remove("alert");
            },3000);
        }
    }


    function createItem(value){
        let parent=document.createElement("div");
        parent.classList.add("grocery-item");
parent.innerHTML=`<h4 class="grocery-item__title">${value}</h4>
<a href="#" class="grocery-item__link">
    <i class="far fa-trash-alt"></i>
</a>`
list.appendChild(parent);
 }


 function updateStorage(value){
     let groceryList;    
     let exists=localStorage.getItem("groceryList");
     if(exists){
         groceryList=JSON.parse(localStorage.getItem("groceryList"));
     }
     else{
         groceryList=[];
     } 

groceryList.push(value);
localStorage.setItem("groceryList",JSON.stringify(groceryList));
    }


   function displayStorage(){
    let exists=localStorage.getItem("groceryList");
    if(exists===true){
        let storageItems=JSON.parse(localStorage.getItem("groceryList"));
        storageItems.forEach((element)=>{
            createItem(element);
        });
    };
   }
   function removeItems(){
       let items=document.querySelectorAll(".grocery-item");
       console.log(items);
       
       if(items.length>0){
           showAction(displayItemsAction,"All items deleted",false);
           items.forEach((element)=>{
               list.removeChild(element);
           });
       }
       else{
           showAction(displayItemsAction,"No more items to delete",true);
       }
   }
   function removeSingleItem(event){
       event.preventDefault();
   console.log(event.target);
    //   console.log(event.target.parentElement);
    let link=event.target.parentElement;
   
if(link.classList.contains("grocery-item__link")){
    let text=link.previousElementSibling.innerHTML;
    console.log(text);
   let groceryItem=event.target.parentElement.parentElement;
   //remove from the list
   list.removeChild(groceryItem);
   showAction(displayItemsAction,` ${text} deleted successfully`,true);
   //remove from local storage
   editStorage(text);
}


function editStorage(item){ 
    let groceryItems=JSON.parse(localStorage.getItem("groceryList"));
    let index=groceryItems.indexOf(item);
    groceryItems.slice(index,1);
    localStorage.removeItem("groceryList");
    localStorage.setItem("groceryList",JSON.stringify(groceryItems));
}
   }