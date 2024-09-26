document.getElementById("weeklyBread").addEventListener("click", function(){
    retrieveData()
})

document.getElementById("clearData").addEventListener("click", function(){
    var list = document.getElementById("output")
    console.log(list.children.length)
    let length = list.children.length
    for (let i = 0; i < length; i++){
        list.removeChild(list.firstChild)
    }
    list.style.outlineWidth = "0px"
})

document.getElementById("uploadData").addEventListener("click", function(){
    uploadData();
})
