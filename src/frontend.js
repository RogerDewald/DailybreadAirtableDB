createChapterSelect()

const nodeURL = "localhost"
const nodePORT = "7000"


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

function getDate() {

    if (document.getElementById("inputDate").value) {
        return document.getElementById("inputDate").value
    }
    else {
        alert("Input a Date")
        return -1
    }
}
document.getElementById("weeklyBread").addEventListener("click", function() {
    retrieveData()
})

document.getElementById("clearData").addEventListener("click", function() {
    var list = document.getElementById("output")
    console.log(list.children.length)
    let length = list.children.length
    for (let i = 0; i < length; i++) {
        list.removeChild(list.firstChild)
    }
    list.style.outlineWidth = "0px"
})

document.getElementById("uploadData").addEventListener("click", function() {
    openPopup()
})
document.getElementById("close").addEventListener("click", function() {
    authorize()
    closePopup()
})
document.getElementById("textInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        // Prevent the default action (form submission) of the Enter key
        event.preventDefault();
        // Click the submit button
        document.getElementById("close").click();
    }
})

async function uploadData(apiKey) {
    const baseId = 'appV7WLGs7utmV0m8';
    const tableName = 'tblrrXdYBMFIvYPlE'; // Replace with your table name
    const dateToFilter = getDate(); // Replace with your desired date
    const filterFormula = `DATETIME_FORMAT({Reading date beginning}, 'YYYY-MM-DD') = '${dateToFilter}'`;

    // Construct the URL to fetch data from Airtable

    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=${encodeURIComponent(filterFormula)}`;

    // Set up the request headers
    const headers = {
        Authorization: `Bearer ${apiKey}`,
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
                        alert("It is finished")
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


async function retrieveData() {
    let howdy = ""
    await fetch("http://127.0.0.1:8080/api/receive")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text()
        })
        .then(apiData => {
            howdy = apiData
            console.log(apiData)
            console.log(typeof apiData)
            console.log(howdy)
        })
        .catch(error => { console.error("error:", error) })

    const baseId = 'appV7WLGs7utmV0m8';
    const tableName = 'tblrrXdYBMFIvYPlE'; // Replace with your table name

    const ul = document.getElementById("output")

    const dateToFilter = getDate();

    const filterFormula = `DATETIME_FORMAT({Reading date beginning}, 'YYYY-MM-DD') = '${dateToFilter}'`;

    // Construct the URL to fetch data from Airtable
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=${encodeURIComponent(filterFormula)}`;
    const yo = "patVda4XZrXZ0bO0K.288e91a938d45dbb9d4bc4d9908ce7da2e8e93d55b53b04b3d74e7afcc534abd"
    if (yo == howdy) {
        alert("Alter!")
        return
    }

    // Set up the request headers
    let headers = {
        Authorization: `Bearer ${yo}`,
    };
    console.log(howdy)
    console.log(headers)

    // Make the GET request to retrieve records
    await fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            console.log(howdy)
            console.log(data)
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
            for (let content of nameArray) {
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
    for (let number of getFromAllVersesArray()) {
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
    let arr = []

    let count = 0

    for (let i = startingBook; i < allVersesArray.length; i++) {
        for (let j = startingChapter; j < allVersesArray[i].length; j++) {

            count += 1

            arr.push(allVersesArray[i][j])

            if (count == 7) {
                return arr
            }
        }
    }

    //This second loop is for when we reach the end of the Bible and flow
    //into Matthew
    if (count < 7) {

        for (let j = 1; j < 28; j++) {

            count += 1

            arr.push(allVersesArray[1][j])

            if (count == 7) {
                return arr
            }
        }
    }
}

function createChapterSelect() {
    let numberSelector = document.getElementById('chapterSelect');

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

    numbers.forEach(function(number) {
        let option = document.createElement('option');
        option.value = number;
        option.text = number;
        numberSelector.appendChild(option);
    });
}

function openPopup() {
    var popup = document.getElementById("popupContainer");
    popup.style.display = "flex";
    document.getElementById("textInput").focus()
}

function closePopup() {
    var popup = document.getElementById("popupContainer");
    popup.style.display = "none";
}

async function authorize() {
    let nameAuthorization = ""

    await fetch("/api/nameid")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text()
        })
        .then(data => {
            nameAuthorization = data
        })
        .catch(error => { console.error("error:", error) })
    console.log(nameAuthorization)

    if (document.getElementById("textInput").value != nameAuthorization) {
        alert("You are not authorized to upload")
    }
    else {
        const uploadKey = getUploadKey()
        uploadData(uploadKey)
    }
}

function getRetrieveKey() {
}

function getUploadKey() {
    fetch("/api/upload")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text()
        })
        .then(data => {
            return data
        })
        .catch(error => { console.error("error:", error) })

}
