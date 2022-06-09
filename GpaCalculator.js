//Functions

window.onload = () => {
  document.getElementById("output").style.display = "none";
};

//To add courses
const addMoreCourses = () => {
  let template = document.getElementById("add");
  table.innerHTML += template.innerHTML;
};

//To add courses on button click
const onBtnClick = () => {
  let output = document.getElementById("output-container");
  for (let i = 0; i < 3; i++) {
    addMoreCourses();
    outputRows(output);
  }
  let box = document.querySelectorAll(".output-boxes");
  for (let i = 0; i < box.length; i++) {
    box[i].innerHTML = "";
  }
  let c = document.querySelectorAll("#credit");
  let g = document.querySelectorAll("#grades");
  for (let i = 0; i < data.length; i++) {
    c[i].value = data[i].credit;
    g[i].value = data[i].grade;
  }
  document.getElementById("output").style.display = "none";
};

//To get name of course
const courseName = () => {
  let c = document.querySelectorAll("#course");
  for (let i = 0; i < c.length; i++) {
    c[i].addEventListener("change", function () {
      data[i].course = c[i].value;
    });
  }
};

//To get value of credit hours
const valCredit = () => {
  let c = document.querySelectorAll("#credit");
  for (; c.length > data.length; ) {
    data[data.length++] = {
      course: "",
      credit,
      grade,
    };
  }
  for (let i = 0; i < c.length; i++) {
    c[i].addEventListener("change", function () {
      data[i].credit = c[i].value;
    });
  }
};

//to get value of grades
const valGrade = () => {
  let g = document.querySelectorAll("#grades");
  for (; g.length > data.length; ) {
    data[data.length++] = {
      course: "",
      credit,
      grade,
    };
  }
  for (let i = 0; i < g.length; i++) {
    g[i].addEventListener("change", function () {
      data[i].grade = g[i].value;
    });
  }
};

//To find summ of array
const sum = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

//To convert string to int
const convertToInt = (obj) => {
  return parseInt(obj);
};

//Covert grade into points
const gradePoints = (data, i) => {
  let a;
  if (data[i].grade === "A+") {
    a = 4.0;
  } else if (data[i].grade === "A") {
    a = 4.0;
  } else if (data[i].grade === "A-") {
    a = 3.7;
  } else if (data[i].grade === "B+") {
    a = 3.3;
  } else if (data[i].grade === "B") {
    a = 3.0;
  } else if (data[i].grade === "B-") {
    a = 2.7;
  } else if (data[i].grade === "C+") {
    a = 2.3;
  } else if (data[i].grade === "C") {
    a = 2.0;
  } else if (data[i].grade === "C-") {
    a = 1.7;
  } else if (data[i].grade === "D+") {
    a = 1.3;
  } else if (data[i].grade === "D") {
    a = 1.0;
  } else if (data[i].grade === "D-") {
    a = 0.7;
  } else if (data[i].grade === "F") {
    a = 0.0;
  }
  return a;
};

//To calculate gpa
const gpa = (arr) => {
  let hr = [];
  let gpa;
  let creditSum = 0;
  let outputHr = document.getElementById("hr-output");
  let total = sum(arr);
  for (let i = 0; i < data.length; i++) {
    hr[i] = convertToInt(data[i].credit);
    if (
      hr[i] &&
      data[i].grade &&
      data[i].grade !== "--" &&
      data[i].grade !== "WF" &&
      data[i].grade !== "I"
    ) {
      creditSum += hr[i];
    }
  }
  outputHr.innerHTML = creditSum;
  gpa = total / creditSum;
  return gpa;
};

//output
const output = () => {
  let output = document.getElementById("output-container");
  for (let i = 0; i < 2; i++) {
    outputRows(output);
  }
};

//To  add more outputs
const outputRows = (output) => {
  let add = document.getElementById("output-data");
  output.innerHTML += add.innerHTML;
};

//Getting output data
const outputData = () => {
  let s = document.querySelectorAll("#output-course");
  let c = document.querySelectorAll("#output-credit");
  let g = document.querySelectorAll("#output-grade");
  let n = 0;
  for (let i = 0; i < data.length; i++) {
    s[i].innerHTML = "";
    c[i].innerHTML = "";
    g[i].innerHTML = "";
    if (
      data[i].credit &&
      data[i].grade &&
      data[i].grade != "--" &&
      data[i].grade !== "WF" &&
      data[i].grade !== "I"
    ) {
      s[n].innerHTML = data[i].course;
      c[n].innerHTML = data[i].credit;
      g[n++].innerHTML = data[i].grade;
      console.log("1234");
    }
  }
};

//Main

let table = document.getElementById("Gpa");
let i = 2;

//To add two more courses
  while (i > 0) {
    addMoreCourses();
    i--;
  }


let credit, grade;
let data = [
  {
    course: "",
    credit,
    grade,
  },
];
courseName();
valCredit();
valGrade();
console.log(data);

let addButton = document.getElementById("add-btn");
addButton.addEventListener("click", onBtnClick);
addButton.addEventListener("click", valCredit);
addButton.addEventListener("click", valGrade);

//To calculate gpa
let calculateBtn = document.getElementById("calculate-btn");
calculateBtn.addEventListener("click", function () {
  let a;
  let mul = [];
  let n = 0;
  let c = document.querySelectorAll("#output-grade-points");
  let outputTable = document.getElementById("output");
  outputTable.style.display = "block";

  for (let i = 0; i < data.length; i++) {
    c[n].innerHTML = "";
    if (
      data[i].credit &&
      data[i].grade &&
      data[i].grade !== "--" &&
      data[i].grade !== "WF" &&
      data[i].grade !== "I"
    ) {
      a = gradePoints(data, i);
      mul[n] = data[i].credit * a;
      c[n++].innerHTML = `${data[i].credit}*${a}=${mul[n - 1].toFixed(3)}`;
    }
  }
  console.log(mul);
  let finalGpa = gpa(mul);
  console.log(finalGpa);
  let outputGpa = document.getElementById("gpa-output");
  outputGpa.innerHTML = finalGpa.toFixed(3);
  outputData();
});
output();

//Functionality of clear button
let clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener(
  "click",
  (clear = () => {
    for (let i = 0; i < data.length; i++) {
      console.clear();
      let s = document.querySelectorAll("#output-course");
      let c = document.querySelectorAll("#output-credit");
      let g = document.querySelectorAll("#output-grade");
      let gp = document.querySelectorAll("#output-grade-points");
      for (let i = 0; i < data.length; i++) {
        s[i].innerHTML = "";
        c[i].innerHTML = "";
        g[i].innerHTML = "";
        gp[i].innerHTML = "";
      }
      let nr = document.querySelectorAll("#course");
      let cr = document.querySelectorAll("#credit");
      let gr = document.querySelectorAll("#grades");
      for (let i = 0; i < data.length; i++) {
        nr[i].value = "";
        cr[i].value = "";
        gr[i].value = "";
        data[i].course = "";
        data[i].credit = "";
        data[i].grade = "";
      }
      data.length = 1;
    }
    let outputGpa = document.getElementById("gpa-output");
    outputGpa.innerHTML = "";
    let outputHr = document.getElementById("hr-output");
    outputHr.innerHTML = "";
    document.getElementById("output").style.display = "none";

  })
);
