let options = [
    //html, css, js, github, console, figma subjects
    ["Tags", "Classes/ID's", "Links/Scripts", "The DOM", "Other"],
    ["Basics", "css Flex", "css Grid", "Bootstrap", "TailWind", "Styling", "Animations", "Other"],
    ["Basic Syntax", "Functions", "Events", "JQuery", "API's", "Storage", "JS Node", "JS React", "Other"],
    ["Repo setup", "Repo adds/commits", "ReadMe", "Collaborations", "Deployement", "Other"],
    ["Installations", "Functionals", "VS Pluggins", "Shortcuts", "Other"],
    ["Research", "Other"]]
let subjects = $("#subjects")
let subOptions = $("#subOptions")
let addNotes = $("#addNotes")
let catagory = ""
let newNotes = $("#newNotes")
let secondarySubject = ""
let newNote = $("#newNote")
let firstPage = $("#firstPage")
let reviewNotes = $("#reviewNotes")
let navSection = $("#navSection")
let currentNotes = []
let headingSpan = $("#headingSpan")
let noteBody = $("#noteBody")
let newArray = []
let saveAnEdit = $("#saveAnEdit")
let allNotes = $("#allNotes")
let everyNote = $("#everyNote")
let finalArray = []
let newTwoArray = []
let returnToStart = $("#returnToStart")


// when the 1st dropdown changes start the process
subjects.change(function (event) {
    event.stopPropagation()
    // gain the catagory though the change that took place on the 1st dropdown via a method
    // this refers to the parent item which is the subjects dropdown
    catagory = ("Subject: " + ($(this).val()))
    if (catagory === "Subject: html") { catagoryIndex = 0 }
    if (catagory === "Subject: css") { catagoryIndex = 1 }
    if (catagory === "Subject: JavaScript") { catagoryIndex = 2 }
    if (catagory === "Subject: GitHub") { catagoryIndex = 3 }
    if (catagory === "Subject: Console") { catagoryIndex = 4 }
    if (catagory === "Subject: Figma") { catagoryIndex = 5 }
    // using arrow function as only one action required, for each element in the array of sub lessons create a dom object that is the dropdown choice element = array value
    subOptions.html("")
    options[catagoryIndex].forEach(element => subOptions.append(`
    <option value="${element}">${element}`))
})

// on click confirming the 2 dropdowns have been decided check they both have a suitable value
addNotes.click(function (event) {
    event.stopPropagation()
    subOptions = $("#subOptions")
    secondarySubject = subOptions.val()
    // If both dropdowns are not on sleep option (untouched) then move to adding notes page Note: Jquery not equal to is !=
    if ((catagory != "drop") && (secondarySubject != "drop")) {
        notesPage()
    }
})

function notesPage() {
    headingSpan.text("")
    noteBody.text("")
    newNote = $("#newNote")
    let noteSub = $("#noteSub")
    let noteSubTwo = $("#noteSubTwo")
    firstPage = $("#firstPage")
    //show the notes boxes, hide the other items
    newNote.show()
    firstPage.hide()
    // load input page and use Jquery to populate lesson and sublesson per preferences on previous page
    //pull back returns from addNotes function that are in an array
    noteSub.text(catagory)
    noteSubTwo.text("Sub Catatagory: " + secondarySubject)
}

newNotes.click(function (event) {
    event.stopPropagation()
    let subHeading = headingSpan.text()
    let noteText = noteBody.text()
    let projectStatus = "Project Status"
    let understanding = "Understanding"
    let noteOptions = "Note Options"
    if ((subHeading != "") && (noteText != "")) {
        currentNotes = JSON.parse(localStorage.getItem('currentNotes')) || [];
        myArray = [catagory, secondarySubject, subHeading, noteText, projectStatus, understanding, noteOptions]
        currentNotes.push(myArray)
        localStorage.setItem('currentNotes', JSON.stringify(currentNotes))
        currentNotes = JSON.parse(localStorage.getItem('currentNotes')) || [];
        init()
    }
})

function init() {
    // init works for refresh and adding new notes now so that the lessons tab refreshes each time avoiding user issues after a note add or review
    newNote.hide()
    allNotes.hide()
    firstPage.show()
    //navSection.show()

    subjects.html("")
    subjects.append(`
    <option class="dropChoices" value="drop">Subjects</option>
    <option value="html">html</option>
    <option value="css">css</option>
    <option value="JavaScript">javascript</option>
    <option value="GitHub">github</option>
    <option value="Console">console</option>
    <option value="Figma">figma</option>`)

    subOptions.html('')
    subOptions.append(`
    <option value="drop">Lessons</option>`)

}

init()

reviewNotes.click(function (event) {
    event.stopPropagation()
    subOptions = $("#subOptions")
    secondarySubject = subOptions.val()
    console.log(secondarySubject)
    console.log(catagory)
    // If both dropdowns are not on sleep option (untouched) then move to review notes page Note: Jquery not equal to is !=
    if ((catagory !== "drop") && (secondarySubject !== "drop")) {
        firstPage.hide()
        console.log(secondarySubject)
        console.log(catagory)
        secondarySubject = subOptions.val()
        everyNote = $("#everyNote")
        allNotes.show()
        console.log("here")
        // Pull data from storage if catagory and sub cat match the request create viable html for these items
        currentNotes = JSON.parse(localStorage.getItem('currentNotes')) || [];
        for (let i = 0; i < currentNotes.length; i++) {
            if (((catagory === currentNotes[i][0])) && ((currentNotes[i][1]) === secondarySubject)) {
                //in case of changes in future steps create a disposable array of chosen items to be changed and readded to the original array
                newArray.push([currentNotes[i][0], currentNotes[i][1], currentNotes[i][2], currentNotes[i][3], currentNotes[i][4], currentNotes[i][5], currentNotes[i][6]])
                //console.log("Lesson: " + currentNotes[i][0], "Sub Lesson: " + currentNotes[i][1], "Unique Title :" + currentNotes[i][2], "Current Notes: " + currentNotes[i][3])
                everyNote.append(`
                                <div id ="fullNoteBox"class="border fullNoteBox">
                                <span class="odds uniqueNote">${currentNotes[i][0]}</span>
                                <span class="evens uniqueNote">${currentNotes[i][1]}</span>
                                <span class="uniqueNote odds" contenteditable="true">${currentNotes[i][2]}</span>
                                <span class="bottom uniqueNote" contenteditable="true">${currentNotes[i][3]}</span>

                                <div class="dropDown space">
                                    <select name="projectchtml" id="projecthtml">
                                        <option id="option "value="Project Status">${currentNotes[i][4]}</option>
                                        <option value="Added">Added</option>
                                        <option value="Pending">Pending</option>
                                    </select>

                                    <select name="subjecthtml" id="subjecthtml">
                                        <option id="option" value="Understanding">${currentNotes[i][5]}</option>
                                        <option value="Used">Used</option>
                                        <option value="Learning">Learning</option>
                                        <option value="Competent">Competent</option>
                                    </select>

                                    <select name="subjecthtml" id="subjecthtml">
                                        <option id="option" value="Note Options">${currentNotes[i][6]}</option>
                                        <option value="Ammend Note">Ammend Note</option>
                                        <option value="Delete Note">Delete Note</option>
                                    </select>
                                    </div>
                                </div>
                                </div>
                </div>`)
            }

        }
    }
    saveAnEdit = $("#saveAnEdit")
})
// saving an edit click in own function as appears to take a long time if in same function as next manipulation
saveAnEdit.click(function (event) {
    event.stopPropagation()
    saveEdit()
})

function saveEdit() {

    currentNotes = JSON.parse(localStorage.getItem('currentNotes')) || [];
    // remove all the current notes from local storage that contain ammended catagory
    let resultRemoval = currentNotes.filter(arr => !arr.includes(catagory))
    console.log(resultRemoval)

    // for each of the full notes that have been created dynamically using catagory put the child and sub child data to a new array
    let elements = $(".fullNoteBox")
    elements.children().each(function () {
        if (($(this).children().length === 0)) {
            if (newTwoArray.length > 6) {
                resultRemoval.push(newTwoArray)
                newTwoArray = []
            }
            newTwoArray.push($(this).text())
        } else {
            $(this).children().each(function () {

                ///// making sure index without delete is changed to Note Option on reload to ensure more changes can be selected without a mistake due to code
                if (($(this).children("option:selected").val()) === "Ammend Note") {
                    console.log(($(this).children("option:selected").val()))
                    newTwoArray.push("Note Options")
                } else {
                    newTwoArray.push(($(this).children("option:selected").val()))
                }
            })
        }
    })
    if (newTwoArray.length >= 0) {
        resultRemoval.push(newTwoArray)
        newTwoArray = []
    }
    console.log(resultRemoval)
    currentNotes = resultRemoval.filter(arr => !arr.includes("Delete Note"))
    console.log(currentNotes)

    localStorage.setItem('currentNotes', JSON.stringify(currentNotes))
    everyNote.html("")
    init()
}

returnToStart.click(function (event) {
    event.stopPropagation()
    init()
})



    //console.log(elements[child].text())


/// push the changes back to local storage
/// improve styling
/// make current notes editable again
