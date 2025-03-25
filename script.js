const textArea = document.getElementById("user-text");
const output = document.getElementById("output");
const submitButton = document.getElementById("submit-button");

textArea.addEventListener('input', function(){
output.textContent = textArea.value.length;

if (this.value.length >= 284){
        this.readOnly = true;
        console.log("You've reached maximum character limit");
    }else if (this.readOnly && totalCharacters < 284){
        this.readOnly = false; 
    }
});

textArea.addEventListener("keydown", function(e){
    const postButton = document.getElementById("submit-button");

    if(this.value.length >= 284 && e.key.length === 1){
        e.preventDefault();
    }else if (e.key === "Backspace" || e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown"){
        this.readOnly = false;
    }else if (e.key === 'Enter' && e.shiftKey){
        e.preventDefault();
        textArea.value += '\n';
    } else if (e.key === 'Enter'){
        e.preventDefault();
        postButton.click();
    }
});


const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', function(event) {
    
    const file = event.target.files[0];
    if(file){
        const reader = new FileReader();
        uploadingImage = true;
        reader.onload = function(e) {
            document.getElementById("preview").src = e.target.result;
            document.getElementById("preview").style.display = "block";
            
        };
        
        reader.readAsDataURL(file);
    }
   
});


    const fileInput = document.getElementById("file-selector");
    var uploadingImage = false;
    fileInput.addEventListener("change", function(event){
        uploadingImage = true;
    });

    document.querySelectorAll("textarea").forEach(function(textarea) {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.overflowY = "hidden";

    textarea.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    });

});



document.getElementById("submit-button").addEventListener("click", function(event){  
    event.preventDefault();
    // Prevents default form submission

    var content = document.getElementById("user-text").value;
    var imgFile = "<%= imgFile %>";

    if (content.trim() !== "") {
        saveContent(content, imgFile);
        // formP.submit();
        document.getElementById("user-text").value = "";
        document.getElementById("file-selector").value = ""; // Clear file input
    }
    
    
    // event.preventDefault();
    
    // var content = document.getElementById("user-text").value;
    // var imageFile = document.getElementById("file-selector").value;
    // var src = "./images/uploads/" + imageFile ;

    //  if (content.trim() != " "){
        
    //     saveContent(content);
    //     console.log("Clicked Function: " + content);
    //     document.getElementById("user-text").value = " ";
    //     document.getElementById("file-selector").value = "";
    // }else if(content.trim() != " " && uploadingImage == true){
        
    //     saveContent(content);
    //     console.log("Clicked Function: " + content);
    //     document.getElementById("user-text").value = " ";
    //     document.getElementById("file-selector").value = "";
    // }else if(content.trim() == " " && uploadingImage == true){
        
    //     saveContent(content);
    //     console.log("Clicked Function: " + content);
    //     document.getElementById("user-text").value = " ";
    //     document.getElementById("file-selector").value = "";
    // }
});




function createPost(content, imgFile){
    
    const postedBox = document.createElement("div");
    postedBox.className = "posted-box";

    const contentBox = document.createElement("div");
    contentBox.className = "content-box";
    postedBox.appendChild(contentBox);

    const contentAreaBox = document.createElement("div");
    contentAreaBox.className = "content-area-box";
    contentBox.appendChild(contentAreaBox);

    const userPicture = document.createElement("div");
    userPicture.className = "user-picture";
    contentAreaBox.appendChild(userPicture);

    const contentArea = document.createElement("div");
    contentArea.className = "content-area";
    contentAreaBox.appendChild(contentArea);
    
    const postInformation = document.createElement("div");
    postInformation.className = "post-information";
    contentArea.appendChild(postInformation);

  
    const userTextPosted = document.createElement("div");
    userTextPosted.className = "user-text-posted";
    userTextPosted.textContent = content;
    contentArea.appendChild(userTextPosted);

if (imgFile) {
const imgData = document.createElement("img");
imgData.src = "/images/uploads/" + imgFile;
imgData.className = "preview";
contentArea.appendChild(imgData);
}
    

    document.getElementById("home-page-container").appendChild(postedBox);
   
    console.log("creatPost Function: " + content);
}

function saveContent(content, imgFile){
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.push({ content: content, imgFile: imgFile});
    localStorage.setItem("posts", JSON.stringify(posts));
    createPost(content, imgFile);

    // let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    // posts.push(content);
    // localStorage.setItem("posts", JSON.stringify(posts));
    // createPost(content);
    // console.log("saveContent Function: " + content + " " + posts);
}

window.onload = function(){
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.forEach(createPost);
    console.log("window onload Function: " + posts);
};






// localStorage.clear();