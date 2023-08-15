{/* <a id = "clear-todos" class="btn btn-dark" href="#">Tüm Taskları Temizleyin</a> */ }

//DİNAMİK ELEMENT EKLEME


// const newLink = document.createElement("a");
// const cardBody = document.getElementsByClassName("card-body")[1];
// newLink.id = "clear-todos";
// newLink.className = "btn btn-dark";
// newLink.href="#";
// newLink.appendChild(document.createTextNode("Farklı Sayfaya Git"));
// cardBody.appendChild(newLink);
// console.log(newLink);


// TodoListe Kendi Yazdığımızı Ekleme


//Fonksiyonsuz olan sadece hedef noktalarımız olan yerleri seçtik. Yani nerelere bilgi girilmesi istendiğini seçtik.
const todoInput = document.querySelector("#todo");
const listItem = document.querySelector(".list-group");
const form = document.querySelector("#todo-form");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

//Bir olay sonucu değişim için nerenin dinlenmesi gerektiğini ve hangi işlevi yapması gerektiğini seçtik.
eventListeners = () => {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

//Tüm todoları silmek için
clearAllTodos = (e) =>{
    if(confirm("Hepsini silmek istediğinize emin misiniz?")){
        // listItem.innerHTML = "" Yavaş çalıştığı için kullanılmıyor.
        while(listItem.firstElementChild != null){
            listItem.removeChild(listItem.firstElementChild);
        }

        localStorage.removeItem("storageTodo");

    }
}




//Todoları filtrelemek için
filterTodos = (e) =>{
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
           //Bulamadığımız senaryo
           listItem.setAttribute("style","display:none !important");
        }
        else{
            listItem.setAttribute("style","display:block");
        }
    })
}



//Todoları silmek için

deleteTodofromStorage = deleteTodo =>{
    let storageTodo = getTodosFromStorage();
    storageTodo.forEach(function(todo,index){
        if(todo === deleteTodo){
            storageTodo.splice(index,1);
        }
    });
    localStorage.setItem("storageTodo",JSON.stringify(storageTodo));
}





//Eklenen Todoları refresh olması dahilinde bile ekrana yazdırma

loadAllTodosToUI = () => {
    let storageTodo = getTodosFromStorage();

    storageTodo = getTodosFromStorage();
    storageTodo.forEach((todo) => {
        addTodoToUI(todo);
    });
}

// Todoları silmek için 

deleteTodo = (e) =>{
   if (e.target.className === "fa fa-remove"){
      e.target.parentElement.parentElement.remove();
      deleteTodofromStorage(e.target.parentElement.parentElement.textContent);
      showAlert("success","Todo başarı ile silindi.");
   }
}


//AddEventListenerdan gelen fonksiyonun ne iş yapacağını yazdık
addTodo = (e) => {
    const newTodo = todoInput.value.trim();//trim fonksiyonu sağdan ve soldan boşlukları temizler.
    console.log(newTodo)
    if (newTodo === "") {
        showAlert("danger", "Lütfen bir todo giriniz.");
    } else {
        addTodoToUI(newTodo);
        showAlert("success", "İşleminiz başarıyla gerçekleşti.");
    }
    addTodoToStorage(newTodo);
    e.preventDefault();//Ekran her işlem sonucunda yenilenmesin diye yazıldı.
}

showAlert = (type, message) => {
    // <div class="alert alert-danger" role="alert">
    //     A simple danger alert—check it out!
    // </div>
    const alertbox = document.createElement("div");
    // alertbox.className = "alert alert-danger";
    alertbox.className = `alert alert-${type}`
    alertbox.role = "alert";
    // alertbox.appendChild(document.createTextNode("Lütfen bir todo giriniz."));
    alertbox.textContent = message;
    console.log(showAlert);
    firstCardBody.appendChild(alertbox);

    //Belirli bir süre sonra alertin gitmesini sağlamak
    setTimeout(function () {
        alertbox.remove();
    }, 2000)
}



{/* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> */}

addTodoToUI = newTodo => {
    //ListItem
    const newList = document.createElement("li");
    newList.className = "list-group-item d-flex justify-content-between"

    //LinkItem
    const newLink = document.createElement("a");
    newLink.href = "#";
    newLink.className = "delete-item";
    newLink.innerHTML = "<i class = 'fa fa-remove'></i>";

    //Li parent a child oldugunu belirtme
    newList.appendChild(document.createTextNode(newTodo));
    newList.appendChild(newLink);

    //TodoListe ListItem'ı Ekleme
    listItem.appendChild(newList);
    todoInput.value = "";
}

getTodosFromStorage = () => {
    let storageTodo;

    if (localStorage.getItem("storageTodo") === null) {
        storageTodo = []
    }
    else {
        storageTodo = JSON.parse(localStorage.getItem("storageTodo"));
    }
    return storageTodo;
}

addTodoToStorage = newTodo => {
    let storageTodo = getTodosFromStorage();
    storageTodo.push(newTodo);
    localStorage.setItem("storageTodo", JSON.stringify(storageTodo))
}


//Çalıştırdık.
eventListeners();


