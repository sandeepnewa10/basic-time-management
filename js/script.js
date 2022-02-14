//create 

const taskList = [];
const badList = [];
const hrPerWek = 168;

const handleOnSubmit = (e) =>{
  // prevent default form submit
  const frmData = new FormData(e);
  
  const task = frmData.get("task");
  const hr = +frmData.get("hr");

  const obj ={
    task,
    hr,
  };

  taskList.push(obj);
  display();
  totalTaskHours();
}

//
const display =() =>{
  let str = "";
  taskList.map((item, i) =>{
    str += `
    <tr>
    <td><input type="checkbox" name="" id="" /></td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
      <button class="btn btn-delete" onclick="deletItem(${i})";>
        <i class="fa-solid fa-trash-can" title="Delete"></i>
      </button>
      <button class="btn btn-go">
        <i class="fa-solid fa-arrow-right" title="Submit"></i>
      </button>
    </td>
  </tr>
    `
  })
  document.getElementById("task-list").innerHTML = str;

}

const deletItem = (i) =>{
  taskList.splice(i, 1)
  totalTaskHours()
  display()
}

const totalTaskHours = () =>{
  const total = taskList.reduce((subttl, item)=>{
    return subttl + item.hr;
  }, 0);
  document.getElementById("totalHours").innerText = total;
};

