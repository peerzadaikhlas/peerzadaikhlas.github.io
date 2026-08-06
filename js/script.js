
    var contactUnlocked = false; // Initial state

    // --- NEW: Password System Function ---
    function askForPassword(actionText, successCallback) {
        openModal(
            actionText + " ACCESS",
            '<div style="margin-bottom: 0.8rem;">Enter the security code to unlock contact details and the resume PDF.</div>' +
            '<input type="password" id="passwordInput" placeholder="Enter code" style="' +
            'width: 100%; padding: 0.5rem; border-radius: 6px; border: 1px solid #A55EFF; ' +
            'background: rgba(255, 255, 255, 0.9); color: #050711; font-size: 0.9rem; margin-top: 0.2rem;' +
            '"/>' +
            '<div id="passwordError" style="color: #FF5EA5; font-size: 0.75rem; margin-top: 0.5rem; height: 1.1rem;"></div>',
            [
                { label: "Cancel", onClick: function () { modalBackdrop.classList.remove("show"); } },
                {
                    label: actionText,
                    primary: true,
                    onClick: function () {
                        var input = document.getElementById("passwordInput");
                        var errorDiv = document.getElementById("passwordError");
                        // --- SET YOUR CODE HERE ---
                        var correctCode = "1234"; 

                        if (input.value === correctCode) {
                            contactUnlocked = true;
                            modalBackdrop.classList.remove("show");
                            successCallback();
                        } else {
                            errorDiv.textContent = "Incorrect code. Try '1234' for this demo.";
                            input.value = "";
                            input.focus();
                        }
                    }
                }
            ]
        );
        // Focus the input field when the modal is shown
        setTimeout(function() {
            document.getElementById("passwordInput").focus();
        }, 100);
    }
    // --- END NEW: Password System Function ---


    // Smooth scroll
    document.querySelectorAll("[data-scroll]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var target = document.querySelector(btn.getAttribute("data-scroll"));
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            hamburgerMenu.classList.remove("open");
            hamburgerBtn.classList.remove("active");
        });
    });

    // Hamburger
    var hamburgerBtn = document.getElementById("hamburgerBtn");
    var hamburgerMenu = document.getElementById("hamburgerMenu");
    hamburgerBtn.addEventListener("click", function () {
        var isOpen = hamburgerMenu.classList.toggle("open");
        hamburgerBtn.classList.toggle("active", isOpen);
        hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    window.addEventListener("click", function (e) {
        if (!hamburgerMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            hamburgerMenu.classList.remove("open");
            hamburgerBtn.classList.remove("active");
        }
    });

    // Theme toggle
    var themeToggle = document.getElementById("themeToggle");
    var body = document.body;
    function setTheme(theme) {
        body.classList.remove("dark", "light");
        body.classList.add(theme);
        try { localStorage.setItem("ayan-theme", theme); } catch (e) {}
    }
    (function () {
        var saved = null;
        try { saved = localStorage.getItem("ayan-theme"); } catch (e) {}
        if (saved === "light" || saved === "dark") {
            setTheme(saved);
        } else {
            setTheme("light");
        }
    })();
    themeToggle.addEventListener("click", function () {
        var newTheme = body.classList.contains("dark") ? "light" : "dark";
        setTheme(newTheme);
    });

    // Slider
    var slides = document.querySelectorAll(".slide");
    var dots = document.querySelectorAll(".dot-btn");
    dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
            var index = Number(dot.getAttribute("data-slide"));
            slides.forEach(function (s, i) {
                s.classList.toggle("active", i === index);
            });
            dots.forEach(function (d, i) {
                d.classList.toggle("active", i === index);
            });
        });
    });

    // Modal helpers
    var modalBackdrop = document.getElementById("modalBackdrop");
    var modalTitle = document.getElementById("modalTitle");
    var modalBody = document.getElementById("modalBody");
    var modalFooter = document.getElementById("modalFooter");
    var modalCloseBtn = document.getElementById("modalCloseBtn");

    function openModal(title, bodyHtml, buttons) {
        modalTitle.textContent = title;
        modalBody.innerHTML = bodyHtml;
        modalFooter.innerHTML = "";
        buttons.forEach(function (btnConf) {
            var b = document.createElement("button");
            b.textContent = btnConf.label;
            if (btnConf.primary) b.classList.add("primary");
            b.addEventListener("click", btnConf.onClick || function () {
                modalBackdrop.classList.remove("show");
            });
            modalFooter.appendChild(b);
        });
        modalBackdrop.classList.add("show");
    }

    modalCloseBtn.addEventListener("click", function () {
        modalBackdrop.classList.remove("show");
    });

    modalBackdrop.addEventListener("click", function (e) {
        if (e.target === modalBackdrop) modalBackdrop.classList.remove("show");
    });

 
    // Contact map
    var contactMap = {
        twitter: {
            title: "X / TWITTER",
            bodyUnlocked: "My X (Twitter) handle is:<br><br>" +
                "<strong>@PATRIOT_SPIRIT0</strong><br><br>" +
                "Open profile in a new tab?",
            url: "https://x.com/PATRIOT_SPIRIT0"
        },
        instagram: {
            title: "INSTAGRAM",
            bodyUnlocked: "My Instagram username is:<br><br>" +
                "<strong>@ayanovaic</strong><br><br>" +
                "Open profile in a new tab?",
            url: "https://www.instagram.com/ayanovaic?igsh=bHFqNnZ2b3BjdDh6"
        },
        facebook: {
            title: "FACEBOOK",
            bodyUnlocked: "You can find me on Facebook here:<br><br>" +
                "<strong>Profile link available</strong><br><br>" +
                "Open profile in a new tab?",
            url: "https://www.facebook.com/share/17a1q3Gcvs/"
        },
        snapchat: {
            title: "SNAPCHAT",
            bodyUnlocked: "My Snapchat username is:<br><br>" +
                "<strong>ion.ayan</strong><br><br>" +
                "Open Snapchat add link in a new tab?",
            url: "https://www.snapchat.com/add/ion.ayan?share_id=kSGHloIg3B0&locale=en-IN"
        },
        whatsapp: {
            title: "WHATSAPP",
            bodyUnlocked: "You can message me on WhatsApp at:<br><br>" +
                "<strong>+91 6262591914</strong><br><br>" +
                "Click <strong>Open chat</strong> to start a chat with a pre‑filled greeting.",
            url: "https://wa.me/916262591914?text=Hi%20Peerzada%20Ikhlas%2C%20I%27m%20reaching%20out%20after%20visiting%20your%20portfolio."
        },
        email: {
            title: "GMAIL",
            bodyUnlocked: "My primary email address is:<br><br>" +
                "<strong>imshahayan@gmail.com</strong><br><br>" +
                "Click <strong>Write email</strong> to open your mail app with details pre‑filled.",
            url: "mailto:imshahayan@gmail.com?subject=Hello%20Peerzada%20Ikhlas%20%7C%20From%20your%20portfolio&body=Hi%20Peerzada%20Ikhlas%2C%0D%0A%0D%0AI%20just%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you%20about..."
        }
    };

    // Icon and social card buttons
    document.querySelectorAll("[data-contact]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var key = btn.getAttribute("data-contact");
            var conf = contactMap[key];
            if (!conf) return;

            function showUnlocked() {
                openModal(
                    conf.title,
                    conf.bodyUnlocked,
                    [
                        { label: "Close", onClick: function () { modalBackdrop.classList.remove("show"); } },
                        {
                            label: key === "email" ? "Write email" :
                                   key === "whatsapp" ? "Open chat" : "Open",
                            primary: true,
                            onClick: function () {
                                window.open(conf.url, "_blank");
                                modalBackdrop.classList.remove("show");
                            }
                        }
                    ]
                );
            }

            if (!contactUnlocked) {
                askForPassword("Unlock", showUnlocked);
            } else {
                showUnlocked();
            }
        });
    });

    // Quick contact button (hero)
    var contactPopupBtn = document.getElementById("contactPopupBtn");
    contactPopupBtn.addEventListener("click", function () {
        openModal(
            "QUICK CONTACT",
            "All my contact and social details are hidden inside the icons. " +
            "Use the password to unlock them and then choose WhatsApp, Gmail, or a social platform to reach me.",
            [
                { label: "Close", onClick: function () { modalBackdrop.classList.remove("show"); } }
            ]
        );
    });

    // Locked resume button
    var lockedResumeBtn = document.getElementById("lockedResumeBtn");
    lockedResumeBtn.addEventListener("click", function () {
        function openResume() { window.open("assets/resume.pdf", "_blank"); }
        if (!contactUnlocked) {
            askForPassword("Unlock", openResume);
        } else {
            openResume();
        }
    });

    // Resume in menu (also locked)
    var downloadResumeBtn = document.getElementById("downloadResumeBtn");
    downloadResumeBtn.addEventListener("click", function () {
        function openResume() { window.open("assets/resume.pdf", "_blank"); }
        if (!contactUnlocked) {
            askForPassword("Unlock", openResume);
        } else {
            openResume();
        }
    });

    // Let’s talk – connect now (UPDATED with Validation)
    var connectNowBtn = document.getElementById("connectNowBtn");
    connectNowBtn.addEventListener("click", function () {
        var name = (document.getElementById("talkName") || {}).value || "";
        var contact = (document.getElementById("talkContact") || {}).value || "";
        var message = (document.getElementById("talkMessage") || {}).value || "";

        name = name.trim();
        contact = contact.trim();
        message = message.trim();
        
        // --- NEW: Basic Validation ---
        if (!name || !contact || !message) {
             openModal(
                "FORM INCOMPLETE",
                "Please fill in your **Name**, **Contact**, and **Message** before connecting. Context is important!",
                [
                    { label: "Got it", primary: true, onClick: function () { modalBackdrop.classList.remove("show"); } }
                ]
            );
            return; // Stop execution if form is incomplete
        }
        // --- END NEW: Basic Validation ---

        var subject = encodeURIComponent("Let’s connect | From your portfolio");
        var bodyLines = [];
        bodyLines.push("Hi Peerzada Ikhlas,"); // Updated name
        bodyLines.push("");
        bodyLines.push("I visited your portfolio and would like to connect.");
        bodyLines.push("");
        if (name) bodyLines.push("Name: " + name);
        if (contact) bodyLines.push("Contact: " + contact);
        if (message) {
            bodyLines.push("");
            bodyLines.push("Message:");
            bodyLines.push(message);
        }
        bodyLines.push("");
        bodyLines.push("Sent via your portfolio.");

        var bodyMail = encodeURIComponent(bodyLines.join("
"));
        var mailto = "mailto:imshahayan@gmail.com?subject=" + subject + "&body=" + bodyMail;
        window.location.href = mailto;
    });

    // Footer year
    document.getElementById("yearSpan").textContent = new Date().getFullYear();
    
    // --- NEW: Scroll-Based Fade-In Trigger ---
    document.addEventListener("DOMContentLoaded", function() {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animated");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); 

        document.querySelectorAll(".fade-in-up").forEach(function(element) {
            observer.observe(element);
        });
    });
