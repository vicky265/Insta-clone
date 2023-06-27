// const commentsContainer = document.querySelector(".comments-container");

// Add Comment to Post
/*function addComment(rComm) {
  addTime = getTime();
  const div = document.createElement("div");
  div.classList = "each-comment";
  div.innerHTML = `
  <div class="comment" id="comment">
      <small> ${addTime} &nbsp;</small>
      <p >
          ${rComm.userComment}
      </p>
  </div>
  <span class="heart-icon">
      <i class="far fa-heart"></i>
      <button>Reply</button>
  </span>
`;

  // Insert comment
  commentsContainer.appendChild(div);
  //   commentsContainer.insertAdjacentElement("afterend", div);
}*/

// var ToggleBtn = document.getElementById("heart-icon");
// ToggleBtn.addEventListener("click", toggleBtn);

// function toggleBtn(ToggleBtn) {
//   if (ToggleBtn.style.color == "red") {
// ToggleBtn.style.color = "grey";
// ToggleBtn.innerHTML = `<i class="fas fa-heart"></i>`;
//   } else {
//     ToggleBtn.style.color = "red";
//     ToggleBtn.innerHTML = `<i class="fas fa-heart"></i>`;
//   }
//   console.log("Toggle Btn");
// }

// const showImage = document.querySelectorAll("show-img");
// showImage.forEach((item) => {
//   item.addEventListener("click", (event) => {
//     // const image = event.target.getAttribute("data-src");
//     // event.target.setAttribute("src", image);
//     console.log("Image Clicked");
//   });
// });
// Array.from(showImage).forEach((element) => {
//   element.addEventListener("click", function (e) {
//     show();
//   });
// });

// let replynone = document.getElementsByClassName("reply-enter")[0];
//       console.log("replynone : ", replynone.childNodes);
//   replynone.style.display = "none";
//   replyNone();

//   const div = document.createElement("div");
//   div.classList = "reply-enter";
//   //   div.id = "each-comment";
//   div.innerHTML = `<input
//       type="text"
//       name="reply"
//       id="reply"
//       placeholder="Reply"
//       class="reply"
//     />`;

//   crID = rID + 1;
//   const newElem = document.getElementById(commID);
//   const newElem = document.parentElement;
//   console.log("newElement : ", newElem);

// getcID = element.parentNode.getElementsByClassName("each-comment");
// // console.log("getcID : ", getcID);
// Array.from(getcID).forEach((ele) => {
//   ID = ele.attributes.id.value;
//   console.log("ID : ", ID);
// });

// rootDiv.innerHTML = `<i class="fas fa-angle-left"></i>`;
