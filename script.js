document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. LOGIKA NAVBAR MOBILE (HAMBURGER MENU)
    // ==========================================
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // ==========================================
    // 2. ANIMASI SCROLL REVEAL (IntersectionObserver)
    // ==========================================
    const observerOptions = {
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach(el => scrollObserver.observe(el));

    // ==========================================
    // 3. DIAGRAM LINGKARAN KEAHLIAN (CHART.JS)
    // ==========================================
    const ctx = document.getElementById("skillsChart").getContext("2d");

    // Membuat Gradien Warna Neon/Vibrant
    const grad1 = ctx.createLinearGradient(0, 0, 0, 300);
    grad1.addColorStop(0, "#6366f1");
    grad1.addColorStop(1, "#818cf8"); // Indigo Neon

    const grad2 = ctx.createLinearGradient(0, 0, 0, 300);
    grad2.addColorStop(0, "#06b6d4");
    grad2.addColorStop(1, "#38bdf8"); // Cyan Neon

    const grad3 = ctx.createLinearGradient(0, 0, 0, 300);
    grad3.addColorStop(0, "#10b981");
    grad3.addColorStop(1, "#34d399"); // Emerald Neon

    const grad4 = ctx.createLinearGradient(0, 0, 0, 300);
    grad4.addColorStop(0, "#a855f7");
    grad4.addColorStop(1, "#c084fc"); // Purple Neon

    const grad5 = ctx.createLinearGradient(0, 0, 0, 300);
    grad5.addColorStop(0, "#f59e0b");
    grad5.addColorStop(1, "#fbbf24"); // Amber Neon

    // Register Plugin DataLabels
    Chart.register(ChartDataLabels);

    const isMobile = window.innerWidth < 480;

    // Inisialisasi Chart (Pie / Lingkaran Penuh)
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: [
                "HTML & CSS",
                "JavaScript",
                "Responsive Web Design",
                "UI/UX Design",
                "Git & Deployment"
            ],
            datasets: [
                {
                    data: [30, 25, 15, 15, 15],
                    backgroundColor: [grad1, grad2, grad3, grad4, grad5],
                    borderWidth: 2,
                    borderColor: "#121826",
                    hoverBorderWidth: 3,
                    hoverOffset: 14
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1500,
                easing: "easeOutQuart"
            },
            plugins: {
                // Legenda / Keterangan Warna
                legend: {
                    position: "bottom",
                    labels: {
                        color: "#cbd5e1",
                        font: {
                            size: isMobile ? 11 : 12,
                            family: "'Plus Jakarta Sans', sans-serif",
                            weight: "600"
                        },
                        padding: isMobile ? 10 : 16,
                        usePointStyle: true,
                        pointStyle: "circle"
                    }
                },
                // Angka Persentase di Dalam Diagram
                datalabels: {
                    color: "#ffffff",
                    font: {
                        weight: "bold",
                        size: isMobile ? 11 : 13,
                        family: "'Plus Jakarta Sans', sans-serif"
                    },
                    formatter: (value) => {
                        return value + "%";
                    },
                    dropShadow: {
                        blur: 6,
                        color: "rgba(0, 0, 0, 0.6)"
                    }
                },
                // Tooltip saat Hover / Tap
                tooltip: {
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    titleColor: "#f8fafc",
                    bodyColor: "#cbd5e1",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    borderWidth: 1,
                    titleFont: { size: 13, weight: "bold", family: "'Plus Jakarta Sans', sans-serif" },
                    bodyFont: { size: 12, family: "'Plus Jakarta Sans', sans-serif" },
                    padding: 10,
                    cornerRadius: 8,
                    callbacks: {
                        label: function (context) {
                            return ` ${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
});