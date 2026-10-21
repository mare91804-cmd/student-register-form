
"use strict";

// MODEL: stores and manages student data
const StudentModel = {
  storageKey: "registeredStudents",

  students: JSON.parse(
    localStorage.getItem("registeredStudents") || "[]"
  ),

  getStudents() {
    return this.students;
  },

  addStudent(student) {
    this.students.push(student);
    this.saveStudents();
  },

  emailExists(email) {
    return this.students.some(
      student => student.email.toLowerCase() === email.toLowerCase()
    );
  },

  saveStudents() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.students)
    );
  }
};


// VIEW: displays the registered students and messages
const StudentView = {
  render(students) {
    const list = document.getElementById("studentList");
    const count = document.getElementById("studentCount");

    list.replaceChildren();

    count.textContent = `Total Students: ${students.length}`;

    if (students.length === 0) {
      const item = document.createElement("li");
      item.textContent = "No students registered yet.";
      list.appendChild(item);
      return;
    }

    students.forEach((student, index) => {
      const item = document.createElement("li");

      item.textContent =
        `${index + 1}. ${student.name} — ${student.email}`;

      list.appendChild(item);
    });
  },

  showMessage(message, success = true) {
    const output = document.getElementById("message");

    output.textContent = message;
    output.style.color = success ? "green" : "red";
  }
};


// CONTROLLER: handles form submission and validation
const StudentController = {
  init() {
    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", event => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      // Validate the user's input
      if (!name || !email || password.length < 6) {
        StudentView.showMessage(
          "Please enter a name, valid email, and password of at least 6 characters.",
          false
        );
        return;
      }

      // Prevent duplicate email registration
      if (StudentModel.emailExists(email)) {
        StudentView.showMessage(
          "This email is already registered.",
          false
        );
        return;
      }

      // Save only name and email, never the password
      StudentModel.addStudent({ name, email });

      // Update the registered students list
      StudentView.render(StudentModel.getStudents());

      StudentView.showMessage(
        "Student registered successfully!"
      );

      form.reset();
    });

    // Display saved students when the page opens
    StudentView.render(StudentModel.getStudents());
  }
};


// Start the application
StudentController.init();
