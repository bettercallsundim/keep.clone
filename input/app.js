const btn = document.querySelector(".btn");
const lol = document.querySelector(".lol");
const over = document.querySelector(".over");
const message = document.querySelector(".message");

let note = `
<div class="item bg-gray-800 text-white border border-gray-400 rounded-xl px-4 py-6 text-sm flex flex-col items-start gap-y-4">
  <div class="dlt"><i class="fa-solid fa-delete-left"></i></div>
            <div class="title">
                <input type="text" placeholder="Add Title" class="bg-transparent outline-none border-none  text-sm font-bold focus:outline-none mytitle">
            </div>
            <div class="notes">
                <textarea class="text-white mynote text-sm resize-none bg-transparent border-none overflow-hidden  focus:border-none" placeholder="Add Note" name=""  ></textarea>
            </div>
        </div>
  `;
btn.addEventListener("click", () => {
 lol.insertAdjacentHTML("beforeend", note);
 if (lol.firstElementChild) {
  message.classList.add("hidden");
 } else {
  message.classList.remove("hidden");
 }

 if (window.innerWidth > 1000 && lol.childElementCount > 4) {
  lol.lastElementChild.scrollIntoView();

 }else if (window.innerWidth > 800 && window.innerWidth < 1000) {
  if (lol.childElementCount > 2) {
   lol.lastElementChild.scrollIntoView();
   console.log(3);
  }
 }else if (lol.childElementCount > 1 && window.innerWidth < 600) {
  lol.lastElementChild.scrollIntoView();
  console.log(2);
 }

 ////master array
 let masterData = JSON.parse(localStorage.getItem("noteData")) || [];
 let individualData = {
  title: "",
  noting: "",
 };
 masterData.push(individualData);
 localStorage.setItem("noteData", JSON.stringify(masterData));
 thisISGold();
});

function thisISGold() {
 const items = document.querySelectorAll(".item");
 const mytitle = document.querySelectorAll(".mytitle");
 const mynote = document.querySelectorAll(".mynote");
 const dlt = document.querySelectorAll(".dlt");
 let downloadedData = JSON.parse(localStorage.getItem("noteData"));

 dlt.forEach((element, ind) => {
  element.onclick = (e) => {
   e.stopPropagation();
   downloadedData.splice(ind, 1);
   localStorage.setItem("noteData", JSON.stringify(downloadedData));
   items[ind].remove();
   if (lol.firstElementChild) {
    message.classList.add("hidden");
   } else {
    message.classList.remove("hidden");
   }
  };
 });
 mykostum(items, mytitle, mynote);
 return items;
}
function mykostum(items, mytitle, mynote) {
 items.forEach((item, ind) => {
  item.onclick = () => {
   item.classList.add("klicked");
   item.scrollIntoView();
   over.classList.add("overlay");
  };
  let iscursorinside = false;
  item.addEventListener("mouseover", () => {
   iscursorinside = true;
  });
  item.addEventListener("mouseout", () => {
   iscursorinside = false;
  });
  document.addEventListener("click", function () {
   if (!iscursorinside) {
    if (item.classList.contains("klicked")) {
     if (mytitle[ind].value != "" && mynote[ind].value != "") {
      let titleVal = mytitle[ind].value;
      let noteVal = mynote[ind].value;
      updateData(ind, titleVal, noteVal);
     }
     over.classList.remove("overlay");
     item.classList.remove("klicked");
    }
   }
  });
 });
}
window.addEventListener("load", () => {
 let downloadedData = JSON.parse(localStorage.getItem("noteData"));

 if (downloadedData) {
  for (let x = 0; x < downloadedData.length; x++) {
   if (downloadedData[x].title != "" && downloadedData[x].noting != "") {
    lol.innerHTML += `
            <div class="item bg-gray-800 text-white border border-gray-400 rounded-xl px-4 py-6 text-sm flex flex-col items-start gap-y-4">
              <div class="dlt"><i class="fa-solid fa-delete-left"></i></div>
                        <div class="title">
                            <input type="text" placeholder="Add Title" class="bg-transparent outline-none border-none  text-sm font-bold focus:outline-none mytitle" value="${downloadedData[x].title}">
                        </div>
                        <div class="notes">
                            <textarea class="text-white mynote text-sm resize-none bg-transparent border-none overflow-hidden focus:border-none" placeholder="Add Note">${downloadedData[x].noting}</textarea>
                        </div>
                    </div>
              `;
   }
  }
 }
 const items = document.querySelectorAll(".item");
 const mytitle = document.querySelectorAll(".mytitle");
 const mynote = document.querySelectorAll(".mynote");
 const dlt = document.querySelectorAll(".dlt");
 thisISGold();
 if (lol.firstElementChild) {
  message.classList.add("hidden");
 } else {
  message.classList.remove("hidden");
 }
});

function updateData(ind, titleVal, noteVal) {
 let downloadedData = JSON.parse(localStorage.getItem("noteData"));
 downloadedData[ind].title = titleVal;
 downloadedData[ind].noting = noteVal;
 localStorage.setItem("noteData", JSON.stringify(downloadedData));
}
