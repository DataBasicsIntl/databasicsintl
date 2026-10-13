// DataBasicsIntl.com — small site behaviours
(function () {
  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Copyright year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Contact form: file picker + submission
  var form = document.getElementById("contact-form");
  if (!form) return;

  var MAX_TOTAL_MB = 20;
  var MAX_FILES = 10;
  var input = document.getElementById("attachments");
  var drop = document.getElementById("file-drop");
  var list = document.getElementById("file-list");
  var status = document.getElementById("form-status");

  function totalBytes() {
    var t = 0;
    for (var i = 0; i < input.files.length; i++) t += input.files[i].size;
    return t;
  }

  function showFiles() {
    list.innerHTML = "";
    for (var i = 0; i < input.files.length; i++) {
      var f = input.files[i];
      var li = document.createElement("li");
      li.textContent = f.name + " (" + (f.size / 1048576).toFixed(1) + " MB)";
      list.appendChild(li);
    }
    if (input.files.length > MAX_FILES) {
      var many = document.createElement("li");
      many.className = "err";
      many.textContent = "Please choose no more than " + MAX_FILES + " files.";
      list.appendChild(many);
    }
    if (totalBytes() > MAX_TOTAL_MB * 1048576) {
      var warn = document.createElement("li");
      warn.className = "err";
      warn.textContent = "Files total more than " + MAX_TOTAL_MB + " MB. Please remove some, or email large files to info@DataBasicsIntl.com.";
      list.appendChild(warn);
    }
  }

  input.addEventListener("change", showFiles);
  ["dragenter", "dragover"].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("drag"); });
  });
  ["dragleave", "drop"].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("drag"); });
  });
  drop.addEventListener("drop", function (e) {
    if (e.dataTransfer && e.dataTransfer.files.length) {
      input.files = e.dataTransfer.files;
      showFiles();
    }
  });

  // Tell the form handler which site to send the visitor back to (live site, or preview)
  var ret = document.getElementById("return-to");
  if (ret) ret.value = window.location.origin + window.location.pathname.replace(/[^\/]*$/, "");

  // Show an error passed back from the form handler (contact.html?error=code).
  // Only these fixed messages are ever shown, never text taken from the URL.
  var CONTACT = " Please email info@DataBasicsIntl.com or call +1 (404) 314-2207.";
  var ERRORS = {
    missing: "Please fill in your name, message, and tick the consent box.",
    email: "Please enter a valid email address.",
    toolarge: "Your files are too large to send here (" + MAX_TOTAL_MB + " MB max)." + CONTACT,
    toomany: "Please attach no more than " + MAX_FILES + " files.",
    filetype: "One of your files is a type we can't accept through the form." + CONTACT,
    upload: "A file could not be uploaded. Please try again.",
    ratelimit: "Too many messages have been sent from your connection. Please try again later." + CONTACT,
    failed: "Sorry, your message could not be sent." + CONTACT
  };
  var err = new URLSearchParams(window.location.search).get("error");
  if (err) {
    status.className = "form-status error";
    status.textContent = ERRORS.hasOwnProperty(err) ? ERRORS[err] : ERRORS.failed;
  }

  // The form submits as a normal page POST; the handler redirects to thanks.html
  form.addEventListener("submit", function (e) {
    status.className = "form-status";
    if (input.files.length > MAX_FILES || totalBytes() > MAX_TOTAL_MB * 1048576) {
      e.preventDefault();
      status.className = "form-status error";
      status.textContent = "Your files are too large to send here (" + MAX_FILES + " files / " + MAX_TOTAL_MB + " MB max). Please email them to info@DataBasicsIntl.com.";
      return;
    }
    form.querySelector("button[type=submit]").disabled = true;
    status.textContent = input.files.length ? "Sending your message and files… please wait." : "Sending…";
  });

  // If the visitor comes back with the browser's Back button, re-enable the button
  window.addEventListener("pageshow", function () {
    form.querySelector("button[type=submit]").disabled = false;
  });
})();
