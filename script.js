/* =========================================================
   UVC Regionalgruppe Emsland–Osnabrück – Zentrale Funktionen
   ========================================================= */

function toggleMenu() {
    const nav = document.getElementById("mainNav");
    if (nav) {
        nav.classList.toggle("active");
    }
}

function openLightbox(imageSrc) {
    let lightbox = document.getElementById("collageLightbox");

    // Erzeugt die Lightbox automatisch, falls sie noch nicht im HTML steht
    if (!lightbox) {
        lightbox = document.createElement("div");
        lightbox.id = "collageLightbox";
        lightbox.className = "lightbox";
        lightbox.onclick = closeLightbox;

        const closeBtn = document.createElement("span");
        closeBtn.className = "lightbox-close";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = closeLightbox;

        const img = document.createElement("img");
        img.id = "lightboxImage";
        img.alt = "Vergrößerte Ansicht";
        img.onclick = function (event) {
            event.stopPropagation();
        };

        lightbox.appendChild(closeBtn);
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
    }

    const lightboxImg = document.getElementById("lightboxImage");
    lightboxImg.src = imageSrc;
    lightbox.classList.add("active");
}

function closeLightbox() {
    const lightbox = document.getElementById("collageLightbox");
    if (lightbox) {
        lightbox.classList.remove("active");
    }
}

// Schließt die Lightbox beim Drücken der Escape-Taste
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

/* =========================================================
   Bildlaufleisten & Vollbild-Präsentation
   ========================================================= */

function toggleMarqueeFullscreen(marqueeId) {
    const el = document.getElementById(marqueeId);
    if (!el) return;

    if (!document.fullscreenElement) {
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function shuffleImages(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function buildSeamlessMarquee(trackId, imageList) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const shuffled = shuffleImages(imageList);
    // Zweifache Einfügung für eine komplett nahtlose Endlosschleife
    const doubled = shuffled.concat(shuffled);

    doubled.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = src;
        img.loading = "lazy";
        track.appendChild(img);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const unimogImages = [
        "1951.jpg", "1957.png", "unimog-1958-nils.png", "unimog-1961-nils.png",
        "1975.png", "1979.jpg", "unimog-1979-2.jpg", "2023.jpg", "2024.jpg",
        "2025.jpg", "2026.jpeg", "gruendung.png",
        "Nordhorn1.jpg", "Nordhorn2.jpg", "Nordhorn3.jpg", "Nordhorn4.jpg",
        "Nordhorn5.jpg", "Nordhorn6.jpg", "Nordhorn7.jpg", "Nordhorn8.jpg",
        "Verl1.jpg", "Verl2.jpg", "Verl3.jpg", "Verl4.jpg", "Verl5.jpg", "Verl6.jpg",
        "Verl7.jpg", "Verl8.jpg", "Verl9.jpg", "Verl10.jpg", "Verl11.jpg", "Verl12.jpg",
        "Verl13.jpg", "Verl14.jpg", "Verl15.jpg", "Verl16.jpg", "Verl17.jpg", "Verl18.jpg",
        "Verl19.jpg", "Verl20.jpg", "Verl21.jpg", "Verl22.jpg", "Verl24.jpg", "Verl25.jpg",
        "Verl26.jpg", "Verl27.jpg", "Verl28.jpg", "Verl29.jpg", "Verl30.jpg", "Verl30a.jpg",
        "Verl31.jpg", "Verl32.jpg", "Verl33.jpg", "Verl34.jpg", "Verl35.jpg", "Verl36.jpg",
        "Verl37.jpg", "Verl38.jpg"
    ];

    const museumImages = [
        /* Telefone */
        "OB33.png", "RhAp.png", "FeTAp W28-38 angeschlossen.png", "Ftf50.png",
        "FeTAp W48 angeschlossen.png", "DDR-W58.png", "DDR IFW W.png",
        "FeTAp 611-2 von 05-1971.png", "FeTAp Te100 von 11-1972.png",
        "FeTAp 612 von 1977.png", "FeTAp 611-1a von 11-1979.png",
        "FeTAp Masterset 80er Jahre.png", "FeTAp 612-2a angeschlossen.png",
        "FeTAp 791-1 von 12-1986.png", "FeTAp BW Modell 54 OB-ZB angeschlossen.png",
        "FeTAp 795-1 von 10-1988.png", "FeTAp Tel 0164 von 06-1989.png",
        "FeTAp 2L-752-1 von 08-1989.png", "FeTAp Tel 0164 LXvon 02-1991.png",
        "FeTAp SEL1026 von 10-1991.png",

        /* Taschenlampen & Handlampen */
        "TL 7 Daimon 414..png", "TL 2 VARTA 505.png", "TL 9 DAIMON FOCUS.jpg",
        "TL 8 VARTA 616.jpg", "TL 4 VARTA 618.png", "TL 11 DAIMON.jpg",
        "TL 3 VARTA 657.png", "TL 5 VARTA 658.png", "TL 6 VARTA Duplex.png",
        "TL 12 VARTA 670.jpg", "TL 13 VARTA 615.jpg", "TL 14 VARTA.jpg",
        "TL 15 VARTA.jpg", "TL 16 VARTA.jpg", "TL 17 VARTA.jpg", "TL 18.jpg",
        "HL CEAG Dortmund.jpg", "TL1 Maglite Mini.png", "HL 1 Makita.png",
        "TL 19 WONDER BABET.jpg", "HL Acculux SL6 LED.jpg",

        /* Uhren */
        "Uhr Taschenuhr 1.jpg", "Uhr Taschenuhr 2.jpg",
        "Uhr Armbanduhr 1.jpg", "Uhr Armbanduhr 2.jpg",
        "Uhr Armbanduhr 3.jpg", "Uhr Armbanduhr 4.jpg",
        "Uhr Reisewecker 1.jpg", "Uhr Reisewecker 2.jpg", "Uhr Reisewecker 3.jpg",
        "Uhr Kurzzeitmesser 1.jpg", "Uhr Kurzzeitmesser 2.jpg",
        "Uhr Mutteruhr.jpg", "Uhr Tochter PEWETA.jpg",
        "Uhr Tochter SIEMENS.jpg", "Uhr Tochter TN.jpg",
        "Uhr Wanduhr.jpg", "Uhr Schrankuhr 1.jpg", "Uhr Standuhr.jpg",

        /* Vorhängeschlösser */
        "VHS alt.jpg", "VHS rund.jpg", "VHS Burg.jpg",
        "VHS Abus 465-60.jpg", "VHS Abus rot.jpg", "VHS Goldfarbend.jpg"
    ];

    buildSeamlessMarquee("unimogScroll", unimogImages);
    buildSeamlessMarquee("museumScroll", museumImages);
});
