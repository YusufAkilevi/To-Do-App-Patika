const inputText = document.querySelector(".input");
const btnAdd = document.querySelector(".button-add");
const taskList = document.querySelector(".list");

const tasksArray = [];
let count = 0;

const clearInput = () => {
  inputText.value = "";
};

const addCheckIcon = (parentElement) => {
  if (!parentElement) return;
  parentElement.insertAdjacentHTML(
    "afterbegin",
    `<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon icon-check"
        id="icon-check-${parentElement.dataset.no}"
        data-no="${parentElement.dataset.no}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>`
  );
};

const renderList = (parentElement, task, id, isChecked, listItem) => {
  const html = `
    <li class="list-item " id="${id}" data-no="${id}" data-job="checked">

       ${task}
        <div class="icon-close" data-no="${id}" data-job="close">
           <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           stroke-width="1.5"
           stroke="currentColor"
           class="icon"
           data-job="close"
           data-no="${id}"
           >
           <path
           data-job="close"
           data-no="${id}"
           stroke-linecap="round"
           stroke-linejoin="round"
           d="M6 18L18 6M6 6l12 12"
           />
           </svg>
       </div>

     </li>
 `;
  if (document.querySelector(".empty-text"))
    document.querySelector(".empty-text").remove();
  parentElement.insertAdjacentHTML("afterbegin", html);
};

window.addEventListener("load", function () {
  count = localStorage.getItem("count");
  const tasksArray = JSON.parse(localStorage.getItem("tasks"));
  tasksArray.forEach((item) => {
    const listItem = document.getElementById(item.id);
    renderList(taskList, item.task, item.id, item.isChecked, listItem);
  });
});

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  const task = inputText.value;
  if (task === "") return;
  count++;
  localStorage.setItem("count", count);
  renderList(taskList, task, count);
  tasksArray.push({ id: count, task: task, isChecked: false });
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  clearInput();
});

taskList.addEventListener("click", function (e) {
  const target = e.target;

  if (target.dataset.job === "close") {
    document.getElementById(`${target.dataset.no}`).remove();
    tasksArray.forEach((item, i) => {
      if (item.id == target.dataset.no) {
        tasksArray.splice(i, 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
  if (target.dataset.job === "checked") {
    const listItem = document.getElementById(`${target.dataset.no}`);
    const checkIcon = document.getElementById(
      `icon-check-${listItem.dataset.no}`
    );

    listItem.classList.toggle("checked");
    tasksArray.forEach((item) => {
      if (item.id == target.dataset.no) {
        listItem.classList.contains("checked")
          ? (item.isChecked = true)
          : (item.isChecked = false);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasksArray));

    if (!checkIcon) {
      addCheckIcon(listItem);
    }
    if (checkIcon) {
      checkIcon.remove();
    }
  }
});
// localStorage.clear();
