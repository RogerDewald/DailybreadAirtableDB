createChapterSelect()

const allVersesArray = [[], 
    ('Matthew', 28, [[], 25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20]), 
    ('Mark', 16, [[], 45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20]), 
    ('Luke', 24, [[], 80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53]), 
    ('John', 21, [[], 51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25]), 
    ('Acts', 28, [[], 26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31]), 
    ('Romans', 16, [[], 32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27]), 
    ('1 Corinthians', 16, [[], 31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24]), 
    ('2 Corinthians', 13, [[], 24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14]), 
    ('Galatians', 6, [[], 24, 21, 29, 31, 26, 18]), 
    ('Ephesians', 6, [[], 23, 22, 21, 32, 33, 24]), 
    ('Philippians', 4, [[], 30, 30, 21, 23]), 
    ('Colossians', 4, [[], 29, 23, 25, 18]), 
    ('1 Thessalonians', 5, [[], 10, 20, 13, 18, 28]), 
    ('2 Thessalonians', 3, [[], 12, 17, 18]), 
    ('1 Timothy', 6, [[], 20, 15, 16, 16, 25, 21]), 
    ('2 Timothy', 4, [[], 18, 26, 17, 22]), 
    ('Titus', 3, [[], 16, 15, 15]), 
    ('Philemon', 1, [[], 25]), 
    ('Hebrews', 13, [[], 14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25]), 
    ('James', 5, [[], 27, 26, 18, 17, 20]), 
    ('1 Peter', 5, [[], 25, 25, 22, 19, 14]), 
    ('2 Peter', 3, [[], 21, 22, 18]), 
    ('1 John', 5, [[], 10, 29, 24, 21, 21]), 
    ('2 John', 1, [[], 13]), 
    ('3 John', 1, [[], 15]), 
    ('Jude', 1, [[], 25]), 
    ('Revelation', 22, [[], 20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21])
]

//getFromAllVersesArray()

document.getElementById("bookSelect").addEventListener("change", function(){
    console.log(document.getElementById("bookSelect").value)
})

function getDate() {
    date = document.getElementById("inputDate").value
    return date
}

document.getElementById("weeklyBread").addEventListener("click", function(){
    //const verseArray = getVerseArray()
    //for (verse of verseArray){
    //}
    retrieveData()
})

//document.getElementById("totalVerses").addEventListener("click", function () {
//    retrieveAllVerses()
//})

document.getElementById("clearData").addEventListener("click", function(){
    var list = document.getElementById("output")
    console.log("clearClick")
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

function uploadData(){
    const yo = 'patDsSjpG0kxHv2b1.361c26eeffa690891d62e505d0c893515ef984f8a1201cdf8b5660aed6232e63';
    const baseId = 'appV7WLGs7utmV0m8';
    const tableName = 'tblrrXdYBMFIvYPlE'; // Replace with your table name
    const dateToFilter = getDate(); // Replace with your desired date
    const filterFormula = `DATETIME_FORMAT({Reading date beginning}, 'YYYY-MM-DD') = '${dateToFilter}'`;
  
    // Construct the URL to fetch data from Airtable

    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=${encodeURIComponent(filterFormula)}`;
    
    // Set up the request headers
    const headers = {
        Authorization: `Bearer ${yo}`,
        'Content-type': 'application/json',
    };


    fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            let verseCount = 0
            for (let i = 0; i <data.records.length;i++){ 
                if (data.records[i].fields["I completed every chapter this week"] == true){
                    verseCount = getTotalCount()
                }
                else {
                    verseCount = getVerseCount(data.records[i].fields["Days reporting"]) 
                }
                const recordIdToUpdate = data.records[i].id;
                const updateUrl = `https://api.airtable.com/v0/${baseId}/${tableName}/${recordIdToUpdate}`;


                const updatedRecord = {
                    fields: {
                        "Verse Count": verseCount,
                    },

                };

                fetch(updateUrl, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify(updatedRecord),
                })
                    .then(response => response.json())
                    .then(updatedData => {
                        console.log('Record updated:', updatedData);
                    })
                    .catch(error => {
                        console.error('Error updating record:', error);
                    });
 
                console.log(data)
            }}) 
        .catch(error => {
            console.error('Error:', error);
        });

        
}


function retrieveData() {
    const yo = 'patVda4XZrXZ0bO0K.288e91a938d45dbb9d4bc4d9908ce7da2e8e93d55b53b04b3d74e7afcc534abd';
    const baseId = 'appV7WLGs7utmV0m8';
    const tableName = 'tblrrXdYBMFIvYPlE'; // Replace with your table name
    const date = getDate().toString()

    const ul = document.getElementById("output")

    console.log(date)
    
    //const filterFormula = `({Reading date beginning} = '${date}')`;
    const dateToFilter = getDate(); // Replace with your desired date
    const filterFormula = `DATETIME_FORMAT({Reading date beginning}, 'YYYY-MM-DD') = '${dateToFilter}'`;
    // Construct the URL to fetch data from Airtable
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=${encodeURIComponent(filterFormula)}`;
    //const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    // Set up the request headers
    const headers = {
        Authorization: `Bearer ${yo}`,
    };

    // Make the GET request to retrieve records
    fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            let verseCount = 0

            const dateLi = document.createElement('li')
            dateLi.className = "dateList"
            dateLi.textContent = dateToFilter
            ul.appendChild(dateLi)

            let nameArray = []
            for (let i = 0; i <data.records.length;i++){
                //const li = document.createElement('li');
                if (data.records[i].fields["I completed every chapter this week"] == true){
                    verseCount = getTotalCount()
                }
                else {
                   verseCount = getVerseCount(data.records[i].fields["Days reporting"]) 
                }
                let textContent = data.records[i].fields.Name + (data.records[i].fields["I completed every chapter this week"] == undefined ? "" : " completed all chapters")
                                + ": read " + verseCount + " verses"  
                nameArray.push(textContent)
            }

            nameArray.sort()
            for (content of nameArray){
                console.log(content)
                const li = document.createElement('li')
                li.textContent = content
                ul.appendChild(li)
            }
            ul.style.outlineWidth = "2px"
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getVerseArray(){
    let vArray = []
    vArray.push(document.getElementById("day0").value)
    vArray.push(document.getElementById("day1").value)
    vArray.push(document.getElementById("day2").value)
    vArray.push(document.getElementById("day3").value)
    vArray.push(document.getElementById("day4").value)
    vArray.push(document.getElementById("day5").value)
    vArray.push(document.getElementById("day6").value)
    return vArray
}

//function getTotalCount() {
//    let count = 0
//    for (number of getVerseArray()){
//        count += parseInt(number)
//    }
//    return count
//}
function getTotalCount(){
    let count = 0
    for (number of getFromAllVersesArray()){
        count += parseInt(number)
    }
    return count
}

function getVerseCount(array){
    let verseArray = getFromAllVersesArray()
    let count = 0
    for (let i = 0; i<array.length;i++){
        if (array[i] == "Thursday"){
            count += parseInt(verseArray[0])
        }
        if (array[i] == "Friday"){
            count += parseInt(verseArray[1])
        }
        if (array[i] == "Saturday"){
            count += parseInt(verseArray[2])
        }
        if (array[i] == "Sunday"){
            count += parseInt(verseArray[3])
        }
        if (array[i] == "Monday"){
            count += parseInt(verseArray[4])
        }
        if (array[i] == "Tuesday"){
            count += parseInt(verseArray[5])
        }
        if (array[i] == "Wednesday"){
            count += parseInt(verseArray[6])
        }
        
    }
    return count
}


//function retrieveAllVerses(){
//    const token = 'patVda4XZrXZ0bO0K.288e91a938d45dbb9d4bc4d9908ce7da2e8e93d55b53b04b3d74e7afcc534abd';
//    const baseId = 'appV7WLGs7utmV0m8';
//    const tableName = 'tblrrXdYBMFIvYPlE'; // Replace with your table name
//
//    const ul = document.getElementById("output")
//    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
//
//    const headers = {
//        Authorization: `Bearer ${token}`,
//    }
//
//    fetch(url, { headers })
//        .then(response => response.json())
//        .then(data => {
//            // Handle the data returned by Airtable
//            //console.log(data.records[0].fields.Name)
//            /*
//            let verseCount = 0
//            const li = document.createElement('li');
//
//            for (let i = 0; i < data.records.length; i++) {
//                for (let i = 0; i<data.records.length;i++){
//                    verseCount += parseInt(data.records[i].fields["Verse Count"])
//                }
//            }
//            li.textContent = verseCount
//            ul.appendChild(li)
//            */
//            console.log(data);
//        })
//        .catch(error => {
//            console.error('Error:', error);
//        });
//}

function getFromAllVersesArray(){
    let startingChapter = document.getElementById("chapterSelect").value
    let startingBook = document.getElementById("bookSelect").value
    returnArr = []

    count = 0
    for (let i = startingBook; i<allVersesArray.length;i++){
        for (let j = startingChapter; j <allVersesArray[i].length;j++){
            count += 1
            //console.log(allVersesArray[i][j])
            returnArr.push(allVersesArray[i][j])
            //console.log(returnArr)
            if (count == 7){
                return returnArr
            }
        }
    }
}
