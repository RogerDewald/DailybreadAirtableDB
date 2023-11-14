function getDate() {
    date = document.getElementById("inputDate").value
    return date
}

document.getElementById("weeklyBread").addEventListener("click", function(){
    const verseArray = getVerseArray()
    for (verse of verseArray){
    }
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

            for (let i = 0; i <data.records.length;i++){
                const li = document.createElement('li');
                if (data.records[i].fields["I completed every chapter this week"] == true){
                    verseCount = getTotalCount()
                }
                else {
                   verseCount = getVerseCount(data.records[i].fields["Days reporting"]) 
                }
                li.textContent = data.records[i].fields.Name + (data.records[i].fields["I completed every chapter this week"] == undefined ? "" : " completed all chapters")
                                + ": read " + verseCount + " verses"
                ul.appendChild(li)
                console.log(data.records[i].fields)
            }
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

function getTotalCount() {
    let count = 0
    for (number of getVerseArray()){
        count += parseInt(number)
    }
    return count
}
function getVerseCount(array){
    let verseArray = getVerseArray()
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


function retrieveAllVerses(){
    const token = 'patVda4XZrXZ0bO0K.288e91a938d45dbb9d4bc4d9908ce7da2e8e93d55b53b04b3d74e7afcc534abd';
    const baseId = 'appV7WLGs7utmV0m8';
    const tableName = 'tblrrXdYBMFIvYPlE'; // Replace with your table name

    const ul = document.getElementById("output")
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            // Handle the data returned by Airtable
            //console.log(data.records[0].fields.Name)
            /*
            let verseCount = 0
            const li = document.createElement('li');

            for (let i = 0; i < data.records.length; i++) {
                for (let i = 0; i<data.records.length;i++){
                    verseCount += parseInt(data.records[i].fields["Verse Count"])
                }
            }
            li.textContent = verseCount
            ul.appendChild(li)
            */
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
