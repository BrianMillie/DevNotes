var options = [
    //html, css, js, github, console, figma subjects
    ["Tags", "Classes/ID's", "Links/Scripts", "The DOM", "Other"],
    ["Basics", "css Flex", "css Grid", "Bootstrap", "TailWind", "Styling", "Animations", "Other"],
    ["Basic Syntax", "Functions", "Events", "JQuery", "API's, Storage, JSON)", "JS Node", "JS React", "Other"],
    ["Repo setup", "Repo adds/commits", "ReadMe", "Collaborations", "Deployement", "Other"],
    ["Installations", "Functionals", "VS Pluggins", "Shortcuts", "Other"],
    ["Research", "Other"]]
var subjects = $('#subjects')
var subOptions = $("#subOptions")
var addNotes = $("#addNotes")


subjects.change(function (event) {
    event.preventDefault()
    // gain the catagory though the change that took place on the 1st dropdown via a method
    // this refers to the parent item which is the subjects click button
    var catagory = $(this).val()
    if (catagory === "html") { catagoryIndex = 0 }
    if (catagory === "css") { catagoryIndex = 1 }
    if (catagory === "javascript") { catagoryIndex = 2 }
    if (catagory === "github") { catagoryIndex = 3 }
    if (catagory === "console") { catagoryIndex = 4 }
    if (catagory === "figma") { catagoryIndex = 5 }
    console.log(catagory, catagoryIndex)
    options[catagoryIndex].forEach(element => subOptions.append(`
    <option value="${catagory}">${element}`))
})

