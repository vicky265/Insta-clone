function getTime() {
  let d = new Date(Date.now());

  hours = d.getHours();
  ampm = hours >= 12 ? "pm" : "am";

  if (hours < 10) {
    hours = `0${hours}`;
  }

  minutes = d.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  cTime = hours + ":" + minutes + " " + ampm;
  return cTime;
}

function createStatus({ imageURL, uName }) {
  const image = document.createElement("img");
  image.setAttribute("data-src", imageURL);
  image.setAttribute("src", imageURL);
  //   image.setAttribute("onclick", "show(" + imageURL + ")");
  //   image.setAttribute("onclick", "show()");
  image.setAttribute("class", "image");

  const prevImage = document.createElement("img");
  prevImage.setAttribute("data-src", imageURL);
  prevImage.setAttribute("src", "");
  //   prevImage.setAttribute("class", "show-img");

  const userName = document.createElement("p");
  userName.setAttribute(
    "style",
    "font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
  );
  userName.innerText = uName;

  const parentDiv = document.createElement("div");
  parentDiv.appendChild(image);
  parentDiv.appendChild(userName);
  parentDiv.setAttribute("class", "image-content");

  return parentDiv;
}

function createMultipleStatus(statuses) {
  const rootDiv = document.getElementById("status-container");

  btnImg1 = document.createElement("img");
  btnImg1.setAttribute("src", "Images/arrow.png");

  left = document.createElement("button");
  left.setAttribute("class", "pre-btn");
  left.appendChild(btnImg1);

  rootDiv.appendChild(left);

  wrap = document.createElement("div");
  wrap.setAttribute("class", "wrapper");
  for (let i of statuses) {
    const newItem = createStatus(i);
    wrap.appendChild(newItem);
  }
  rootDiv.appendChild(wrap);

  btnImg2 = document.createElement("img");
  btnImg2.setAttribute("src", "Images/arrow.png");

  right = document.createElement("button");
  right.setAttribute("class", "nxt-btn");
  right.appendChild(btnImg2);

  rootDiv.appendChild(right);
}
createMultipleStatus(statuses);

function createSugg({ imageURL, uName, followed }) {
  //   console.log(imageURL, followed);
  const image = document.createElement("img");
  image.setAttribute("src", imageURL);

  const userName = document.createElement("strong");
  userName.innerText = uName;

  const followedText = document.createElement("small");
  followedText.setAttribute("style", "color: grey");
  followedText.innerText = followed;

  const nameDetailDiv = document.createElement("div");
  nameDetailDiv.appendChild(userName);
  nameDetailDiv.appendChild(followedText);
  nameDetailDiv.setAttribute("class", "story-name-details");

  const profileContent = document.createElement("div");
  profileContent.setAttribute("class", "profile-image");
  profileContent.appendChild(image);
  profileContent.appendChild(nameDetailDiv);

  const followText = document.createElement("a");
  followText.setAttribute("class", "switch");
  followText.innerText = "Follow";

  const parentDiv = document.createElement("div");
  parentDiv.appendChild(profileContent);
  parentDiv.appendChild(followText);
  parentDiv.setAttribute("class", "i-suggestion");

  return parentDiv;
}

function listSuggestion(sugg) {
  const rootDiv = document.getElementById("i-suggestion");
  for (let i of sugg) {
    const newItem = createSugg(i);
    rootDiv.appendChild(newItem);
  }
}
listSuggestion(sugg);

function likePost() {
  document.querySelectorAll(".heart-icon").forEach((item) => {
    item.onclick = () => {
      item.classList.toggle("red");

      item.classList.contains("red")
        ? (item.innerHTML = `<i class="fas fa-heart"></i>`)
        : (item.innerHTML = `<i class="far fa-heart"></i>`);
    };
  });
}

function savePost() {
  document.querySelectorAll(".save-icon").forEach((item) => {
    item.onclick = () => {
      item.classList.toggle("grey");

      item.classList.contains("grey")
        ? (item.innerHTML = `<i class="fa-solid fa-bookmark"></i>`)
        : (item.innerHTML = `<i class="fa-regular fa-bookmark"></i>`);
    };
  });
}

const comment = document.getElementById("comment");

let cID = 0;
function commentEnter(e) {
  addTime = getTime();
  if (e.key === "Enter") {
    cID = cID + 1;
    let commentID = "comment" + cID;
    let commentValue = e.target.value;
    if (commentValue != "") {
      const div = document.createElement("div");
      div.classList = "each-comment";
      div.setAttribute("id", commentID);
      div.innerHTML = `
      <div class="comment" id="comment">
        <small> ${addTime}&nbsp&nbsp;</small>
        <p >
          ${commentValue}
        </p>
      </div>
      <div class="comment-response">  
        <a class="heart-icon">
            <i class="far fa-heart"></i>
        </a>
        <button class="reply"> <i class="fa-solid fa-reply fa-lg" style="color:black"></i></button>
      </div>
    `;

      resetComment(e.target);

      // e.target.parentNode.nextSibling.nextSibling.appendChild(div);
      e.target.parentNode.nextSibling.nextSibling.insertAdjacentElement(
        "afterend",
        div
      );
    }
  }
}

function resetComment(comment) {
  comment.value = "";
}

function instaFeed(feedData) {
  const rootDiv = document.getElementById("story-container");
  for (let i of feedData) {
    const div = document.createElement("div");
    div.classList = "each-story";
    div.innerHTML = `
          <div class="i-story-my-profile">
            <div class="image-content profile-image">
              <img src="${i.profileImage}"/>
              <div class="story-name-details">
                <strong> ${i.profileName} </strong>
                <p>${i.audio}</p>
              </div>
            </div>
            <i class="fa-solid fa-ellipsis"></i>
          </div>
          <div class="feed-image">
            <img src="${i.feedImage}" alt="Feed Image" />
          </div>
          <section class="list-icons">
            <div class="like-options">
              <a class="heart-icon">
                <i class="far fa-heart"></i>
              </a>
              <a><i class="fa-regular fa-comments go-to-comments"></i></a>
              <a><i class="fa-regular fa-paper-plane"></i></a>
            </div>
            <a class="save-icon"><i class="fa-regular fa-bookmark"></i></a>
          </section>
      
          <div class="total-likes" id="total-likes"></div>
          
          <div class="liked-by" id="liked-by"></div>
          
          <div class="comment-input comment-enter" id="each-comment">
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Add a comment here"
            />
          </div>
          <div class="comments-container"></div>
        `;
    rootDiv.appendChild(div);
  }
  likePost1(savePost);
}

instaFeed(feedData);
const enterComment = document.getElementsByClassName("comment-enter");
Array.from(enterComment).forEach((element) => {
  element.addEventListener("keypress", function (e) {
    commentEnter(e);
    likePost();SAXA

    document.querySelectorAll(".reply").forEach((item) => {
      item.onclick = () => {
        addReply(item);
      };
    });
  });
});

function addReply(item) {
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "reply");
  input.setAttribute("id", "reply");
  input.setAttribute("class", "reply reply-enter");
  input.setAttribute("placeholder", "Reply");

  thisComment = item.parentElement.parentElement;
  thisComment.insertAdjacentElement("afterend", input);

  document.querySelectorAll(".reply-enter").forEach((element) => {
    element.addEventListener("keypress", function (evnt) {
      replyEnter(evnt, thisComment);
      likePost();
    });
  });
}

function replyEnter(e, thisComment) {
  addTime = getTime();
  if (e.key === "Enter") {
    let replyValue = e.target.value;
    if (replyValue != "") {
      const div = document.createElement("div");
      div.classList = "each-reply";

      div.innerHTML = `
        <div class="reply" id="comment">
          <small> ${addTime}&nbsp&nbsp;</small>
          <p >
            ${replyValue}
          </p>
        </div>
        <div class="reply-response">  
          <a class="heart-icon">
              <i class="far fa-heart"></i>
          </a>
        </div>
      `;

      console.log(addTime, e.target.parentNode);
      resetComment(e.target);

      thisComment.insertAdjacentElement("afterend", div);
      document.getElementById("reply").style.display = "none";
    }
  }
}

document.querySelectorAll(".image-content img").forEach((item) => {
  item.onclick = () => {
    document.querySelector(".popup-image").style.display = "block";
    document.querySelector(".popup-image img").src = item.getAttribute("src");
  };
});

document.querySelector(".popup-image span").onclick = () => {
  document.querySelector(".popup-image").style.display = "none";
};

const wrapper = [...document.querySelectorAll(".wrapper")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

wrapper.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});

function likePost1(callback) {
  document.querySelectorAll(".heart-icon").forEach((item) => {
    item.onclick = () => {
      item.classList.toggle("red");

      item.classList.contains("red")
        ? (item.innerHTML = `<i class="fas fa-heart"></i>`)
        : (item.innerHTML = `<i class="far fa-heart"></i>`);
    };
  });
  callback();
}
