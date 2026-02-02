// -------- Signup ----------
function signup(){
    let email=document.getElementById("signupEmail").value;
    let pass=document.getElementById("signupPass").value;
    if(!email||!pass){alert("Fill all fields");return;}
    let users=JSON.parse(localStorage.getItem("users")||"{}");
    if(users[email]){alert("User exists");return;}
    users[email]=pass;
    localStorage.setItem("users",JSON.stringify(users));
    alert("Signup successful, login now!");
}

// -------- Login ----------
function login(){
    let email=document.getElementById("loginEmail").value;
    let pass=document.getElementById("loginPass").value;
    let users=JSON.parse(localStorage.getItem("users")||"{}");
    if(users[email]&&users[email]===pass){
        localStorage.setItem("currentUser",email);
        window.location.href="dashboard.html";
    }else{alert("Invalid credentials");}
}

// -------- Logout ----------
function logout(){
    localStorage.removeItem("currentUser");
    window.location.href="index.html";
}

// -------- Dashboard ----------
let total=0;
let billList=[];

document.addEventListener("DOMContentLoaded",()=>{
    let user=localStorage.getItem("currentUser");
    if(!user){window.location.href="index.html";return;}
    document.getElementById("userEmail").innerText=user;
    let history=JSON.parse(localStorage.getItem("bills_"+user)||"[]");
    displayHistory(history);
});

function addItem(){
    let item=document.getElementById("item").value;
    let qty=Number(document.getElementById("qty").value);
    let price=Number(document.getElementById("price").value);
    if(!item||qty<=0||price<=0){alert("Fill correctly");return;}
    let itemTotal=qty*price;
    total+=itemTotal;
    billList.push({item,qty,price,total:itemTotal});
    let li=document.createElement("li");
    li.innerText=`${item} - ${qty} x ${price} = ₹${itemTotal}`;
    document.getElementById("billlist").appendChild(li);
    document.getElementById("total").innerText=total;
    document.getElementById("item").value="";
    document.getElementById("qty").value="";
    document.getElementById("price").value="";
    // Save
    let user=localStorage.getItem("currentUser");
    let history=JSON.parse(localStorage.getItem("bills_"+user)||"[]");
    history.push({date:new Date().toLocaleString(),items:billList,total});
    localStorage.setItem("bills_"+user,JSON.stringify(history));
    displayHistory(history);
    if(total>=1000){confettiEffect();}
}

function displayHistory(history){
    let ul=document.getElementById("history");
    ul.innerHTML="";
    history.forEach((bill)=>{
        let li=document.createElement("li");
        li.innerText=`${bill.date} - Total: ₹${bill.total}`;
        ul.appendChild(li);
    });
}

// -------- Print ----------
function printBill(){
    let content=document.getElementById("bill-area").innerHTML;
    let original=document.body.innerHTML;
    document.body.innerHTML=content;
    window.print();
    document.body.innerHTML=original;
}

// -------- PDF ----------
function downloadPDF(){
    let element=document.getElementById("bill-area");
    html2pdf().from(element).save("Bill.pdf");
}

// -------- Confetti ----------
function confettiEffect(){
    const duration=3*1000;
    const end=Date.now()+duration;
    (function frame(){
        confetti({particleCount:5,angle:60,spread:55,origin:{x:0}});
        confetti({particleCount:5,angle:120,spread:55,origin:{x:1}});
        if(Date.now()<end){requestAnimationFrame(frame);}
    }());
}