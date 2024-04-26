//Creates the options for the chapter select
function createChapterSelect(){
    let numberSelector = document.getElementById('chapterSelect');

    let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];

    numbers.forEach(function(number) {
        let option = document.createElement('option');
        option.value = number;
        option.text = number;
        numberSelector.appendChild(option);
    });
}
