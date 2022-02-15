//create 

const taskList = [];
const badList = [];
const hrPerWek = 168;

let total;


const handleOnSubmit = (e) =>{
 
  // prevent default form submit
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hr = +frmData.get("hr");
  if( hr < 1) {
    return;
  }

  const ttlBadHrs = totalBadHrs();
  const total = taskList.reduce((subttl, item)=>{
    return subttl + item.hr;
  }, +hr);

  if ((ttlBadHrs + total) > hrPerWek){
    return alert("You have exceeded the maximum hours per week")
  }

  const obj ={
    task,
    hr,
  };

  taskList.push(obj);
  display();
  totalTaskHours();
}

const display =() =>{
  let str = "";
  taskList.map((item, i) =>{
    str += `
    <tr>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
      <button class="btn btn-delete" onclick="deletItem(${i})";>
        <i class="fa-solid fa-trash-can faa-shake animated-hover" title="Delete"></i>
      </button>
      <button class="btn btn-go" onclick="markAsNotToDo(${i})">
        <i class="fa-solid fa-arrow-right faa-horizontal animated-hover" title="Submit"></i>
      </button>
    </td>
  </tr>
    `
  });
  document.getElementById("task-list").innerHTML = str;

}

const displayBadList =() =>{
  let str = "";
  badList.map((item, i) =>{
    str += `
    <tr>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td class="text-end">
      <button class="btn btn-delete" onclick="deletItem1(${i})";>
        <i class="fa-solid fa-trash-can faa-shake animated-hover" title="Delete"></i>
      </button>
      <button class="btn btn-go" onclick="markAsGoodList(${i})">
        <i class="fa-solid fa-arrow-left faa-horizontal animated-hover" title="Submit"></i>
      </button>
    </td>
  </tr>
    `
  });
  document.getElementById("bad-list").innerHTML = str;

}

const deletItem = (i) =>{
  if (!confirm("Are you sure you want to delete this item?")){
    return;
  }
  taskList.splice(i, 1)
  totalTaskHours()
  display()
}

const deletItem1 = (i) =>{
  if (!confirm("Are you sure you want to delete this item?")){
    return;
  }
  badList.splice(i, 1)
  displayBadList()
  totalBadHrs()
  totalTaskHours()
}

const totalTaskHours = () =>{
  const total = taskList.reduce((subttl, item)=>{
    return subttl + item.hr;
  }, 0);
    const ttlBadHrs = totalBadHrs();
    const total1 = total + ttlBadHrs;
  document.getElementById("totalHours").innerText = total1;
};

const totalBadHrs = () =>{
  const total1 = badList.reduce((subttl, item)=>{
    return subttl + item.hr;
  }, 0);
  document.getElementById("totalBadHrs").innerText = total1;
  return total1;
  
};

const markAsNotToDo = i =>{
  const itm = taskList.splice(i, 1);
  display();
  badList.push(itm[0]);
  displayBadList();
  totalBadHrs();
  totalTaskHours()
  
}

const markAsGoodList = i =>{
  const itm1 = badList.splice(i, 1);
  displayBadList()
  taskList.push(itm1[0])
  display()
  totalBadHrs()
}