//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".new-todo__input");//Add a new task.
var addButton=document.querySelector(".new-todo__btn");//first button
var incompleteTaskHolder=document.querySelector(".tasks_incomplete");//ul of #incompleteTasks
var completedTasksHolder=document.querySelector(".tasks_complete");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add("tasks__item");

    //input (checkbox)
    let checkLabel = document.createElement("label");
    var checkBox=document.createElement("input");//checkbx
    checkBox.classList.add("tasks__checkbox");
    checkBox.type="checkbox";
    let checkSpan = document.createElement("span");
    checkSpan.textContent = "Check complete/incomplete task";
    checkSpan.classList.add("visually-hidden");
    checkLabel.append(checkBox);
    checkLabel.append(checkSpan);

    //input (text)
    var inputLabel=document.createElement("label");//label
    inputLabel.className="tasks__label";
    var input=document.createElement("input");//text
    input.type="text";
    input.className="tasks__input";
    let inputSpan = document.createElement("span");
    inputSpan.classList.add("tasks__name");
    inputSpan.textContent = taskString;
    inputLabel.append(input);
    inputLabel.append(inputSpan);

    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="tasks__edit-btn";

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.className="tasks__delete-btn";
    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.src="./remove.svg";
    deleteButtonImg.classList.add("tasks__delete-icon");
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkLabel);
    listItem.appendChild(inputLabel);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector("input[type=text]");
    var label=listItem.querySelector(".tasks__name");
    var editBtn=listItem.querySelector(".tasks__edit-btn");
    var containsClass=listItem.classList.contains("tasks__item_edit");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("tasks__item_edit");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.tasks__edit-btn");
    var deleteButton=taskListItem.querySelector("button.tasks__delete-btn");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
