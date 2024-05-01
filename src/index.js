function getDate(){
    return document.getElementById("inputDate").value
}
function uploadData() {
    const baseId = 'appV7WLGs7utmV0m8';
    const tableName = 'tblrrXdYBMFIvYPlE'; // Replace with your table name
    const dateToFilter = getDate(); // Replace with your desired date
    const filterFormula = `DATETIME_FORMAT({Reading date beginning}, 'YYYY-MM-DD') = '${dateToFilter}'`;
    const yo = "patDsSjpG0kxHv2b1.361c26eeffa690891d62e505d0c893515ef984f8a1201cdf8b5660aed6232e63"

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
            for (let i = 0; i < data.records.length; i++) {

                if (data.records[i].fields["I completed every chapter this week"] == true) {
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
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function retrieveData() {
    const baseId = 'appV7WLGs7utmV0m8';
    const tableName = 'tblrrXdYBMFIvYPlE'; // Replace with your table name
    const yo = "patVda4XZrXZ0bO0K.288e91a938d45dbb9d4bc4d9908ce7da2e8e93d55b53b04b3d74e7afcc534abd"

    const ul = document.getElementById("output")

    const dateToFilter = getDate();
    const filterFormula = `DATETIME_FORMAT({Reading date beginning}, 'YYYY-MM-DD') = '${dateToFilter}'`;

    // Construct the URL to fetch data from Airtable
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=${encodeURIComponent(filterFormula)}`;

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
            for (let i = 0; i < data.records.length; i++) {

                if (data.records[i].fields["I completed every chapter this week"] == true) {
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
            for (content of nameArray) {
                const li = document.createElement('li')
                li.textContent = content
                ul.appendChild(li)
            }
            ul.style.outlineWidth = "2px"
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getTotalCount() {
    let count = 0
    for (number of getFromAllVersesArray()) {
        count += parseInt(number)
    }
    return count
}

function getVerseCount(array) {
    let verseArray = getFromAllVersesArray()
    let count = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] == "Thursday") {
            count += parseInt(verseArray[0])
        }
        if (array[i] == "Friday") {
            count += parseInt(verseArray[1])
        }
        if (array[i] == "Saturday") {
            count += parseInt(verseArray[2])
        }
        if (array[i] == "Sunday") {
            count += parseInt(verseArray[3])
        }
        if (array[i] == "Monday") {
            count += parseInt(verseArray[4])
        }
        if (array[i] == "Tuesday") {
            count += parseInt(verseArray[5])
        }
        if (array[i] == "Wednesday") {
            count += parseInt(verseArray[6])
        }

    }
    return count
}

function getFromAllVersesArray() {
    const startingChapter = document.getElementById("chapterSelect").value
    const startingBook = document.getElementById("bookSelect").value
    returnArr = []

    count = 0

    for (let i = startingBook; i < allVersesArray.length; i++) {
        for (let j = startingChapter; j < allVersesArray[i].length; j++) {

            count += 1

            returnArr.push(allVersesArray[i][j])

            if (count == 7) {
                return returnArr
            }
        }
    }

    //This second loop is for when we reach the end of the Bible and flow
    //into Matthew
    if (count < 7) {

        for (let j = 1; j < 28; j++) {

            count += 1

            returnArr.push(allVersesArray[1][j])

            if (count == 7) {
                return returnArr
            }
        }
    }
}
