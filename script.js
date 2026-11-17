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
        /* Mitglieder-Fahrzeuge (9 Unimogs nach Baujahr) */
        { src: "1951.jpg", text: "Unimog 2010 „Dieseli“ · 1951" },
        { src: "1956.jpg", text: "Unimog · 1956" },
        { src: "1957.png", text: "Unimog 411.110 · 1957" },
        { src: "unimog-1958-nils.png", text: "Unimog · 1958" },
        { src: "unimog-1961-nils.png", text: "Unimog · 1961" },
        { src: "1975.png", text: "Unimog · 1975" },
        { src: "1979.jpg", text: "Unimog · 1979" },
        { src: "unimog-1979-2.jpg", text: "Unimog · 1979" },
        { src: "1986.jpg", text: "Unimog · 1986" },

        /* Eigene Treffen & Veranstaltungen */
        { src: "2023.jpg", text: "Treffen Bad Laer · 2023" },
        { src: "2024.jpg", text: "Treffen Bad Laer · 2024" },
        { src: "2025.jpg", text: "Treffen Baccum · 2025" },
        { src: "2026.jpeg", text: "Treffen Versmold-Loxten · 2026" },
        { src: "gruendung.png", text: "Gründung Regionalgruppe · 2026" },

        /* Weitere Treffen */
        { src: "Nordhorn1.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn2.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn3.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn4.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn5.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn6.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn7.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Nordhorn8.jpg", text: "Feldtage Nordhorn · 2022" },
        { src: "Verl1.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl2.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl3.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl4.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl5.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl6.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl7.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl8.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl9.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl10.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl11.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl12.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl13.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl14.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl15.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl16.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl17.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl18.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl19.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl20.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl21.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl22.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl24.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl25.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl26.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl27.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl28.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl29.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl30.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl30a.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl31.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl32.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl33.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl34.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl35.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl36.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl37.jpg", text: "Treffen Verl · 2026" },
        { src: "Verl38.jpg", text: "Treffen Verl · 2026" }
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
Verwende Code mit Vorsicht.
{ src: "TL 6 VARTA Duplex.png", text: "VARTA · TL 6 Duplex (430) · 1970er" },
{ src: "TL 12 VARTA 670.jpg", text: "VARTA · 670 · 1970er" },
{ src: "TL 13 VARTA 615.jpg", text: "VARTA · 615 · 1970er" },
{ src: "TL 14 VARTA.jpg", text: "VARTA · Handlampe · 1970er" },
{ src: "TL 15 VARTA.jpg", text: "VARTA · Taschenlampe · 1970er" },
{ src: "TL 16 VARTA.jpg", text: "VARTA · Taschenlampe · 1970er" },
{ src: "TL 17 VARTA.jpg", text: "VARTA · Taschenlampe · 1970er" },
{ src: "TL 18.jpg", text: "Unbekannt · Handlampe · 1970er" },
{ src: "HL CEAG Dortmund.jpg", text: "CEAG Dortmund · Sicherheitslampen · 1970er–1990er" },
{ src: "TL1 Maglite Mini.png", text: "Maglite · Mini AA · ab 1984" },
{ src: "HL 1 Makita.png", text: "Makita · ML120 (12 V) · 1990er" },
{ src: "TL 19 WONDER BABET.jpg", text: "Wonder · Babet · 1990er" },
{ src: "HL Acculux SL6 LED.jpg", text: "Acculux · SL6 LED · ca. 2005–2010" },

---

### Teil 2: Rest der `script.js` (direkt darunter einfügen)

Kopiere direkt im Anschluss diesen zweiten Block exakt unter die letzte Zeile von Teil 1:

```javascript
        /* Uhren (Firma · Typ · Baujahr) */
        { src: "Uhr Taschenuhr 1.jpg", text: "Taschenuhr · Handaufzug · ca. 1930er" },
        { src: "Uhr Taschenuhr 2.jpg", text: "Taschenuhr · Handaufzug · ca. 1930er" },
        { src: "Uhr Armbanduhr 1.jpg", text: "Armbanduhr · Mechanisch · 1940er" },
        { src: "Uhr Armbanduhr 2.jpg", text: "Armbanduhr · Mechanisch · 1940er" },
        { src: "Uhr Armbanduhr 3.jpg", text: "Armbanduhr · Mechanisch · 1940er" },
        { src: "Uhr Armbanduhr 4.jpg", text: "Armbanduhr · Mechanisch · 1940er" },
        { src: "Uhr Reisewecker 1.jpg", text: "Reisewecker · Klappgehäuse · 1950er" },
        { src: "Uhr Reisewecker 2.jpg", text: "Reisewecker · Klappgehäuse · 1950er" },
        { src: "Uhr Reisewecker 3.jpg", text: "Reisewecker · Klappgehäuse · 1950er" },
        { src: "Uhr Kurzzeitmesser 1.jpg", text: "Kurzzeitmesser · Federwerk · 1960er" },
        { src: "Uhr Kurzzeitmesser 2.jpg", text: "Kurzzeitmesser · Federwerk · 1960er" },
        { src: "Uhr Mutteruhr.jpg", text: "Mutteruhr · Hauptuhr · 1970er" },
        { src: "Uhr Tochter PEWETA.jpg", text: "PEWETA · Tochteruhr · 1970er" },
        { src: "Uhr Tochter SIEMENS.jpg", text: "SIEMENS · Tochteruhr · 1970er" },
        { src: "Uhr Tochter TN.jpg", text: "Telefonbau & Normalzeit · Tochteruhr · 1970er" },
        { src: "Uhr Wanduhr.jpg", text: "Wanduhr · Quarzwerk · 1980er" },
        { src: "Uhr Schrankuhr 1.jpg", text: "Schrankuhr · Pendelwerk · 1980er" },
        { src: "Uhr Standuhr.jpg", text: "Standuhr · Pendel-Schlagwerk · 1990er" },

        /* Vorhängeschlösser (Firma · Typ · Baujahr) */
        { src: "VHS alt.jpg", text: "Eisen-Vorhängeschloss · Genietet · ca. 1920–1930" },
        { src: "VHS rund.jpg", text: "Rund-Vorhängeschloss · Stahl · ca. 1950–1960" },
        { src: "VHS Burg.jpg", text: "BURG-Wächter · Vorhängeschloss · ca. 1960–1970" },
        { src: "VHS Abus 465-60.jpg", text: "ABUS · Modell 465-60 · ca. 1960er" },
        { src: "VHS Abus rot.jpg", text: "ABUS · Vorhängeschloss rot · ca. 1970er" },
        { src: "VHS Goldfarbend.jpg", text: "Messing-Minischloss · Zylinder · ca. 1980er" },

        /* Aschenbecher (Material / Motiv · Baujahr) */
        { src: "AB 1.jpg", text: "Keramikaschenbecher · 1950er" },
        { src: "AB 2.jpg", text: "Schwarzer Glasaschenbecher · 1960er" },
        { src: "AB 3.jpg", text: "Metallaschenbecher emailliert · 1950–1960" },
        { src: "AB 4.jpg", text: "Glasaschenbecher · Vogelpark Bad Rothenfelde · 1970er" },
        { src: "AB 5.jpg", text: "Dreieckiger Glasaschenbecher · 1960er" },
        { src: "AB 6.jpg", text: "Quadratischer Glasaschenbecher · 1950–1960" },
        { src: "AB 7.jpg", text: "Glasaschenbecher mit Metallhalterung · 1960er" },

        /* Büro & Schreibtechnik (Firma / Gegenstand · Baujahr) */
        { src: "Büro Schreibmaschine.jpg", text: "Mechanische Schreibmaschine · 1950er" },
        { src: "Büro Hefter.jpg", text: "Skrebba · Mechanischer Hefter · 1950–1960" },
        { src: "Büro Aschenbecher.jpg", text: "Büro-Aschenbecher aus Alabaster · 1950er" },
        { src: "Büro Füller.jpg", text: "Tropen · Füllfederhalter „Gold“ · 1960er" },
        { src: "Büro Box.jpg", text: "Büro-Ablagebox · 1970er" },
        { src: "Büro Pelikan.jpg", text: "Pelikan · Schreibwaren-Etui · 1970er" },
        { src: "Büro 100 Kugelschreiber.jpg", text: "Kugelschreiber-Sammlung · 20. Jahrhundert" },
        { src: "Büro Taschenrechner.jpg", text: "Casio · Taschenrechner FX-790P · 1985" },

        /* Haushaltsgeräte mit Kurbel (Firma · Typ · Baujahr) */
        { src: "Röster.jpg", text: "Kaffeeröster aus Gusseisen · ca. 1900–1920" },
        { src: "Bohnenschneider 3.jpg", text: "Pe De · Bohnenschneider Holz-Metall · ca. 1910–1925" },
        { src: "Zentrifuge.jpg", text: "Alfa Laval · Milchseparator Modell 23 · ca. 1920–1930" },
        { src: "Bohnenschneider1.jpg", text: "Pe De · Bohnenschneider Gussmodell · ca. 1930–1940" },
        { src: "10.jpg", text: "Alexanderwerk · Fleischwolf 10 · ca. 1930–1945" },
        { src: "Dosenmaschine.jpg", text: "Lanico · Dosenverschlussmaschine TR38 · ab 1938" },
        { src: "Brotschneider.jpg", text: "Mechanischer Brotschneider · ca. 1940–1950" },
        { src: "20N.jpg", text: "Alexanderwerk · Fleischwolf 20N · ca. 1940–1955" },
        { src: "Kaffeemühle.jpg", text: "Zassenhaus · Handkaffeemühle · ca. 1950–1960" },
        { src: "Kohlschneider.jpg", text: "Mechanischer Kohlschneider · ca. 1950–1960" },
        { src: "Kartoffelpüree.jpg", text: "Kartoffelpüreegerät · ca. 1950–1960" },
        { src: "Schneebesen.jpg", text: "Schneebesen mit Kurbel · ca. 1950–1960" },
        { src: "ALKA.jpg", text: "ALKA · Kurbelgerät · ca. 1950–1965" },
        { src: "Parmesanmühle.jpg", text: "Schulte · Trommelreibe Modell 820 · ca. 1950–1970" },
        { src: "BME5.jpg", text: "BME5 · Kurbelgerät · ca. 1960–1970" },
        { src: "Alexanderwerk7.jpg", text: "Alexanderwerk · Kurbelgerät 7 · ca. 1960–1970" }
    ];

    buildSeamlessMarquee("unimogScroll", unimogImages);
    buildSeamlessMarquee("museumScroll", museumImages);
    initInternArea();
});

/* =========================================================
   Interner Bereich – Passwortprüfung & Logout
   ========================================================= */

function initInternArea() {
    const loginBox = document.getElementById("loginBox");
    const content = document.getElementById("content");
    if (!loginBox || !content) return;

    if (localStorage.getItem("uvcLoggedIn") === "true") {
        loginBox.style.display = "none";
        content.style.display = "block";
    }
}

function checkPW() {
    const pwInput = document.getElementById("pw");
    const errorMsg = document.getElementById("loginError");
    if (!pwInput) return;

    if (pwInput.value === "unimog2026") {
        localStorage.setItem("uvcLoggedIn", "true");
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("content").style.display = "block";
        if (errorMsg) errorMsg.style.display = "none";
    } else {
   if (errorMsg) {
            errorMsg.style.display = "block";
        } else {
            alert("Falsches Passwort");
        }
    }
}

function logout() {
    localStorage.removeItem("uvcLoggedIn");
    window.location.href = "index.html";
}
