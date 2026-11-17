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

    doubled.forEach(item => {
        const figure = document.createElement("div");
        figure.className = "marquee-item";

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.text;

        const caption = document.createElement("div");
        caption.className = "marquee-caption";
        caption.textContent = item.text;

        figure.appendChild(img);
        figure.appendChild(caption);
        track.appendChild(figure);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const unimogImages = [
        { src: "1951.jpg", text: "Unimog 2010 „Dieseli“ · 1951" },
        { src: "1957.png", text: "Unimog 411.110 · 1957" },
        { src: "unimog-1958-nils.png", text: "Unimog · 1958" },
        { src: "unimog-1961-nils.png", text: "Unimog · 1961" },
        { src: "1975.png", text: "Unimog · 1975" },
        { src: "1979.jpg", text: "Unimog · 1979" },
        { src: "unimog-1979-2.jpg", text: "Unimog · 1979" },
        { src: "2023.jpg", text: "Treffen Bad Laer · 2023" },
        { src: "2024.jpg", text: "Treffen Bad Laer · 2024" },
        { src: "2025.jpg", text: "Treffen Baccum · 2025" },
        { src: "2026.jpeg", text: "Treffen Versmold-Loxten · 2026" },
        { src: "gruendung.png", text: "Gründung Regionalgruppe · 2026" },
        { src: "Nordhorn1.jpg", text: "Feldtage Nordhorn" },
        { src: "Nordhorn2.jpg", text: "Feldtage Nordhorn" },
        { src: "Nordhorn3.jpg", text: "Feldtage Nordhorn" },
        { src: "Nordhorn4.jpg", text: "Feldtage Nordhorn" },
        { src: "Nordhorn5.jpg", text: "Feldtage Nordhorn" },
        { src: "Nordhorn6.jpg", text: "Feldtage Nordhorn" },
        { src: "Nordhorn7.jpg", text: "Feldtage Nordhorn" },
        { src: "Nordhorn8.jpg", text: "Feldtage Nordhorn" },
        { src: "Verl1.jpg", text: "Treffen Verl" },
        { src: "Verl2.jpg", text: "Treffen Verl" },
        { src: "Verl3.jpg", text: "Treffen Verl" },
        { src: "Verl4.jpg", text: "Treffen Verl" },
        { src: "Verl5.jpg", text: "Treffen Verl" },
        { src: "Verl6.jpg", text: "Treffen Verl" },
        { src: "Verl7.jpg", text: "Treffen Verl" },
        { src: "Verl8.jpg", text: "Treffen Verl" },
        { src: "Verl9.jpg", text: "Treffen Verl" },
        { src: "Verl10.jpg", text: "Treffen Verl" },
        { src: "Verl11.jpg", text: "Treffen Verl" },
        { src: "Verl12.jpg", text: "Treffen Verl" },
        { src: "Verl13.jpg", text: "Treffen Verl" },
        { src: "Verl14.jpg", text: "Treffen Verl" },
        { src: "Verl15.jpg", text: "Treffen Verl" },
        { src: "Verl16.jpg", text: "Treffen Verl" },
        { src: "Verl17.jpg", text: "Treffen Verl" },
        { src: "Verl18.jpg", text: "Treffen Verl" },
        { src: "Verl19.jpg", text: "Treffen Verl" },
        { src: "Verl20.jpg", text: "Treffen Verl" },
        { src: "Verl21.jpg", text: "Treffen Verl" },
        { src: "Verl22.jpg", text: "Treffen Verl" },
        { src: "Verl24.jpg", text: "Treffen Verl" },
        { src: "Verl25.jpg", text: "Treffen Verl" },
        { src: "Verl26.jpg", text: "Treffen Verl" },
        { src: "Verl27.jpg", text: "Treffen Verl" },
        { src: "Verl28.jpg", text: "Treffen Verl" },
        { src: "Verl29.jpg", text: "Treffen Verl" },
        { src: "Verl30.jpg", text: "Treffen Verl" },
        { src: "Verl30a.jpg", text: "Treffen Verl" },
        { src: "Verl31.jpg", text: "Treffen Verl" },
        { src: "Verl32.jpg", text: "Treffen Verl" },
        { src: "Verl33.jpg", text: "Treffen Verl" },
        { src: "Verl34.jpg", text: "Treffen Verl" },
        { src: "Verl35.jpg", text: "Treffen Verl" },
        { src: "Verl36.jpg", text: "Treffen Verl" },
        { src: "Verl37.jpg", text: "Treffen Verl" },
        { src: "Verl38.jpg", text: "Treffen Verl" }
    ];

    const museumImages = [
        /* Telefone (Firma · Typ · Baujahr) */
        { src: "OB33.png", text: "Deutsche Bundesbahn · OB33 · 1930er" },
        { src: "RhAp.png", text: "Deutsche Reichspost · RhAp · 1940er–1960er" },
        { src: "FeTAp W28-38 angeschlossen.png", text: "Wählapparat · W28/38 · 1950er" },
        { src: "Ftf50.png", text: "Albiswerk Zürich · Feldtelefon Ftf50 · 1950er–1960er" },
        { src: "FeTAp W48 angeschlossen.png", text: "Wählapparat · W48 · 1955" },
        { src: "DDR-W58.png", text: "VEB Fernmeldewerk Nordhausen · W58 · 1962" },
        { src: "DDR IFW W.png", text: "VEB Apparatebau Caputh · IFW/W · 1970er" },
        { src: "FeTAp 611-2 von 05-1971.png", text: "Deutsche Bundespost · FeTAp 611-2 · 1971" },
        { src: "FeTAp Te100 von 11-1972.png", text: "Deutsche Bundespost · FeTAp Te100 · 1972" },
        { src: "FeTAp 612 von 1977.png", text: "Deutsche Bundespost · FeTAp 612 · 1977" },
        { src: "FeTAp 611-1a von 11-1979.png", text: "Deutsche Bundespost · FeTAp 611-1a · 1979" },
        { src: "FeTAp Masterset 80er Jahre.png", text: "FeTAp · Masterset · 1980er" },
        { src: "FeTAp 612-2a angeschlossen.png", text: "Deutsche Bundespost · FeTAp 612-21 · 1982" },
        { src: "FeTAp 791-1 von 12-1986.png", text: "Deutsche Bundespost · FeTAp 791-1 · 1986" },
        { src: "FeTAp BW Modell 54 OB-ZB angeschlossen.png", text: "Bundeswehr · Feldfernsprecher 54 OB/ZB · 1988" },
        { src: "FeTAp 795-1 von 10-1988.png", text: "Deutsche Bundespost · FeTAp 795-1 · 1988" },
        { src: "FeTAp Tel 0164 von 06-1989.png", text: "Deutsche Bundespost · Tel 0164 · 1989" },
        { src: "FeTAp 2L-752-1 von 08-1989.png", text: "Deutsche Bundespost · FeTAp 2L-752-1 · 1989" },
        { src: "FeTAp Tel 0164 LXvon 02-1991.png", text: "Telekom · Tel 0164 LX · 1991" },
        { src: "FeTAp SEL1026 von 10-1991.png", text: "SEL · FeTAp SEL1026 · 1991" },

        /* Taschenlampen & Handlampen (Firma · Typ · Baujahr) */
        { src: "TL 7 Daimon 414..png", text: "Daimon · 314 (Bundeswehr) · 1950er" },
        { src: "TL 2 VARTA 505.png", text: "VARTA · TL 2 (505) · 1950er" },
        { src: "TL 9 DAIMON FOCUS.jpg", text: "Daimon · Focus · 1950er" },
        { src: "TL 8 VARTA 616.jpg", text: "VARTA · Spot-Light 616 · 1958–1965" },
        { src: "TL 4 VARTA 618.png", text: "VARTA · TL 4 (618) · 1960er" },
        { src: "TL 11 DAIMON.jpg", text: "Daimon · Handlampe · 1960er" },
        { src: "TL 3 VARTA 657.png", text: "VARTA · TL 3 (657) · 1970er" },
        { src: "TL 5 VARTA 658.png", text: "VARTA · TL 5 (658) · 1970er" },
        { src: "TL 6 VARTA Duplex.png", text: "VARTA · TL 6 Duplex (430) · 1970er" },
        { src: "TL 12 VARTA 670.jpg", text: "VARTA · 670 · 1970er" },
        { src: "TL 13 VARTA 615.jpg", text: "VARTA · 615 · 1970er" },
        { src: "TL 14 VARTA.jpg", text: "VARTA · Handlampe · 1970er" },
        { src: "TL 15 VARTA.jpg", text: "VARTA · Taschenlampe · 1970er" },
        { src: "TL 16 VARTA.jpg", text: "VARTA · Taschenlampe · 1970er" },
        { src: "TL 17 VARTA.jpg", text: "VARTA · Taschenlampe · 1970er" },
